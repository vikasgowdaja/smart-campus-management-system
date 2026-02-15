const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').default(''),
  DB_NAME: Joi.string().required(),
  MONGO_URI: Joi.string().uri().optional(),
  JWT_SECRET: Joi.string().min(8).required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  CORS_ORIGIN: Joi.string().default('*'),
  RATE_LIMIT_WINDOW_MINUTES: Joi.number().integer().min(1).default(15),
  RATE_LIMIT_MAX: Joi.number().integer().min(1).default(100),
  OPENWEATHER_API_KEY: Joi.string().allow('').optional(),
  OPENWEATHER_MAX_RETRIES: Joi.number().integer().min(1).max(8).default(3),
  OPENWEATHER_RETRY_BASE_MS: Joi.number().integer().min(100).max(10000).default(500)
})
  .unknown(true)
  .required();

const { error, value } = schema.validate(process.env, {
  abortEarly: false,
  convert: true
});

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

module.exports = value;
