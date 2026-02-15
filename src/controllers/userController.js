const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { logActivity } = require('../models/activityLogModel');

const buildToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'dev_secret_change_me',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) {
      return res.status(400).json({ message: 'name, email, role, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser({ name, email, role, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'name, email, and role are required' });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.updateUser(req.params.id, {
      name,
      email,
      role,
      password: hashedPassword
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await userModel.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser({
      name,
      email,
      password: hashedPassword,
      role: role || 'student'
    });

    const token = buildToken(newUser);
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      await logActivity({
        category: 'auth',
        action: 'login_attempt',
        status: 'failed',
        email: email || null,
        method: req.method,
        path: req.originalUrl,
        statusCode: 400,
        message: 'Missing email or password',
        ip: req.ip,
        userAgent: req.get('user-agent') || null
      });
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await userModel.getUserForAuthByEmail(email);
    if (!user || !user.password) {
      await logActivity({
        category: 'auth',
        action: 'login_attempt',
        status: 'failed',
        email,
        method: req.method,
        path: req.originalUrl,
        statusCode: 401,
        message: 'Invalid credentials',
        ip: req.ip,
        userAgent: req.get('user-agent') || null
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await logActivity({
        category: 'auth',
        action: 'login_attempt',
        status: 'failed',
        userId: user.id,
        email,
        method: req.method,
        path: req.originalUrl,
        statusCode: 401,
        message: 'Invalid credentials',
        ip: req.ip,
        userAgent: req.get('user-agent') || null
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = buildToken(user);
    await logActivity({
      category: 'auth',
      action: 'login_attempt',
      status: 'success',
      userId: user.id,
      email,
      method: req.method,
      path: req.originalUrl,
      statusCode: 200,
      message: 'Login successful',
      ip: req.ip,
      userAgent: req.get('user-agent') || null
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    });
  } catch (error) {
    await logActivity({
      category: 'auth',
      action: 'login_attempt',
      status: 'failed',
      email: req.body?.email || null,
      method: req.method,
      path: req.originalUrl,
      statusCode: 500,
      message: error.message,
      ip: req.ip,
      userAgent: req.get('user-agent') || null
    });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
