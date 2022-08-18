const ClassroomAttendance = require('../models/viewAttendance');

// Get All Attendance
const viewAllAttendance = async (req, res) => {
    try {
        const allAttendance = await ClassroomAttendance.find();
        res.status(200).json(allAttendance);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = { viewAllAttendance };