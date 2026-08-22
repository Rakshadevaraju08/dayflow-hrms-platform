const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const leaveRoutes = require('./leaveRoutes');
const employeeRoutes = require('./employeeRoutes');
router.get('/health', healthController.checkHealth);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leave', leaveRoutes);
router.use('/employees', employeeRoutes);
module.exports = router;
