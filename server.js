// Importing packages for server.js
const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");
const path = require("path");

const db = require("./config/db"); // Import the database connection pool
const patientRoutes = require("./routes/patients");
const doctorsRoutes = require("./routes/doctors");

// Initialize server
const app = express();
const PORT = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "FRONT-END"))); // Serve the entire front end folder

// Session setup
app.use(
    session({
        key: "user_sid",
        secret: process.env.SESSION_SECRET,
        resave: false, // Prevents session from being saved back to the store if unmodified
        saveUninitialized: false, // Prevents creating sessions for unauthenticated users
        cookie: {
            secure: false, // Set to true if using HTTPS
            maxAge: 1000 * 60 * 60, // Session expiration time (1 hour)
        },
    })
);

// Routes setup
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "FRONT-END", "telemed.html"));
});

app.use("/patients", patientRoutes);
app.use("/doctors", doctorsRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
