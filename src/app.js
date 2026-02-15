const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const requestLogMiddleware = require('./middleware/requestLogMiddleware');
const errorLogMiddleware = require('./middleware/errorLogMiddleware');
const swaggerSpec = require('./docs/swagger');
const env = require('./config/env');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();

if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});

const corsOptions = {
  origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',').map((value) => value.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.disable('x-powered-by');
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json({ limit: '1mb' }));
app.use(requestLogMiddleware);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) => {
  res.json({
    message: 'Smart Campus Event System API is running',
    dbConnected: Boolean(req.app.locals.dbConnected),
    mongoConnected: Boolean(req.app.locals.mongoConnected)
  });
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

app.use((req, res, next) => {
  const notFoundError = new Error('Route not found');
  notFoundError.statusCode = 404;
  next(notFoundError);
});

app.use(errorLogMiddleware);

module.exports = app;
