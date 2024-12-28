const express = require("express");
const router = express.Router();

//route testing

// Admin adding a new doctor
router.post("/doctors", async (req, res) => {
    const {
        first_name,
        last_name,
        specialization,
        email_address,
        phone_number,
        schedule,
    } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)",
            [first_name, last_name, specialization, email, phone, schedule]
        );
        res.status(201).json({
            message: "Doctor added successfully",
            id: result[0].insertId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve list of doctors and specialization
router.get("/", async (req, res) => {
    try {
        const [doctors] = await db.query("SELECT * FROM doctors"); // Query to fetch doctors
        if (doctors.length === 0) {
            return res.status(404).send("No doctors found");
        }
        res.json(doctors); // Return doctors as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving data from database");
    }
});

// Update Doctors Profile/Schedule
router.put("/doctors/:id", async (req, res) => {
    const { first_name, last_name, specialization, phone, schedule } = req.body;
    try {
        const result = await db.query(
            "UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, phone = ?, schedule = ? WHERE id = ?",
            [
                first_name,
                last_name,
                specialization,
                phone,
                schedule,
                req.params.id,
            ]
        );
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({ message: "Doctor updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Doctors profile
router.delete("/doctors/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM Doctors WHERE id = ?", [
            req.params.id,
        ]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
