require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "", // Keep empty if using XAMPP
    database: process.env.DB_NAME || "appointment_db"
});

db.connect(err => {
    if (err) {
        console.error("❌ Database Connection Failed:", err);
        process.exit(1);
    }
    console.log("✅ Connected to MySQL Database");
});

// ✅ Default Route for Home Page
app.get("/", (req, res) => {
    res.send("Welcome to the Booking System API! 🚀");
});

// ✅ Route to handle form submission
app.post("/api/contact", (req, res) => {
    console.log("Received POST request:", req.body); // Debugging log

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ success: false, error: "Database Error" });
        }
        console.log("Data inserted successfully!");
        res.status(201).json({ success: true, message: "Message saved successfully!" });
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
