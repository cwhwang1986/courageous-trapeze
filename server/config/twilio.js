// Twilio Credentials 



//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);

//Expoet the twillio module
module.exports = client;
