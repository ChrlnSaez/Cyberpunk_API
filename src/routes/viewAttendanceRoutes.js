const { Router } = require('express');
const express = require('express');

const { viewAllAttendance } = require('../controllers/viewAttendanceController');

const router = Router();

// Route
router.get('/classroom-attendance', viewAllAttendance);

module.exports = router;
