const express = require("express");
const app = express();

app.use(express.json());

let isReady = false; // starts as "no"

// ---- STATUS ENDPOINT ----
app.get("/api/status", (req, res) => {
  res.json({ ready: isReady ? "yes" : "no" });
});

// ---- TOGGLE ENDPOINT ----
// When button is pressed, flip yes/no
app.post("/api/toggle", (req, res) => {
  isReady = !isReady;
  res.json({ ready: isReady ? "yes" : "no" });
});

module.exports = app;
