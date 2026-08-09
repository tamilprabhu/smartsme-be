const express = require('express');
const { randomUUID } = require('crypto');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const aiChatService = require('../services/aiChatService');
const logger = require('../config/logger');

/**
 * @route POST /api/1.0.0/ai-chat/message
 * @desc Send message to AI assistant
 * @access Private
 *
 * Request body:
 *   { message: string, threadId?: string }
 *
 * Response:
 *   { message: string, threadId: string, timestamp: string }
 *
 * threadId is the MemorySaver session key. The client generates it once
 * per chat session and persists it (e.g. localStorage). If omitted on the
 * first request, the server generates one and returns it so the client can
 * persist it for subsequent turns.
 */
router.post('/message', authenticate, async (req, res, next) => {
    try {
        const { message, threadId } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: 'Message is required',
            });
        }

        // Use client-provided threadId or generate a new one.
        // The same threadId must be sent on every turn of a conversation
        // for MemorySaver to restore the prior state.
        const sessionThreadId = threadId || randomUUID();

        const response = await aiChatService.processMessage(message, req.auth, sessionThreadId);

        res.json({
            message: response,
            threadId: sessionThreadId,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        logger.error('AI Chat error:', error);
        next(error);
    }
});

module.exports = router;
