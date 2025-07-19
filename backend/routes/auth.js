const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require('../controllers/authController');
const { authenticateUser } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.post('/logout', logoutUser);
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;
