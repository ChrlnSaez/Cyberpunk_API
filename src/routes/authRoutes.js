const { Router } = require('express');

const {
  registerController,
  loginController,
} = require('../controllers/authController');

const router = Router();

router.post('/login', loginController);
router.post('/register', registerController);

module.exports = router;
