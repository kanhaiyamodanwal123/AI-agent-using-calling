# Twilio + Groq Voice Agent

## Setup
1. Clone repo
2. Run `npm install`
3. Copy `.env.example` → `.env` and fill:
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - GROQ_API_KEY
4. Start server: `npm start`
5. Expose with ngrok:
   ```bash
   ngrok http 3000
   ```
   Example output:
   ```
   Forwarding https://abcd1234.ngrok.io -> http://localhost:3000
   ```

## Twilio Number Setup
- Go to **Twilio Console → Phone Numbers → Active Numbers → Your Number**
- Under **Voice & Fax → A Call Comes In**, set:
  ```
  https://abcd1234.ngrok.io/voice
  ```
  (Use the ngrok HTTPS URL)

Now, call your Twilio number → your AI bot (powered by Groq Llama-3) answers!
