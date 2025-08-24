import twilio from 'twilio';

// Your Twilio credentials from Console
const accountSid = '';   // replace with your Account SID
const authToken = '';         // replace with your Auth Token

const client = twilio(accountSid, authToken);

client.calls.create({
  to: '', // your Indian mobile number
  from: '', // your Twilio US number
  url: '' // your webhook
})
.then(call => console.log("Call started. SID:", call.sid))
.catch(err => console.error("Error:", err));




