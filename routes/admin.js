const express = require('express');
const router = express.Router();
const { Admin } = require('../models');
const bcrypt = require('bcrypt');

// Admin Registration
router.post('/register', async (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ full_name, email, password: hashedPassword });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register admin' });
  }
});

// Get all registered Admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin details' });
  }
});


// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (admin && await bcrypt.compare(password, admin.password)) {
      res.status(200).json(admin);
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login admin' });
  }
});

module.exports = router;
