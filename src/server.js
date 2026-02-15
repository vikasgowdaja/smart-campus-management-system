require('dotenv').config();

const app = require('./app');
const { initializeDatabase, testConnection } = require('./config/db');
const { connectMongo } = require('./config/mongo');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  let dbConnected = false;
  let mongoConnected = false;

  try {
    await initializeDatabase();
    await testConnection();
    dbConnected = true;
    console.log('Schema check complete (database/tables ready)');
  } catch (error) {
    console.error('MySQL connection failed. Server will still start.');
    console.error('Reason:', error.message || error);
    if (error.code) {
      console.error('Code:', error.code);
    }
    console.error('Check .env values and confirm MySQL is running on port 3306.');
  }

  mongoConnected = await connectMongo();

  app.locals.dbConnected = dbConnected;
  app.locals.mongoConnected = mongoConnected;

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the existing process or change PORT in .env.`);
      process.exit(1);
    }

    console.error('Server failed to start:', error.message);
    process.exit(1);
  });
};

startServer();
