const express = require('express');
const router = express.Router();
const { handleWhatsAppWebhook } = require('../controllers/whatsappController');

// Twilio webhook endpoint (no auth needed - Twilio calls this)
router.post('/webhook', handleWhatsAppWebhook);

module.exports = router;
