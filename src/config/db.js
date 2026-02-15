const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_NAME'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initializeDatabase = async () => {
  const schemaPath = path.resolve(__dirname, '../../sql-schema.txt');
  const schemaSql = await fs.readFile(schemaPath, 'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
  });

  try {
    await connection.query(schemaSql);

    const [passwordColumn] = await connection.query("SHOW COLUMNS FROM users LIKE 'password'");
    if (passwordColumn.length === 0) {
      await connection.query('ALTER TABLE users ADD COLUMN password VARCHAR(255) NULL AFTER email');
    }
  } finally {
    await connection.end();
  }
};

const testConnection = async () => {
  const connection = await pool.getConnection();
  await connection.query('SELECT 1');
  connection.release();
  console.log('Connected to MySQL');
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};
