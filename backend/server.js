const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const cors = require("cors");
app.use(cors());
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

// API route to fetch all users
app.get("/api/users", (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Database error" });
      }
  
      res.status(200).json(results);
    });
  });  
  

// API route to delete user data
app.delete("/api/deleteuser/:id", (req, res) => {
    const userId = req.params.id;
  
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error deleting data:", err);
        return res.status(500).json({ message: "Database error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    });
  });

  // API route to update user data
app.put("/api/updateuser/:id", (req, res) => {
    const userId = req.params.id;
    const { name, username, password, email } = req.body;
  
    if (!name || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const query = "UPDATE users SET name = ?, username = ?, password = ?, email = ? WHERE id = ?";
    db.query(query, [name, username, password, email, userId], (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Database error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully" });
    });
});

// API route to get a single user by ID
app.get("/api/user/:id", (req, res) => {
    const userId = req.params.id;
  
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: "Database error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(results[0]);
    });
  });
  

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
