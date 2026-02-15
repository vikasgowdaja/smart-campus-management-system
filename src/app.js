const express = require('express');
const requestLogMiddleware = require('./middleware/requestLogMiddleware');
const errorLogMiddleware = require('./middleware/errorLogMiddleware');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();

app.use(express.json());
app.use(requestLogMiddleware);

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
