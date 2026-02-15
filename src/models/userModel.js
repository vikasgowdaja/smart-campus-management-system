const { pool } = require('../config/db');

const getAllUsers = async () => {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY id DESC'
  );
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

const getUserForAuthByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT id, name, email, password, role, created_at, updated_at FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
};

const createUser = async (user) => {
  const { name, email, password, role } = user;
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]
  );
  return getUserById(result.insertId);
};

const updateUser = async (id, user) => {
  const { name, email, role, password } = user;

  let result;
  if (password) {
    [result] = await pool.query(
      'UPDATE users SET name = ?, email = ?, role = ?, password = ? WHERE id = ?',
      [name, email, role, password, id]
    );
  } else {
    [result] = await pool.query(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, id]
    );
  }

  if (result.affectedRows === 0) {
    return null;
  }

  return getUserById(id);
};

const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserForAuthByEmail,
  createUser,
  updateUser,
  deleteUser
};
