//file for creating authentication functions
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// User registration function/logic
exports.registerPatient = async (req, res) => {
    console.log("Request received at /patients/register"); // Log when request is received
    console.log("Request body:", req.body); // Log the incoming data

    const {
        first_name,
        last_name,
        email_address,
        password, // Use 'password' instead of 'password_hash'
        phone_number,
        date_of_birth,
        gender,
        address,
    } = req.body;

    try {
        // Check if email already exists in the database
        const [rows] = await db.query(
            "SELECT * FROM patients WHERE email_address = ?",
            [email_address]
        );

        console.log("Email query result:", rows);

        if (rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert patient into the database
        const [result] = await db.execute(
            `INSERT INTO patients (first_name, last_name, email_address, password_hash, phone_number, date_of_birth, gender, address)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                first_name,
                last_name,
                email_address,
                hashedPassword,
                phone_number,
                date_of_birth,
                gender,
                address,
            ]
        );

        console.log("Insert query result:", result);

        res.status(201).json({
            message: "Patient registered successfully!",
            patientId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
};

// User login function/logic
exports.loginPatient = async (req, res) => {
    const { email_address, password } = req.body; // Extract email and password from request

    try {
        // Check if the patient exists
        const [rows] = await db.query(
            "SELECT * FROM patients WHERE email_address = ?",
            [email_address]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const patient = rows[0];

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(
            password,
            patient.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Set session (if using session-based authentication)
        req.session.patientId = patient.patients_id;

        console.log("Login response sent:", { patientId: patient.patients_id });

        res.status(200).json({
            message: "Login successful",
            patientId: patient.patients_id,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "An error occurred during login.",
            error,
        });
    }
};

//exports.loginUser
