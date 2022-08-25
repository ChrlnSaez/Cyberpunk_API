const { Router } = require('express');
const {
  getAllClassrooms,
  getClassroom,
  updateClassroom,
  createClassroom,
  deleteClassroom,
  addAssignment,
  deleteStudentClassroom,
  addStudentClassroom,
  deleteAssignment,
  getStudentClassroom,
  getTeacherClassroom,
  getCurrentClassroom,
} = require('../controllers/classroomController');
const { authorizer } = require('../middleware/authorizer');

const router = Router();

router.get('/', authorizer, getAllClassrooms);
router.get('/student', getStudentClassroom);
router.get('/teacher', authorizer, getTeacherClassroom);
router.get('/current', authorizer, getCurrentClassroom);
router.get('/:id', authorizer, getClassroom);
router.patch('/:id', authorizer, updateClassroom);
router.post('/', authorizer, createClassroom);
router.delete('/:id', authorizer, deleteClassroom);
router.patch('/student/add/:id', authorizer, addStudentClassroom);
router.patch('/assignment/delete/:id', authorizer, deleteAssignment);
router.patch('/assignment/add/:id', authorizer, addAssignment);
router.patch('/student/delete/:id', authorizer, deleteStudentClassroom);

module.exports = router;
