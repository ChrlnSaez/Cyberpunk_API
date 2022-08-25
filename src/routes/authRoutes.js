const { Router } = require('express');

const {
  studentLoginController,
  studentRegisterController,
  teacherLoginController,
  teacherRegisterController,
} = require('../controllers/authController');

const router = Router();

router.post('/student/login', studentLoginController);
router.post('/student/register', studentRegisterController);
router.post('/teacher/login', teacherLoginController);
router.post('/teacher/register', teacherRegisterController);

module.exports = router;
