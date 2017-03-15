var moment = require('moment');

// print data and time
console.log(moment().format());

// timestamp = seconds since Jan 1 1970 12:00AM
// print time stamp

var now = moment();

// print timestamp
console.log('Current timestamp', now.unix());

// convert timestamp to moment Mar 14, 2017 @ 7:37 PM
var timestamp = 1489538262;
var currentMoment = moment.unix(timestamp);
console.log('Current moment', currentMoment.format('MMM D, YYYY @ h:mm A'));

// January 3rd, 2017 @ 12:13 AM
console.log('Current moment', currentMoment.format('MMMM Do, YYYY @ h:mm A'));
