const { StateGraph, START, END } = require('@langchain/langgraph');
const { GraphState } = require('../agents/graphState');
const { supervisorNode } = require('../agents/supervisorNode');
const { productAgentNode } = require('../agents/productAgentNode');
const { reportsAgentNode } = require('../agents/reportsAgentNode');
const { generalNode } = require('../agents/generalNode');
const logger = require('../config/logger');

/**
 * SmartSME Multi-Agent Orchestration Graph
 *
 * Topology:
 *
 *   START
 *     └─▶ Supervisor  (withStructuredOutput routing)
 *              ├─▶ ProductAgent  ──┐
 *              ├─▶ ReportsAgent  ──┤ all loop back to Supervisor
 *              ├─▶ GeneralAgent  ──┘
 *              └─▶ FINISH ──▶ END
 *
 * The Supervisor sees the full message history on every pass, so it knows
 * whether a worker already answered and whether to route to another agent
 * or declare FINISH. This matches the reference implementation pattern
 * from multi-agent-orchestration/index.js.
 */
const workflow = new StateGraph(GraphState)
    // Register all nodes
    .addNode('Supervisor', supervisorNode)
    .addNode('ProductAgent', productAgentNode)
    .addNode('ReportsAgent', reportsAgentNode)
    .addNode('GeneralAgent', generalNode)

    // Graph always starts at Supervisor
    .addEdge(START, 'Supervisor')

    // Supervisor uses conditional edges – routes based on state.nextWorker
    .addConditionalEdges(
        'Supervisor',
        (state) => state.nextWorker,
        {
            ProductAgent: 'ProductAgent',
            ReportsAgent: 'ReportsAgent',
            GeneralAgent: 'GeneralAgent',
            FINISH: END
        }
    )

    // Every worker loops back to Supervisor after completing their work
    .addEdge('ProductAgent', 'Supervisor')
    .addEdge('ReportsAgent', 'Supervisor')
    .addEdge('GeneralAgent', 'Supervisor');

const compiledGraph = workflow.compile();

logger.info('[AgentOrchestrator] LangGraph multi-agent graph compiled successfully');

/**
 * Entry point used by aiChatService.
 * Injects userContext into the initial state so every node can access
 * tenant/auth data without it being part of the messages array.
 *
 * @param {string} message  - Raw user message text
 * @param {Object} userContext - { username, companyId, roles, isOwner, isAdmin }
 * @returns {Promise<string>} - Final response string
 */
async function processRequest(message, userContext) {
    const startTime = Date.now();
    logger.info(`[AgentOrchestrator] Invoking graph – user: ${userContext.username}, company: ${userContext.companyId}`);

    const finalState = await compiledGraph.invoke({
        messages: [{ role: 'human', content: message }],
        userContext
    });

    const duration = Date.now() - startTime;
    const response = finalState.finalResponse
        || finalState.messages[finalState.messages.length - 1]?.content
        || "I'm sorry, I couldn't process your request. Please try again.";

    logger.info(`[AgentOrchestrator] Graph completed in ${duration}ms – response length: ${response.length} chars`);
    return response;
}

module.exports = { processRequest };
