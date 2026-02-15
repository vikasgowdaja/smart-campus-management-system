const registrationModel = require('../models/registrationModel');

const getRegistrations = async (req, res) => {
  try {
    const rows = await registrationModel.getAllRegistrations();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRegistration = async (req, res) => {
  try {
    const row = await registrationModel.getRegistrationById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRegistration = async (req, res) => {
  try {
    const { event_id, user_id, status } = req.body;
    if (!event_id || !user_id) {
      return res.status(400).json({ message: 'event_id and user_id are required' });
    }

    const newRow = await registrationModel.createRegistration({
      event_id,
      user_id,
      status: status || 'registered'
    });

    res.status(201).json(newRow);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'event_id or user_id does not exist' });
    }
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'User is already registered for this event' });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { event_id, user_id, status } = req.body;
    if (!event_id || !user_id || !status) {
      return res.status(400).json({ message: 'event_id, user_id, and status are required' });
    }

    const updatedRow = await registrationModel.updateRegistration(req.params.id, {
      event_id,
      user_id,
      status
    });

    if (!updatedRow) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(updatedRow);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: 'event_id or user_id does not exist' });
    }
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'User is already registered for this event' });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const deleted = await registrationModel.deleteRegistration(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRegistrations,
  getRegistration,
  createRegistration,
  updateRegistration,
  deleteRegistration
};
