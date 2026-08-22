const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/', leaveController.applyLeave);
router.get('/', leaveController.getLeaves);
router.put('/:id/status', leaveController.updateLeaveStatus);

module.exports = router;
