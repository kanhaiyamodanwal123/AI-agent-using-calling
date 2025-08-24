import twilio from 'twilio';

// Your Twilio credentials from Console
const accountSid = 'AC637ea68528d5db303c1dac1b8b2cc143';   // replace with your Account SID
const authToken = 'fbd4c67eb53741635980ebb751163bbb';         // replace with your Auth Token

const client = twilio(accountSid, authToken);

client.calls.create({
  to: '+918932093777', // your Indianhttps://github.com/kanhaiya-45/AI-answer-on-callhttps://github.com/kanhaiya-45/AI-answer-on-callhttps://github.com/kanhaiya-45/AI-answer-on-callhttps://github.com/kanhaiya-45/AI-answer-on-callhttps://github.com/kanhaiya-45/AI-answer-on-callhttps://github.com/kanhaiya-45/AI-answer-on-call mobile number
  from: '+1(775) 429-6084', // your Twilio US number
  url: 'https://bc9880eacbd4.ngrok-free.app/voice/' // your webhook
})
.then(call => console.log("Call started. SID:", call.sid))
.catch(err => console.error("Error:", err));




