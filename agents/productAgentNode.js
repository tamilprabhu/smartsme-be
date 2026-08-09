const { ToolMessage } = require('@langchain/core/messages');
const { searchProductsTool } = require('../tools/productTools');
const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

/**
 * ProductAgent – LangGraph node
 *
 * Receives the shared graph state, invokes the LLM with search_products
 * bound, executes any tool calls, feeds results back for a final LLM
 * synthesis, and writes finalResponse into state.
 *
 * Always returns control to the Supervisor afterwards.
 */
async function productAgentNode(state) {
    logger.info('[ProductAgent] Node activated');

    const { userContext } = state;

    try {
        const llm = LLMFactory.createLLM();
        const agentLLM = llm.bindTools([searchProductsTool]);

        const systemPrompt = {
            role: 'system',
            content: `You are a manufacturing product specialist for SmartSME.
User company: ${userContext.companyId}
User roles: ${(userContext.roles || []).join(', ')}

Use the search_products tool to find products. Always pass the companyId.
After you get tool results, respond with a clear, formatted product list.
Do NOT call tools more than once per user request.`
        };

        const messages = [systemPrompt, ...state.messages];

        // First LLM turn – may emit tool_calls
        const response = await agentLLM.invoke(messages);

        let finalResponse;

        if (response.tool_calls && response.tool_calls.length > 0) {
            const toolCall = response.tool_calls[0];
            logger.info(`[ProductAgent] Executing tool: ${toolCall.name}(${JSON.stringify(toolCall.args)})`);

            // Always inject server-side companyId – never trust what the LLM put in
            const toolResult = await searchProductsTool.invoke({
                ...toolCall.args,
                companyId: userContext.companyId
            });

            // Feed result back so the LLM can produce a natural language answer
            const toolMessage = new ToolMessage({
                tool_call_id: toolCall.id,
                name: toolCall.name,
                content: toolResult
            });

            const synthesisResponse = await agentLLM.invoke([
                systemPrompt,
                ...state.messages,
                response,       // AIMessage with tool_calls
                toolMessage     // ToolMessage with results
            ]);

            finalResponse = synthesisResponse.content || toolResult;
        } else {
            finalResponse = response.content || 'I can help you search for products. What are you looking for?';
        }

        logger.info(`[ProductAgent] Done – response length: ${finalResponse.length} chars`);

        return {
            messages: [{ role: 'assistant', name: 'ProductAgent', content: finalResponse }],
            finalResponse
        };

    } catch (error) {
        logger.error('[ProductAgent] Unhandled error:', error);

        const fallback = "I'm sorry, I encountered an issue while searching for products. Please try again or rephrase your request.";
        return {
            messages: [{ role: 'assistant', name: 'ProductAgent', content: fallback }],
            finalResponse: fallback
        };
    }
}

module.exports = { productAgentNode };
