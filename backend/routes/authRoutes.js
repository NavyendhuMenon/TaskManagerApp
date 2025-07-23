const express = require('express');
const router = express.Router();
const { login, protectedRoute } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/protected', verifyToken, protectedRoute);

module.exports = router;
