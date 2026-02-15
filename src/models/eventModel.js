const { pool } = require('../config/db');

const getAllEvents = async () => {
  const [rows] = await pool.query(
    `SELECT
      e.id,
      e.title,
      e.description,
      e.event_date,
      e.location,
      e.created_by,
      e.created_at,
      e.updated_at,
      u.name AS created_by_name,
      u.email AS created_by_email,
      COUNT(er.id) AS total_registrations
    FROM events e
    INNER JOIN users u ON u.id = e.created_by
    LEFT JOIN event_registrations er ON er.event_id = e.id
    GROUP BY e.id, u.name, u.email
    ORDER BY e.id DESC`
  );
  return rows;
};

const getEventById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      e.id,
      e.title,
      e.description,
      e.event_date,
      e.location,
      e.created_by,
      e.created_at,
      e.updated_at,
      u.name AS created_by_name,
      u.email AS created_by_email,
      COUNT(er.id) AS total_registrations
    FROM events e
    INNER JOIN users u ON u.id = e.created_by
    LEFT JOIN event_registrations er ON er.event_id = e.id
    WHERE e.id = ?
    GROUP BY e.id, u.name, u.email`,
    [id]
  );
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

const getEventStats = async () => {
  const [summaryRows] = await pool.query(
    `SELECT
      COUNT(e.id) AS total_events,
      COUNT(er.id) AS total_registrations,
      COUNT(DISTINCT er.user_id) AS unique_registered_users
    FROM events e
    LEFT JOIN event_registrations er ON er.event_id = e.id`
  );

  const [byEventRows] = await pool.query(
    `SELECT
      e.id,
      e.title,
      COUNT(er.id) AS registrations_count
    FROM events e
    LEFT JOIN event_registrations er ON er.event_id = e.id
    GROUP BY e.id, e.title
    ORDER BY registrations_count DESC, e.id DESC`
  );

  return {
    summary: summaryRows[0],
    byEvent: byEventRows
  };
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats
};
