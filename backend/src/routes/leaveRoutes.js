const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.use(authenticate);
router.get('/', authorizeRoles('HR'), leaveController.getLeaves);
router.patch('/:id/approve', authorizeRoles('HR'), leaveController.approveLeave);
router.patch('/:id/reject', authorizeRoles('HR'), leaveController.rejectLeave);

router.post('/', leaveController.applyLeave);
router.get('/me', leaveController.getMyLeaves);

module.exports = router;
