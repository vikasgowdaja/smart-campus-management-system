const express = require('express');
const registrationController = require('../controllers/registrationController');
const validate = require('../middleware/validateMiddleware');
const {
	idParamSchema,
	registrationCreateSchema,
	registrationUpdateSchema
} = require('../validation/schemas');

const router = express.Router();

router.get('/', registrationController.getRegistrations);
router.get('/:id', validate(idParamSchema, 'params'), registrationController.getRegistration);
router.post('/', validate(registrationCreateSchema), registrationController.createRegistration);
router.put('/:id', validate(idParamSchema, 'params'), validate(registrationUpdateSchema), registrationController.updateRegistration);
router.delete('/:id', validate(idParamSchema, 'params'), registrationController.deleteRegistration);

module.exports = router;
