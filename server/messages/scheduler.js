var Agenda = require('agenda');
var Message = require('./messageModel.js');
var User = require('./userModel.js');
var Contact = require('./contactModel.js');
var twilio = require('./config/twilio.js');

var agenda = new Agenda({db: { address: 'localhost:27017/courageoustrapezedb'}});

agenda.define('send message', function(job, done) {
  var data = job.attrs.data;
  console.log(data);

  //send message through twilio
  twilio.sendMessage({
    to: Contact.get(phone),
    from: '+14153196800',
    body: data.text
  }, function(err, responseData){
    if(err){
      twilio.sendMessage({
        to: User.get(phone),
        from: '+14153196800',
        body: 'Your message failed to send :('
      });
    }
  });
  done();
});


module.exports = agenda;