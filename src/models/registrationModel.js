const { pool } = require('../config/db');

const getAllRegistrations = async () => {
  const [rows] = await pool.query(
    `SELECT
      er.id,
      er.event_id,
      e.title AS event_title,
      er.user_id,
      u.name AS user_name,
      u.email AS user_email,
      er.status,
      er.registered_at
    FROM event_registrations er
    INNER JOIN events e ON e.id = er.event_id
    INNER JOIN users u ON u.id = er.user_id
    ORDER BY er.id DESC`
  );
  return rows;
};

const getRegistrationById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      er.id,
      er.event_id,
      e.title AS event_title,
      er.user_id,
      u.name AS user_name,
      u.email AS user_email,
      er.status,
      er.registered_at
    FROM event_registrations er
    INNER JOIN events e ON e.id = er.event_id
    INNER JOIN users u ON u.id = er.user_id
    WHERE er.id = ?`,
    [id]
  );
  return rows[0] || null;
};

const createRegistration = async (registration) => {
  const { event_id, user_id, status } = registration;
  const [result] = await pool.query(
    'INSERT INTO event_registrations (event_id, user_id, status) VALUES (?, ?, ?)',
    [event_id, user_id, status]
  );

  return getRegistrationById(result.insertId);
};

const updateRegistration = async (id, registration) => {
  const { event_id, user_id, status } = registration;
  const [result] = await pool.query(
    'UPDATE event_registrations SET event_id = ?, user_id = ?, status = ? WHERE id = ?',
    [event_id, user_id, status, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getRegistrationById(id);
};

const deleteRegistration = async (id) => {
  const [result] = await pool.query('DELETE FROM event_registrations WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
};
