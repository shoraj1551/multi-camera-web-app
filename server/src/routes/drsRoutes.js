const express = require('express');

const router = express.Router();

// Mock data for demonstration purposes
let doctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Neurologist' },
    { id: 3, name: 'Dr. Emily Johnson', specialization: 'Pediatrician' },
];

// Get all doctors
router.get('/', (req, res) => {
    res.json(doctors);
});

// Get a doctor by ID
router.get('/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === parseInt(req.params.id));
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
});

// Add a new doctor
router.post('/', (req, res) => {
    const { name, specialization } = req.body;
    if (!name || !specialization) {
        return res.status(400).json({ message: 'Name and specialization are required' });
    }
    const newDoctor = {
        id: doctors.length + 1,
        name,
        specialization,
    };
    doctors.push(newDoctor);
    res.status(201).json(newDoctor);
});

// Update a doctor by ID
router.put('/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === parseInt(req.params.id));
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
    }
    const { name, specialization } = req.body;
    if (name) doctor.name = name;
    if (specialization) doctor.specialization = specialization;
    res.json(doctor);
});

// Delete a doctor by ID
router.delete('/:id', (req, res) => {
    const doctorIndex = doctors.findIndex(d => d.id === parseInt(req.params.id));
    if (doctorIndex === -1) {
        return res.status(404).json({ message: 'Doctor not found' });
    }
    doctors.splice(doctorIndex, 1);
    res.status(204).send();
});

module.exports = router;