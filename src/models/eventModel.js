const { pool } = require('../config/db');

const getAllEvents = async () => {
  const [rows] = await pool.query('SELECT * FROM events ORDER BY id DESC');
  return rows;
};

const getEventById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
  return rows[0] || null;
};

const createEvent = async (event) => {
  const { title, description, event_date, location, created_by } = event;
  const [result] = await pool.query(
    'INSERT INTO events (title, description, event_date, location, created_by) VALUES (?, ?, ?, ?, ?)',
    [title, description, event_date, location, created_by]
  );
  return getEventById(result.insertId);
};

const updateEvent = async (id, event) => {
  const { title, description, event_date, location, created_by } = event;
  const [result] = await pool.query(
    'UPDATE events SET title = ?, description = ?, event_date = ?, location = ?, created_by = ? WHERE id = ?',
    [title, description, event_date, location, created_by, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getEventById(id);
};

const deleteEvent = async (id) => {
  const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
