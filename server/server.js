// Import necessary modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/index.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

// Initialize express app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});

// Login route remains unchanged as it's not specific to students only
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0 && user.rows[0].password === password) {
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email,
          role: user.rows[0].role,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get all attendence records
app.get("/attendance", async (req, res) => {
  const { course } = req.query; // Get course parameter from query
  try {
    // Use the course parameter to filter attendance records
    const attendanceRecords = await db.query(
      "SELECT * FROM attendance WHERE course_name = $1",
      [course]
    );
    res.status(200).json(attendanceRecords.rows);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Error fetching attendance records" });
  }
});
