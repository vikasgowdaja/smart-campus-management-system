const express = require('express');
const registrationController = require('../controllers/registrationController');

const router = express.Router();

router.get('/', registrationController.getRegistrations);
router.get('/:id', registrationController.getRegistration);
router.post('/', registrationController.createRegistration);
router.put('/:id', registrationController.updateRegistration);
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;
