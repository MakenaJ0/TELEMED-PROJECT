// Book an appointment
router.post('/appointments', async (req, res) => {
    const { doctor_id, appointment_date, appointment_time } = req.body;
    const patient_id = req.session.userId; // Assuming session stores patient ID

    if (!patient_id) {
        return res.status(401).json({ message: 'Please log in to book an appointment' });
    }

    try {
        // Check if the doctor is available
        const [existingAppointment] = await db.query(
            'SELECT * FROM Appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ?',
            [doctor_id, appointment_date, appointment_time]
        );

        if (existingAppointment.length > 0) {
            return res.status(400).json({ message: 'Doctor is not available at this time' });
        }

        // Insert the appointment
        const result = await db.query(
            'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
            [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']
        );

        res.status(201).json({ message: 'Appointment booked successfully', id: result[0].insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View upcoming Appointments
router.get('/appointments', async (req, res) => {
    const userId = req.session.userId; // Patient or doctor session
    const role = req.session.role; // Role from session: 'patient' or 'doctor'

    if (!userId) {
        return res.status(401).json({ message: 'Please log in to view appointments' });
    }

    try {
        let query, params;

        if (role === 'patient') {
            query = `
                SELECT A.id, D.first_name AS doctor_first_name, D.last_name AS doctor_last_name, 
                       A.appointment_date, A.appointment_time, A.status
                FROM Appointments A
                JOIN Doctors D ON A.doctor_id = D.id
                WHERE A.patient_id = ?`;
            params = [userId];
        } else if (role === 'doctor') {
            query = `
                SELECT A.id, P.first_name AS patient_first_name, P.last_name AS patient_last_name, 
                       A.appointment_date, A.appointment_time, A.status
                FROM Appointments A
                JOIN Patients P ON A.patient_id = P.id
                WHERE A.doctor_id = ?`;
            params = [userId];
        }

        const [appointments] = await db.query(query, params);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update: Reschedule or cancel appointments
router.put('/appointments/:id', async (req, res) => {
    const { appointment_date, appointment_time, status } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Please log in to update appointments' });
    }

    try {
        const result = await db.query(
            'UPDATE Appointments SET appointment_date = ?, appointment_time = ?, status = ? WHERE id = ? AND patient_id = ?',
            [appointment_date, appointment_time, status, req.params.id, userId]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found or not authorized' });
        }

        res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete appointment
router.delete('/appointments/:id', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Please log in to cancel appointments' });
    }

    try {
        const result = await db.query(
            'UPDATE Appointments SET status = ? WHERE id = ? AND patient_id = ?',
            ['canceled', req.params.id, userId]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found or not authorized' });
        }

        res.json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
