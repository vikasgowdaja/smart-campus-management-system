const express = require('express');
const eventController = require('../controllers/eventController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validate = require('../middleware/validateMiddleware');
const { idParamSchema, eventCreateSchema, eventUpdateSchema } = require('../validation/schemas');

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/stats', eventController.getEventStats);
router.get('/:id', validate(idParamSchema, 'params'), eventController.getEvent);
router.post('/', jwtMiddleware, authorizeRoles('admin', 'Admin'), validate(eventCreateSchema), eventController.createEvent);
router.put('/:id', validate(idParamSchema, 'params'), validate(eventUpdateSchema), eventController.updateEvent);
router.delete('/:id', validate(idParamSchema, 'params'), eventController.deleteEvent);

module.exports = router;
