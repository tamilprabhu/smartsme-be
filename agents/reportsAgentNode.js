const { ToolMessage } = require('@langchain/core/messages');
const { searchProductsTool } = require('../tools/productTools');
const { productionReportTool } = require('../tools/productionTools');
const { extractReportQuery } = require('../extractors/reportQueryExtractor');
const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

/**
 * ReportsAgent – LangGraph node
 *
 * Flow:
 *   1. extractReportQuery() – structured LLM call with ReportQuerySchema.
 *      Validates the message is a report request and resolves all dates
 *      to concrete YYYY-MM-DD values (presets resolved server-side).
 *      If the message is not a valid report query, returns a rejection
 *      message immediately without touching any tools.
 *
 *   2. Tool loop (up to MAX_ITERATIONS):
 *      a. If a productName was extracted, LLM calls search_products first
 *         to resolve it to a productId.
 *      b. LLM calls production_report with the pre-validated dates and
 *         resolved productId.
 *      c. LLM synthesises a formatted markdown report from the tool result.
 *
 * Dates are NEVER left to the tool-calling LLM to calculate – they are
 * extracted, validated by Zod, and injected into the prompt as concrete
 * values. This eliminates the primary source of fragility in date handling.
 */
const MAX_ITERATIONS = 4;

async function reportsAgentNode(state) {
    logger.info('[ReportsAgent] Node activated');

    const { userContext } = state;

    try {
        // ------------------------------------------------------------------
        // Step 1: Structured date extraction
        // ------------------------------------------------------------------
        const userMessage = state.messages[state.messages.length - 1]?.content || '';

        const queryInfo = await extractReportQuery(userMessage);

        // If the message is not a valid report request, short-circuit
        if (queryInfo.isValidReportQuery === 'NO') {
            logger.info(`[ReportsAgent] Query rejected – ${queryInfo.rejectionReason}`);
            const rejection = `I can help with production reports and shift analytics. ${queryInfo.rejectionReason || 'Please ask about production data, shift summaries, or performance metrics.'}`;
            return {
                messages: [{ role: 'assistant', name: 'ReportsAgent', content: rejection }],
                finalResponse: rejection,
            };
        }

        const { startDate, endDate, productName } = queryInfo;

        logger.info(
            `[ReportsAgent] Query valid – product: ${productName || 'all'}, ` +
                `range: ${startDate} to ${endDate}, explanation: ${queryInfo.explanation}`,
        );

        // ------------------------------------------------------------------
        // Step 2: Tool loop with pre-validated dates injected into prompt
        // ------------------------------------------------------------------
        const llm = LLMFactory.getLLM();
        const agentLLM = llm.bindTools([searchProductsTool, productionReportTool]);

        const systemPrompt = {
            role: 'system',
            content: `You are a manufacturing production reports analyst for SmartSME.
User company: ${userContext.companyId}
User roles: ${(userContext.roles || []).join(', ')}

The report parameters have already been validated and resolved:
- Start date: ${startDate}
- End date:   ${endDate}
- Product:    ${productName || 'all products'}

Instructions:
${
    productName
        ? `1. Call search_products with productName "${productName}" to get its productId.
2. Then call production_report with that productId, startDate "${startDate}", endDate "${endDate}".`
        : `1. Call production_report directly with startDate "${startDate}", endDate "${endDate}".`
}
3. After production_report returns data, respond with a clear formatted markdown report.
DO NOT recalculate dates. Use exactly the dates provided above.`,
        };

        const runMessages = [systemPrompt, ...state.messages];
        let finalResponse = null;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const response = await agentLLM.invoke(runMessages);
            runMessages.push(response);

            // No tool calls – LLM produced the final narrative response
            if (!response.tool_calls || response.tool_calls.length === 0) {
                finalResponse = response.content;
                break;
            }

            logger.info(
                `[ReportsAgent] Iteration ${i + 1} – executing ${response.tool_calls.length} tool call(s)`,
            );

            for (const toolCall of response.tool_calls) {
                logger.info(
                    `[ReportsAgent] Tool: ${toolCall.name}(${JSON.stringify(toolCall.args)})`,
                );

                let toolResult;

                if (toolCall.name === 'search_products') {
                    toolResult = await searchProductsTool.invoke({
                        ...toolCall.args,
                        companyId: userContext.companyId,
                    });
                } else if (toolCall.name === 'production_report') {
                    // Always enforce the validated dates – never let the LLM override them
                    toolResult = await productionReportTool.invoke({
                        ...toolCall.args,
                        companyId: userContext.companyId,
                        startDate,
                        endDate,
                    });
                } else {
                    toolResult = JSON.stringify({
                        error: true,
                        message: `Unknown tool: ${toolCall.name}`,
                    });
                }

                runMessages.push(
                    new ToolMessage({
                        tool_call_id: toolCall.id,
                        name: toolCall.name,
                        content: toolResult,
                    }),
                );
            }
        }

        if (!finalResponse) {
            finalResponse =
                'I was unable to generate the production report. Please try again with more specific dates or product name.';
            logger.warn('[ReportsAgent] Loop exhausted without final text response');
        }

        logger.info(`[ReportsAgent] Done – response length: ${finalResponse.length} chars`);

        return {
            messages: [{ role: 'assistant', name: 'ReportsAgent', content: finalResponse }],
            finalResponse,
        };
    } catch (error) {
        logger.error('[ReportsAgent] Unhandled error:', error);

        const fallback =
            "I'm sorry, I encountered an issue while generating the production report. Please try again or rephrase your request.";
        return {
            messages: [{ role: 'assistant', name: 'ReportsAgent', content: fallback }],
            finalResponse: fallback,
        };
    }
}

module.exports = { reportsAgentNode };
