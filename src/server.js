require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  let dbConnected = false;

  try {
    await testConnection();
    dbConnected = true;
  } catch (error) {
    console.error('MySQL connection failed. Server will still start.');
    console.error('Reason:', error.message || error);
    if (error.code) {
      console.error('Code:', error.code);
    }
    console.error('Check .env values and confirm MySQL is running on port 3306.');
  }

  app.locals.dbConnected = dbConnected;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
