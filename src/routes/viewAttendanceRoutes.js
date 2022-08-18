const express = require('express');

const { viewAllAttendance } = require('../controllers/viewAttendanceController');

// Route
router.get('/', viewAllAttendance);
