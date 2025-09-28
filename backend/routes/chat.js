
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const chatController = require('../controllers/chatController');

// No extra 'chat' in path
router.post('/', chatController.handleChat);           // POST /api/chat
router.post('/upload', upload.single('file'), chatController.uploadDocument); // POST /api/chat/upload

module.exports = router;
