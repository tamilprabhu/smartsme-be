const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const aiChatService = require('../services/aiChatService');
const logger = require('../config/logger');

/**
 * @route POST /api/1.0.0/ai-chat/message
 * @desc Send message to AI assistant
 * @access Private
 */
router.post('/message', authenticate, async (req, res, next) => {
    try {
        const { message } = req.body;
        
        if (!message || !message.trim()) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }

        const response = await aiChatService.processMessage(message, req.auth);
        
        res.json({
            message: response,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('AI Chat error:', error);
        next(error);
    }
});

module.exports = router;
