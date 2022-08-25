const { Router } = require('express');
const {
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  currentTeacher,
} = require('../controllers/teacherController');
const { authorizer } = require('../middleware/authorizer');

const router = Router();

router.get('/', authorizer, getAllTeachers);
router.get('/current', authorizer, currentTeacher);
router.get('/:id', authorizer, getTeacher);
router.patch('/:id', authorizer, updateTeacher);
router.delete('/:id', authorizer, deleteTeacher);

module.exports = router;
