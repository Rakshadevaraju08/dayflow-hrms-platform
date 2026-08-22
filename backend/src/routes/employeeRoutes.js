const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.get('/me', employeeController.getMyProfile);

router.put('/me', employeeController.updateMyProfile);

router.get('/', employeeController.getAllEmployees);

router.get('/:id', employeeController.getEmployeeById);

router.put('/:id', employeeController.updateEmployee);

module.exports = router;