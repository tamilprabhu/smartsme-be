const { z } = require('zod');
const { ToolMessage } = require('@langchain/core/messages');
const { searchProductsTool } = require('../tools/productTools');
const { productionReportTool } = require('../tools/productionTools');
const { resolvePreset } = require('../extractors/reportQueryExtractor');
const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

/**
 * ReportsWizardNode – LangGraph node
 *
 * Multi-turn report configuration wizard. Persists collected parameters
 * in state.reportConfig across HTTP requests via MemorySaver + thread_id.
 *
 * Turn flow:
 *   - On each invocation, inspect state.reportConfig for missing fields.
 *   - If fields are still missing, use withStructuredOutput to extract
 *     whatever the user just provided and ask for the next missing field.
 *   - Once all three fields (productName, startDate, endDate) are present,
 *     set isComplete: true and run the tool loop to generate the report.
 *   - productName is optional — if the user explicitly says "all products"
 *     or omits it, we proceed without it.
 *
 * Collected state structure (state.reportConfig):
 *   productName : string | null   – null means "all products"
 *   startDate   : string | null   – YYYY-MM-DD
 *   endDate     : string | null   – YYYY-MM-DD
 *   isComplete  : boolean
 */

// ---------------------------------------------------------------------------
// Wizard extraction schema
// ---------------------------------------------------------------------------
const WizardExtractionSchema = z.object({
    productName: z
        .string()
        .nullable()
        .describe(
            "Product name the user mentioned, or null if they want all products or didn't specify.",
        ),
    startDate: z
        .string()
        .nullable()
        .describe(
            "ISO start date YYYY-MM-DD extracted or calculated from the user's message, or null if not provided.",
        ),
    endDate: z
        .string()
        .nullable()
        .describe(
            "ISO end date YYYY-MM-DD extracted or calculated from the user's message, or null if not provided.",
        ),
    preset: z
        .enum([
            'TODAY',
            'YESTERDAY',
            'THIS_WEEK',
            'LAST_WEEK',
            'THIS_MONTH',
            'LAST_MONTH',
            'THIS_QUARTER',
            'LAST_QUARTER',
            'THIS_YEAR',
            'LAST_YEAR',
            'NONE',
        ])
        .describe('Relative preset if the user used relative time language, otherwise NONE.'),
    nextQuestion: z
        .string()
        .describe(
            'The next question to ask the user to collect a missing field. Empty string if all fields are collected.',
        ),
});

const MAX_ITERATIONS = 4;

// ---------------------------------------------------------------------------
// Node
// ---------------------------------------------------------------------------
async function reportsWizardNode(state) {
    logger.info('[ReportsWizard] Node activated');

    const { userContext, reportConfig } = state;

    try {
        const todayIso = new Date().toISOString().split('T')[0];
        const llm = LLMFactory.getLLM();
        const structuredLLM = llm.withStructuredOutput(WizardExtractionSchema);

        // ------------------------------------------------------------------
        // Step 1: Extract whatever the user just provided from their message
        // ------------------------------------------------------------------
        const extraction = await structuredLLM.invoke([
            {
                role: 'system',
                content: `You are a production report configuration wizard for SmartSME.
Today's date: ${todayIso}

Currently collected report parameters:
- Product:     ${reportConfig.productName ?? 'NOT PROVIDED'}
- Start date:  ${reportConfig.startDate ?? 'NOT PROVIDED'}
- End date:    ${reportConfig.endDate ?? 'NOT PROVIDED'}

From the user's latest message, extract any of the three parameters they provided.
For relative dates (today, last week, this month etc.), set the correct preset enum value.
For explicit dates, calculate the YYYY-MM-DD value directly.
If a field was already collected (shown above), do not change it unless the user explicitly corrects it.
If all fields are now available, set nextQuestion to an empty string.
If fields are still missing, ask for ONE missing field in nextQuestion. Keep it brief.`,
            },
            ...state.messages,
        ]);

        // Resolve presets server-side — never trust LLM date arithmetic
        let { productName, startDate, endDate } = extraction;
        if (extraction.preset !== 'NONE') {
            const resolved = resolvePreset(extraction.preset);
            startDate = resolved.startDate;
            endDate = resolved.endDate;
            logger.info(
                `[ReportsWizard] Preset "${extraction.preset}" resolved → ${startDate} to ${endDate}`,
            );
        }

        // Merge with existing config — only overwrite fields that were just provided
        const updatedConfig = {
            productName: productName !== undefined ? productName : reportConfig.productName,
            startDate: startDate || reportConfig.startDate,
            endDate: endDate || reportConfig.endDate,
            isComplete: false,
        };

        // productName is optional — null means "all products", which is valid
        const isComplete = updatedConfig.startDate !== null && updatedConfig.endDate !== null;
        updatedConfig.isComplete = isComplete;

        logger.info(
            `[ReportsWizard] Config after merge – ` +
                `product: ${updatedConfig.productName}, start: ${updatedConfig.startDate}, ` +
                `end: ${updatedConfig.endDate}, complete: ${isComplete}`,
        );

        // ------------------------------------------------------------------
        // Step 2a: Still missing fields — ask the next question
        // ------------------------------------------------------------------
        if (!isComplete) {
            const question =
                extraction.nextQuestion ||
                (!updatedConfig.startDate
                    ? 'What start date would you like for the report? (e.g. "last week", "July 1")'
                    : 'What end date would you like for the report?');

            return {
                reportConfig: updatedConfig,
                messages: [{ role: 'assistant', name: 'ReportsWizard', content: question }],
                finalResponse: question,
            };
        }

        // ------------------------------------------------------------------
        // Step 2b: All fields collected — run the tool loop to generate report
        // ------------------------------------------------------------------
        logger.info('[ReportsWizard] All parameters collected, generating report...');

        const { startDate: sd, endDate: ed, productName: pn } = updatedConfig;
        const agentLLM = llm.bindTools([searchProductsTool, productionReportTool]);

        const systemPrompt = {
            role: 'system',
            content: `You are a manufacturing production reports analyst for SmartSME.
User company: ${userContext.companyId}
User roles: ${(userContext.roles || []).join(', ')}

Report parameters (fully validated):
- Start date: ${sd}
- End date:   ${ed}
- Product:    ${pn || 'all products'}

Instructions:
${
    pn
        ? `1. Call search_products with productName "${pn}" to resolve its productId.
2. Call production_report with that productId, startDate "${sd}", endDate "${ed}".`
        : `1. Call production_report with startDate "${sd}", endDate "${ed}".`
}
3. Respond with a clear formatted markdown report.
DO NOT recalculate dates. Use exactly the values above.`,
        };

        const runMessages = [systemPrompt, ...state.messages];
        let finalResponse = null;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const response = await agentLLM.invoke(runMessages);
            runMessages.push(response);

            if (!response.tool_calls || response.tool_calls.length === 0) {
                finalResponse = response.content;
                break;
            }

            logger.info(
                `[ReportsWizard] Tool iteration ${i + 1} – ${response.tool_calls.length} call(s)`,
            );

            for (const toolCall of response.tool_calls) {
                logger.info(
                    `[ReportsWizard] Tool: ${toolCall.name}(${JSON.stringify(toolCall.args)})`,
                );

                let toolResult;
                if (toolCall.name === 'search_products') {
                    toolResult = await searchProductsTool.invoke({
                        ...toolCall.args,
                        companyId: userContext.companyId,
                    });
                } else if (toolCall.name === 'production_report') {
                    toolResult = await productionReportTool.invoke({
                        ...toolCall.args,
                        companyId: userContext.companyId,
                        startDate: sd,
                        endDate: ed,
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
            finalResponse = 'I was unable to generate the production report. Please try again.';
            logger.warn('[ReportsWizard] Tool loop exhausted without final text response');
        }

        // Reset reportConfig so the next report request starts fresh
        const resetConfig = {
            productName: null,
            startDate: null,
            endDate: null,
            isComplete: false,
        };

        logger.info(`[ReportsWizard] Report generated – ${finalResponse.length} chars`);

        return {
            reportConfig: resetConfig,
            messages: [{ role: 'assistant', name: 'ReportsWizard', content: finalResponse }],
            finalResponse,
        };
    } catch (error) {
        logger.error('[ReportsWizard] Unhandled error:', error);

        const fallback =
            "I'm sorry, I encountered an issue configuring your report. Please try again.";
        return {
            messages: [{ role: 'assistant', name: 'ReportsWizard', content: fallback }],
            finalResponse: fallback,
        };
    }
}

module.exports = { reportsWizardNode };
