const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

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

// ---- FORCE-DOWNLOAD j.vbs ----
app.get("/j.vbs", (req, res) => {
  const file = path.join(__dirname, "j.vbs");

  res.setHeader("Content-Disposition", "attachment; filename=j.vbs");
  res.setHeader("Content-Type", "application/octet-stream");

  res.sendFile(file);
});

module.exports = app;
