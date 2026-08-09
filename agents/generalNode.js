const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

/**
 * GeneralAgent – LangGraph node
 *
 * Handles greetings, help requests, capability questions, and anything
 * the Supervisor couldn't route to a specialist. Responds conversationally
 * and writes finalResponse into state.
 */
async function generalNode(state) {
    logger.info('[GeneralAgent] Node activated');

    const { userContext } = state;
    const llm = LLMFactory.createLLM();

    const response = await llm.invoke([
        {
            role: 'system',
            content: `You are a helpful AI assistant for SmartSME, a manufacturing management platform.
User: ${userContext.username || 'User'}
Roles: ${(userContext.roles || []).join(', ')}
Company: ${userContext.companyId}

You can help with:
- 📦 Product search and catalog browsing (ask me about your products)
- 📊 Production reports and analytics (shift data, rejection rates, performance)

Respond naturally and warmly. If the user is asking what you can do, explain the above capabilities.
Keep responses concise and relevant to manufacturing.`
        },
        ...state.messages
    ]);

    const finalResponse = response.content || "Hello! I'm your SmartSME assistant. How can I help you today?";

    logger.info(`[GeneralAgent] Done – response length: ${finalResponse.length} chars`);

    return {
        messages: [{ role: 'assistant', name: 'GeneralAgent', content: finalResponse }],
        finalResponse
    };
}

module.exports = { generalNode };
