const eventModel = require('../models/eventModel');

const getEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await eventModel.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location, created_by } = req.body;
    if (!title || !event_date || !location || !created_by) {
      return res.status(400).json({ message: 'title, event_date, location, and created_by are required' });
    }

    const newEvent = await eventModel.createEvent({
      title,
      description: description || null,
      event_date,
      location,
      created_by
    });
    res.status(201).json(newEvent);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'created_by user does not exist' });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, event_date, location, created_by } = req.body;
    if (!title || !event_date || !location || !created_by) {
      return res.status(400).json({ message: 'title, event_date, location, and created_by are required' });
    }

    const updatedEvent = await eventModel.updateEvent(req.params.id, {
      title,
      description: description || null,
      event_date,
      location,
      created_by
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'created_by user does not exist' });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleted = await eventModel.deleteEvent(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
