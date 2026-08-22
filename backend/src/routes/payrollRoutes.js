const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { updatePayrollValidator } = require('../validators/payrollValidator');
const validate = require('../middleware/validationMiddleware');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/me', authenticate, payrollController.getMe);
router.get('/', authenticate, authorizeRoles('HR'), payrollController.getAllPayroll);
router.put('/:employeeId', authenticate, authorizeRoles('HR'), updatePayrollValidator, validate, payrollController.updatePayroll);

module.exports = router;
