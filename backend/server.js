const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// API route to insert user data
app.post("/api/adduser", (req, res) => {
  const { name, username, password, email } = req.body;

  if (!name || !username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)";
  db.query(query, [name, username, password, email], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "User added successfully", userId: result.insertId });
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
