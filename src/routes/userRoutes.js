const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middleware/validateMiddleware');
const {
	idParamSchema,
	userCreateSchema,
	userUpdateSchema,
	registerSchema,
	loginSchema
} = require('../validation/schemas');

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/', userController.getUsers);
router.get('/:id', validate(idParamSchema, 'params'), userController.getUser);
router.post('/', validate(userCreateSchema), userController.createUser);
router.put('/:id', validate(idParamSchema, 'params'), validate(userUpdateSchema), userController.updateUser);
router.delete('/:id', validate(idParamSchema, 'params'), userController.deleteUser);

module.exports = router;
