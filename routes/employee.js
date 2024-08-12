const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const bcrypt = require('bcrypt');

// Employee Registration
router.post('/register', async (req, res) => {
  const { full_name, email, password, role = 'Employee' } = req.body; // Default role is Employee
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ full_name, email, password: hashedPassword, role });
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ error: 'Failed to register employee' });
  }
});


// Employee Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email } });
    if (employee && await bcrypt.compare(password, employee.password)) {
      res.status(200).json({ id: employee.id, full_name: employee.full_name, email: employee.email, role: employee.role });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in employee:', error);
    res.status(500).json({ error: 'Failed to login employee' });
  }
});


module.exports = router;
