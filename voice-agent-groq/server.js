import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import twilio from "twilio";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const { VoiceResponse } = twilio.twiml;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 1) Incoming call → greet and listen
app.post("/voice", (req, res) => {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: "speech",
    speechTimeout: "auto",
    action: "/gather",
    method: "POST"
  });
  gather.say("Hello! I am your AI assistant powered by Groq. Ask me anything after the beep.");
  res.type("text/xml").send(twiml.toString());
});

// 2) Handle user speech → call Groq → reply with voice
app.post("/gather", async (req, res) => {
  const userText = (req.body.SpeechResult || "").trim();
  const twiml = new VoiceResponse();

  if (!userText) {
    twiml.say("Sorry, I did not hear anything. Please try again.");
    twiml.redirect("/voice");
    return res.type("text/xml").send(twiml.toString());
  }

  let aiReply = "I am sorry, something went wrong.";
  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful phone assistant. Speak concisely and clearly." },
        { role: "user", content: userText }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    aiReply = completion.choices[0]?.message?.content || aiReply;
  } catch (err) {
    console.error("Groq Error:", err.message);
  }

  twiml.say(aiReply);
  twiml.redirect("/voice"); // loop for next question
  res.type("text/xml").send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Voice agent (Groq) running on port ${port}`));
