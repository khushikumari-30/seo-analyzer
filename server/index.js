// Load the express module
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// To read JSON data sent to the server
app.use(express.json());

app.use(cors());

// Create a route (GET request at '/')
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// POST route to handle text analysis
app.post("/analyze", async (req, res) => {
  const { text } = req.body;
  const resp = await fetch(
    "https://api.apyhub.com/extract/text/readability-score",
    {
      method: "POST",
      headers: {
        "apy-token":
          "APY0fPl98llUGAFwKQacSgyBFORS0YH1cDZ1nGsYaSGuHzgXmesfEmvi5aNcwzZVLpm2jZ0LAVf3s",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, language: "english" }),
    }
  );
  const json = await resp.json();
  res.json({
    score: json.data.flesh_kincaid_reading_ease.score,
    grade: json.data.flesh_kincaid_reading_ease.level,
    label: json.data.flesh_kincaid_reading_ease.class_label,
    stats: json.data.stats,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
