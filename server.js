const express = require("express");
const app = express();

app.use(express.json());

let shouldPlay = false;
const SOUND_URL = "https://example.com/my-sound.mp3"; // <-- put your sound URL here

// Each client checks this every 2 seconds
app.get("/api/status", (req, res) => {
  if (shouldPlay) {
    shouldPlay = false; // reset after triggering
    res.json({ play: true, url: SOUND_URL });
  } else {
    res.json({ play: false });
  }
});

// When button is pressed on index.html
app.post("/api/trigger", (req, res) => {
  shouldPlay = true;
  res.json({ ok: true });
});

module.exports = app;
