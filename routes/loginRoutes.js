const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Admin} = require('../models/index');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

  try {
    // Check in Admin table
    let user = await Admin.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return res.json({ role: 'admin', user });
    }

    // Check in Doctor table
    user = await Doctor.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return res.json({ role: 'doctor', user });
    }

    // Check in Patient table
    user = await Patient.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return res.json({ role: 'patient', user });
    }

    // If no match found
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;