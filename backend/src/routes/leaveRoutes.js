const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/', leaveController.applyLeave);
router.get('/me', leaveController.getMyLeaves);
router.get('/', leaveController.getLeaves);
router.patch('/:id/approve', leaveController.approveLeave);
router.patch('/:id/reject', leaveController.rejectLeave);

module.exports = router;
