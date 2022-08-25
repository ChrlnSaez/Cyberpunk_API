const { Router } = require('express');
const {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  currentStudent,
  changePasswordStudent,
} = require('../controllers/studentController');
const { authorizer } = require('../middleware/authorizer');

const router = Router();

router.get('/', authorizer, getAllStudents);
router.get('/current', authorizer, currentStudent);
router.get('/:id', authorizer, getStudent);
router.patch('/change-password', authorizer, changePasswordStudent);
router.patch('/:id', authorizer, updateStudent);
router.delete('/:id', authorizer, deleteStudent);

module.exports = router;
