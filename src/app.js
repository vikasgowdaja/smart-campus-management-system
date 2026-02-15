const express = require('express');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    message: 'Smart Campus Event System API is running',
    dbConnected: Boolean(req.app.locals.dbConnected)
  });
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
