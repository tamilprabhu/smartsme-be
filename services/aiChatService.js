const logger = require('../config/logger');
const reportsAgent = require('../agents/reportsAgent');

class AiChatService {
    /**
     * Process user message and return AI response
     * @param {string} message - User message
     * @param {Object} authClaims - User authentication claims
     * @returns {Promise<string>} AI response
     */
    async processMessage(message, authClaims) {
        try {
            const userContext = this.getUserContext(authClaims);
            
            // Check if this is a reports request
            if (await this.isReportsRequest(message)) {
                const response = await reportsAgent.processReportRequest(message, userContext);
                logger.info(`AI Chat - Reports Agent - User: ${authClaims.username}`);
                return response;
            }
            
            // Fallback to simple responses
            const response = await this.generateResponse(message, userContext);
            logger.info(`AI Chat - User: ${authClaims.username}, Message: ${message.substring(0, 50)}...`);
            
            return response;
        } catch (error) {
            logger.error('AI Chat Service error:', error);
            throw new Error('Failed to process AI chat message');
        }
    }

    /**
     * Check if message is requesting a report
     * @param {string} message - User message
     * @returns {boolean} True if reports request
     */
    async isReportsRequest(message) {
        // Let the LLM-powered reports agent handle classification
        // This is just a quick pre-filter to avoid unnecessary LLM calls
        const lowerMessage = message.toLowerCase();
        return lowerMessage.includes('report') || 
               lowerMessage.includes('summary') || 
               lowerMessage.includes('analytics') ||
               lowerMessage.includes('data') ||
               lowerMessage.includes('production') ||
               lowerMessage.includes('performance') ||
               lowerMessage.includes('stats');
    }

    /**
     * Get user context for personalized AI responses
     * @param {Object} authClaims - User authentication claims
     * @returns {Object} User context
     */
    getUserContext(authClaims) {
        return {
            username: authClaims.username,
            roles: authClaims.roles?.map(r => r.name) || [],
            companyId: authClaims.getPrimaryCompanyId(),
            isOwner: authClaims.hasRole('owner'),
            isAdmin: authClaims.hasRole('admin'),
            isProductionEmployee: authClaims.hasRole('production_employee')
        };
    }

    /**
     * Generate AI response based on message and context
     * @param {string} message - User message
     * @param {Object} userContext - User context
     * @returns {Promise<string>} AI response
     */
    async generateResponse(message, userContext) {
        // Simple rule-based responses for now
        const lowerMessage = message.toLowerCase();
        
        // Manufacturing-specific responses
        if (lowerMessage.includes('production') || lowerMessage.includes('shift')) {
            return `I can help you with production management. As a ${userContext.roles.join(', ')}, you can manage production shifts, track machine performance, and monitor order quantities. What specific production information do you need?`;
        }
        
        if (lowerMessage.includes('order') || lowerMessage.includes('dispatch')) {
            return `I can assist with order management and dispatch operations. You can track order status, manage quantities, and coordinate with buyers and sellers. What would you like to know about your orders?`;
        }
        
        if (lowerMessage.includes('machine') || lowerMessage.includes('equipment')) {
            return `I can help with machine management and maintenance tracking. You can monitor machine performance, schedule maintenance, and track asset utilization. What machine information do you need?`;
        }
        
        if (lowerMessage.includes('report') || lowerMessage.includes('analytics')) {
            return `I can help you generate reports and analyze your manufacturing data. You can get insights on production efficiency, order fulfillment, and financial performance. What type of report are you looking for?`;
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return `Hello ${userContext.username}! I'm your SmartSME AI assistant. I can help you with production management, order tracking, machine monitoring, and generating reports. How can I assist you today?`;
        }
        
        // Default response
        return `I'm your SmartSME AI assistant. I can help you with:
        
• Production shift management
• Order and dispatch tracking  
• Machine and asset monitoring
• Report generation and analytics
• Employee and company management

What would you like to know more about?`;
    }
}

module.exports = new AiChatService();
