const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidator');
const validate = require('../middleware/validationMiddleware');
const authenticate = require('../middleware/authMiddleware');

router.post('/signup', signupValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
