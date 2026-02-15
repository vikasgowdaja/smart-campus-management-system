const { pool } = require('../config/db');

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
};

const createUser = async (user) => {
  const { name, email, role } = user;
  const [result] = await pool.query(
    'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
    [name, email, role]
  );
  return getUserById(result.insertId);
};

const updateUser = async (id, user) => {
  const { name, email, role } = user;
  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
    [name, email, role, id]
  );

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
  createUser,
  updateUser,
  deleteUser
};
