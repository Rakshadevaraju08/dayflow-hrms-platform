const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const leaveRoutes = require('./leaveRoutes');

router.get('/health', healthController.checkHealth);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leaves', leaveRoutes);

module.exports = router;
