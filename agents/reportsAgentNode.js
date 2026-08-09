const { ToolMessage } = require('@langchain/core/messages');
const { searchProductsTool } = require('../tools/productTools');
const { productionReportTool } = require('../tools/productionTools');
const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

/**
 * ReportsAgent – LangGraph node
 *
 * Handles production report requests. Runs a multi-step tool loop:
 *   1. LLM may call search_products to resolve a product name → productId
 *   2. LLM then calls production_report with the resolved productId + dates
 *   3. LLM synthesises a final markdown report from the raw data
 *
 * Loops up to MAX_ITERATIONS tool rounds then writes finalResponse into state.
 * All errors are caught and returned as graceful user-facing messages.
 */
const MAX_ITERATIONS = 4;

async function reportsAgentNode(state) {
    logger.info('[ReportsAgent] Node activated');

    const { userContext } = state;

    try {
        const llm = LLMFactory.createLLM();
        const agentLLM = llm.bindTools([searchProductsTool, productionReportTool]);

        const systemPrompt = {
            role: 'system',
            content: `You are a manufacturing production reports analyst for SmartSME.
User company: ${userContext.companyId}
User roles: ${(userContext.roles || []).join(', ')}
Today's date: ${new Date().toISOString().split('T')[0]}

Guidelines:
- If the user mentions a product name, FIRST call search_products to get its productId.
- Then call production_report using that productId and the date range from the user's request.
- Convert relative dates ("last week", "since Monday") to absolute YYYY-MM-DD values.
- Always include companyId in every tool call.
- After production_report returns data, respond with a clear formatted markdown report.
- Do NOT call production_report more than once.`
        };

        // Build the running message list for this node
        const runMessages = [systemPrompt, ...state.messages];

        let finalResponse = null;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const response = await agentLLM.invoke(runMessages);
            runMessages.push(response);

            // No tool calls – LLM produced a final answer
            if (!response.tool_calls || response.tool_calls.length === 0) {
                finalResponse = response.content;
                break;
            }

            logger.info(`[ReportsAgent] Iteration ${i + 1} – executing ${response.tool_calls.length} tool call(s)`);

            // Execute all tool calls in this turn
            for (const toolCall of response.tool_calls) {
                logger.info(`[ReportsAgent] Tool: ${toolCall.name}(${JSON.stringify(toolCall.args)})`);

                let toolResult;
                if (toolCall.name === 'search_products') {
                    toolResult = await searchProductsTool.invoke({
                        ...toolCall.args,
                        companyId: userContext.companyId
                    });
                } else if (toolCall.name === 'production_report') {
                    toolResult = await productionReportTool.invoke({
                        ...toolCall.args,
                        companyId: userContext.companyId
                    });
                } else {
                    toolResult = JSON.stringify({ error: true, message: `Unknown tool: ${toolCall.name}` });
                }

                runMessages.push(new ToolMessage({
                    tool_call_id: toolCall.id,
                    name: toolCall.name,
                    content: toolResult
                }));
            }
        }

        // Safety fallback if loop exhausted without a text response
        if (!finalResponse) {
            finalResponse = 'I was unable to generate the production report. Please try again with more specific dates or product name.';
            logger.warn('[ReportsAgent] Loop exhausted without final text response');
        }

        logger.info(`[ReportsAgent] Done – response length: ${finalResponse.length} chars`);

        return {
            messages: [{ role: 'assistant', name: 'ReportsAgent', content: finalResponse }],
            finalResponse
        };

    } catch (error) {
        logger.error('[ReportsAgent] Unhandled error:', error);

        const fallback = "I'm sorry, I encountered an issue while generating the production report. Please try again or rephrase your request.";
        return {
            messages: [{ role: 'assistant', name: 'ReportsAgent', content: fallback }],
            finalResponse: fallback
        };
    }
}

module.exports = { reportsAgentNode };
