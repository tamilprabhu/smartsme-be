const { StateGraph, START, END, MemorySaver } = require('@langchain/langgraph');
const { GraphState } = require('../agents/graphState');
const { supervisorNode } = require('../agents/supervisorNode');
const { productAgentNode } = require('../agents/productAgentNode');
const { reportsWizardNode } = require('../agents/reportsWizardNode');
const { generalNode } = require('../agents/generalNode');
const logger = require('../config/logger');

/**
 * SmartSME Multi-Agent Orchestration Graph
 *
 * Topology:
 *
 *   START
 *     └─▶ Supervisor  (withStructuredOutput routing)
 *              ├─▶ ProductAgent    ──┐
 *              ├─▶ ReportsWizard   ──┤ all loop back to Supervisor
 *              ├─▶ GeneralAgent    ──┘
 *              └─▶ FINISH ──▶ END
 *
 * MemorySaver checkpointer: persists full graph state (including reportConfig)
 * across HTTP requests using thread_id as the session key. This enables the
 * ReportsWizardNode to accumulate report parameters across multiple turns.
 */
const checkpointer = new MemorySaver();

const workflow = new StateGraph(GraphState)
    .addNode('Supervisor', supervisorNode)
    .addNode('ProductAgent', productAgentNode)
    .addNode('ReportsWizard', reportsWizardNode)
    .addNode('GeneralAgent', generalNode)

    .addEdge(START, 'Supervisor')

    .addConditionalEdges('Supervisor', (state) => state.nextWorker, {
        ProductAgent: 'ProductAgent',
        ReportsWizard: 'ReportsWizard',
        GeneralAgent: 'GeneralAgent',
        FINISH: END,
    })

    .addEdge('ProductAgent', 'Supervisor')
    .addEdge('ReportsWizard', 'Supervisor')
    .addEdge('GeneralAgent', 'Supervisor');

// Compile with MemorySaver — state is checkpointed after every node
const compiledGraph = workflow.compile({ checkpointer });

logger.info('[AgentOrchestrator] LangGraph multi-agent graph compiled with MemorySaver');

/**
 * Entry point used by aiChatService.
 *
 * @param {string} message     - Raw user message text
 * @param {Object} userContext - { username, companyId, roles, isOwner, isAdmin }
 * @param {string} threadId    - Unique session ID per user/conversation.
 *                               MemorySaver uses this to restore and persist state.
 * @returns {Promise<string>}  - Final response string
 */
async function processRequest(message, userContext, threadId) {
    const startTime = Date.now();
    logger.info(
        `[AgentOrchestrator] Invoking graph – user: ${userContext.username}, ` +
            `company: ${userContext.companyId}, thread: ${threadId}`,
    );

    try {
        const finalState = await compiledGraph.invoke(
            {
                messages: [{ role: 'human', content: message }],
                userContext,
            },
            // thread_id ties this invocation to the persisted checkpoint
            { configurable: { thread_id: threadId } },
        );

        const duration = Date.now() - startTime;
        const response =
            finalState.finalResponse ||
            finalState.messages[finalState.messages.length - 1]?.content ||
            "I'm sorry, I couldn't process your request. Please try again.";

        logger.info(
            `[AgentOrchestrator] Graph completed in ${duration}ms – response length: ${response.length} chars`,
        );
        return response;
    } catch (error) {
        const duration = Date.now() - startTime;
        logger.error(`[AgentOrchestrator] Graph failed after ${duration}ms:`, error);

        return "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.";
    }
}

module.exports = { processRequest };
