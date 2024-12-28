// patients route
const express = require("express");
const bcrypt = require("bcrypt");
const { registerPatient } = require("../controllers/authController");
const { loginPatient } = require("../controllers/authController");
const router = express.Router();

const db = require("../config/db");

// Register a new patient
router.post("/register", registerPatient);

// Patient login route
router.post("/login", loginPatient);




//Admin retrieve patient list
// router.get("/", async (req, res) => {
//     try {
//         const [patients] = await db.query("SELECT * FROM patients"); // Use promise-based query
//         if (patients.length === 0) {
//             return res.status(404).json({ error: "No patients found" });
//         }
//         res.json(patients); // Return patients as JSON
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error retrieving data from database" });
//     }
// });

// //View profile

// router.get("/profile", async (req, res) => {
//     if (!req.session.patientId) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const query = `SELECT * FROM Patients WHERE id = ?`;
//         const [rows] = await db.query(query, [req.session.patientId]);

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "Profile not found" });
//         }

//         res.json(rows[0]);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update a patient's profile
// router.put("/profile", async (req, res) => {
//     if (!req.session.patientId) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { first_name, last_name, phone, address } = req.body;

//     try {
//         const query = `
//             UPDATE Patients SET first_name = ?, last_name = ?, phone_number = ?, address = ?
//             WHERE id = ?
//         `;
//         await db.query(query, [
//             first_name,
//             last_name,
//             phone_number,
//             address,
//             req.session.patientId,
//         ]);

//         res.json({ message: "Profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete a patient
// router.delete("/:id", async (req, res) => {
//     try {
//         const result = await db.query("DELETE FROM Patients WHERE id = ?", [
//             req.params.id,
//         ]);
//         if (result[0].affectedRows === 0) {
//             return res.status(404).json({ message: "Patient not found" });
//         }
//         res.json({ message: "Patient deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;
