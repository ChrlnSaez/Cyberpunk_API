const { Router } = require('express');

const {
  createAttendance,
  getAllAttendances,
  getAttendance,
  getStudentsAttendances,
  getCurrentStudentAttendance,
  getClassroomAttendances,
} = require('../controllers/attendanceController');
const { authorizer } = require('../middleware/authorizer');

const router = Router();

router.post('/', authorizer, createAttendance);
router.get('/', authorizer, getAllAttendances);
router.get('/student/current/', authorizer, getCurrentStudentAttendance);
router.get('/student', authorizer, getStudentsAttendances);
router.get('/classroom', authorizer, getClassroomAttendances);
router.get('/:id', authorizer, getAttendance);

module.exports = router;
