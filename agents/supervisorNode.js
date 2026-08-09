const { z } = require('zod');
const LLMFactory = require('../factories/llmFactory');
const logger = require('../config/logger');

/**
 * SupervisorNode – LangGraph node
 *
 * Uses withStructuredOutput (JSON schema enforcement) to decide which
 * worker handles the next step, or declares FINISH when the task is done.
 *
 * Key guarantees:
 * - The LLM output is schema-validated – it can ONLY return one of the
 *   allowed enum values, never a free-form string that could mismatch.
 * - If structured output fails (malformed LLM response, network error),
 *   falls back to GeneralAgent rather than crashing the graph.
 * - The Supervisor sees the full message history, so it knows whether a
 *   worker has already answered and whether to route to another or FINISH.
 */

const routingSchema = z.object({
    nextWorker: z
        .enum(['ProductAgent', 'ReportsAgent', 'GeneralAgent', 'FINISH'])
        .describe(
            "Route to 'ProductAgent' for product search/catalog questions, " +
            "'ReportsAgent' for production data/analytics/shift reports, " +
            "'GeneralAgent' for greetings, help, or unclear requests. " +
            "Choose 'FINISH' only when the last assistant message fully answers the user."
        )
});

async function supervisorNode(state) {
    logger.info('[Supervisor] Inspecting state to decide next worker...');

    const { userContext } = state;

    // Build a readable summary of the conversation so far for the supervisor
    const historyText = state.messages
        .map(msg => {
            const role = msg.name ? `${msg.name}` : (msg.role === 'human' ? 'User' : 'Assistant');
            const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
            return `${role}: ${content}`;
        })
        .join('\n');

    try {
        const llm = LLMFactory.createLLM();
        const structuredLLM = llm.withStructuredOutput(routingSchema);

        const response = await structuredLLM.invoke([
            {
                role: 'system',
                content: `You are the Orchestrator Supervisor for SmartSME, a manufacturing management system.
You manage three specialist agents:
1. ProductAgent  – handles product search, catalog browsing, product specifications, material info
2. ReportsAgent  – handles production reports, analytics, shift data, performance metrics, rejection rates
3. GeneralAgent  – handles greetings, general help, capability questions, anything else

User context: Roles: ${(userContext.roles || []).join(', ')}, Company: ${userContext.companyId}

Rules:
- If the last message is from a worker agent and it fully answers the user, choose FINISH.
- If no worker has responded yet, route to the best-fit agent for the user's request.
- If the last worker's response is incomplete or the user asked multiple things, route to the next needed agent.
- Never route to the same agent twice in a row.`
            },
            {
                role: 'user',
                content: `Conversation so far:\n${historyText}\n\nWho should act next?`
            }
        ]);

        logger.info(`[Supervisor] Routing decision: ${response.nextWorker}`);
        return { nextWorker: response.nextWorker };

    } catch (error) {
        // withStructuredOutput can fail if the LLM returns malformed output or
        // there is a transient network/API error. Fall back to GeneralAgent so
        // the user always gets a response rather than a 500.
        logger.error('[Supervisor] Structured routing failed, falling back to GeneralAgent:', error);
        return { nextWorker: 'GeneralAgent' };
    }
}

module.exports = { supervisorNode };
