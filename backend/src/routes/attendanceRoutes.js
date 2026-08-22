const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { dateFilterValidator, hrFilterValidator } = require('../validators/attendanceValidator');
const validate = require('../middleware/validationMiddleware');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.post('/check-in', authenticate, attendanceController.checkIn);
router.post('/check-out', authenticate, attendanceController.checkOut);
router.get('/me', authenticate, dateFilterValidator, validate, attendanceController.getMe);
router.get('/', authenticate, authorizeRoles('HR'), hrFilterValidator, validate, attendanceController.getAllAttendance);

module.exports = router;
