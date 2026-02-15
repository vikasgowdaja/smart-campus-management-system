const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/stats', eventController.getEventStats);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
