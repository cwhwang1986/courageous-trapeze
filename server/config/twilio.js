// Twilio Credentials 



//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);
client.mobileNumber = '+16502242246';
client.twillioNumber = '+14153196800';
//Expoet the twillio module
module.exports = client;
