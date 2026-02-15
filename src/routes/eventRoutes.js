const express = require('express');
const eventController = require('../controllers/eventController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/stats', eventController.getEventStats);
router.get('/:id', eventController.getEvent);
router.post('/', jwtMiddleware, authorizeRoles('admin', 'Admin'), eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
