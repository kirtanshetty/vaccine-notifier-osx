# vaccine-notifier-osx
Raises a notification in your mac to notify about the vaccine availibility.

Run the `vaccine_poller.js` file as a background process.
You can change the top 3 variables to suit your search preferences.

`DISTRICT_ID` to change the city of search.
`MINIMUM_AGE_LIMIT` to set the minimum age limit.
`CHECK_INTERVAL` seconds between two consecutive checks. Don't keep it very small to avoid getting blocked.
