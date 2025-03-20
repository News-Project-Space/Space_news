// Routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPayment } = require('../Controllers/paymentController');

// Define your routes
router.post('/payments', createPayment);  // POST route for handling payments

module.exports = router;
