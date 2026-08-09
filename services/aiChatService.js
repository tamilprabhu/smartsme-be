const logger = require('../config/logger');
const { processRequest } = require('../services/agentOrchestrator');

class AiChatService {
    /**
     * Process user message and return AI response via the LangGraph
     * multi-agent graph (Supervisor → specialist workers → FINISH).
     *
     * @param {string} message - User message
     * @param {Object} authClaims - User authentication claims
     * @returns {Promise<string>} AI response
     */
    async processMessage(message, authClaims) {
        try {
            const userContext = this.getUserContext(authClaims);

            const response = await processRequest(message, userContext);

            logger.info(`[AiChatService] Response delivered – user: ${authClaims.username}`);
            return response;
        } catch (error) {
            logger.error('AI Chat Service error:', error);
            throw new Error('Failed to process AI chat message');
        }
    }

    /**
     * Get user context for personalized AI responses
     * @param {Object} authClaims - User authentication claims
     * @returns {Object} User context
     */
    getUserContext(authClaims) {
        return {
            username: authClaims.username,
            roles: authClaims.roles?.map((r) => r.name) || [],
            companyId: authClaims.getPrimaryCompanyId(),
            isOwner: authClaims.hasRole('owner'),
            isAdmin: authClaims.hasRole('admin'),
            isProductionEmployee: authClaims.hasRole('production_employee'),
        };
    }
}

module.exports = new AiChatService();
