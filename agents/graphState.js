const { Annotation } = require('@langchain/langgraph');

/**
 * Shared state passed through every node in the SmartSME multi-agent graph.
 *
 * messages  – append-only conversation history (HumanMessage / AIMessage / ToolMessage)
 * nextWorker – the node the Supervisor wants to hand off to next
 * userContext – tenant/auth context injected once at graph invocation; never mutated
 * finalResponse – the finished answer written by the last worker before FINISH
 */
const GraphState = Annotation.Root({
    messages: Annotation({
        reducer: (existing, incoming) => existing.concat(incoming),
        default: () => [],
    }),
    nextWorker: Annotation({
        reducer: (_, incoming) => incoming,
        default: () => 'Supervisor',
    }),
    userContext: Annotation({
        reducer: (_, incoming) => incoming,
        default: () => ({}),
    }),
    finalResponse: Annotation({
        reducer: (_, incoming) => incoming,
        default: () => null,
    }),
});

module.exports = { GraphState };
