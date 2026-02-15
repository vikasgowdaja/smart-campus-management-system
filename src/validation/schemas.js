const Joi = require('joi');

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

const userCreateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'Admin', 'student', 'staff').required(),
  password: Joi.string().min(6).max(128).required()
});

const userUpdateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'Admin', 'student', 'staff').required(),
  password: Joi.string().min(6).max(128).optional()
});

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('admin', 'Admin', 'student', 'staff').default('student')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const eventCreateSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().allow('', null).max(5000).optional(),
  event_date: Joi.string().required(),
  location: Joi.string().trim().min(2).max(150).required(),
  created_by: Joi.number().integer().positive().required()
});

const eventUpdateSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().allow('', null).max(5000).optional(),
  event_date: Joi.string().required(),
  location: Joi.string().trim().min(2).max(150).required(),
  created_by: Joi.number().integer().positive().required()
});

const registrationCreateSchema = Joi.object({
  event_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  status: Joi.string().valid('registered', 'cancelled').default('registered')
});

const registrationUpdateSchema = Joi.object({
  event_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  status: Joi.string().valid('registered', 'cancelled').required()
});

module.exports = {
  idParamSchema,
  userCreateSchema,
  userUpdateSchema,
  registerSchema,
  loginSchema,
  eventCreateSchema,
  eventUpdateSchema,
  registrationCreateSchema,
  registrationUpdateSchema
};
