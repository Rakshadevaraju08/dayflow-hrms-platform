const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');
const authenticate = require('../middleware/authMiddleware');

router.get('/me', authenticate, employeeController.getMyProfile);

router.put('/me', authenticate, employeeController.updateMyProfile);

router.get('/', authenticate, employeeController.getAllEmployees);

router.get('/:id', authenticate, employeeController.getEmployeeById);

router.put('/:id', authenticate, employeeController.updateEmployee);

module.exports = router;