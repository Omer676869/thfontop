const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// ---- SERVE STATIC FILES ----
app.use(express.static(path.join(__dirname, "public")));

let isReady = false;

// ---- STATUS ENDPOINT ----
app.get("/api/status", (req, res) => {
  res.json({ ready: isReady ? "yes" : "no" });
});

// ---- TOGGLE ENDPOINT ----
app.post("/api/toggle", (req, res) => {
  isReady = !isReady;
  res.json({ ready: isReady ? "yes" : "no" });
});

// ---- SERVE j.vbs explicitly (optional) ----
app.get("/j.vbs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "j.vbs"));
});

module.exports = app;
