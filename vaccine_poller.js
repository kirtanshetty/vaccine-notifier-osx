// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=395&date=12-05-2021

const MUMBAI_DISTRICT_ID = 395;
const MINIMUM_AGE_LIMIT = 18;
const CHECK_INTERVAL = 10; // Seconds

const https = require('https');

const notifier = require('node-notifier');


function IfVaccineAvailable(){
  // Add whatever trigger you like here.
  notifier.notify('Vaccines are available!');
}

function GetVaccInfo(){
  var d = new Date();
  const DATE_STR = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  const options = {
    hostname: 'cdn-api.co-vin.in',
    port: 443,
    path: '/api/v2/appointment/sessions/public/findByDistrict?district_id='+ MUMBAI_DISTRICT_ID +'&date=' + DATE_STR,
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      var response = JSON.parse(d);

      var sessions = response.sessions;

      var available = false;
      for(var i = 0; i < sessions.length; i++){
        if(sessions[i].min_age_limit == MINIMUM_AGE_LIMIT){
          available = true;
          var ss = sessions[i];
          console.log("Available at: "+ ss.name + " , available capacity: " + ss.available_capacity + ", fee:" + ss.fee);
        }
      }

      if(!available){
        console.log("No sessions received.")
        return;
      }
      else{
        IfVaccineAvailable();
      }
    });
  });

  req.on('error', error => {
    console.error(error)
  });

  req.end()
}

setInterval(()=>{
  GetVaccInfo();
}, CHECK_INTERVAL * 1000);

GetVaccInfo();