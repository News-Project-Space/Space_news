const express = require('express');
const router = express.Router();
const journalistController = require('../Controllers/journalistController');
const authMiddleware = require('../Middlewares/authMiddleware'); // middleware للتحقق من التوكن

router.post('/journalist', authMiddleware, journalistController.upload.single('profileImage'), journalistController.createJournalist);

module.exports = router;