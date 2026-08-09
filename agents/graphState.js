const { Annotation } = require('@langchain/langgraph');

/**
 * Shared state passed through every node in the SmartSME multi-agent graph.
 *
 * messages      – append-only conversation history
 * nextWorker    – routing decision written by Supervisor, last-write-wins
 * userContext   – tenant/auth context injected once at invocation, never mutated
 * finalResponse – finished answer written by the last worker before FINISH
 * reportConfig  – wizard accumulator for multi-turn report configuration.
 *                 Uses a MERGE reducer: each wizard turn only returns the
 *                 fields it collected; untouched fields are preserved from
 *                 prior turns via MemorySaver checkpoint.
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
    reportConfig: Annotation({
        // Merge reducer: spreads existing then incoming, so partial updates
        // accumulate across turns rather than replacing the whole object.
        reducer: (existing, incoming) => ({ ...existing, ...incoming }),
        default: () => ({
            productName: null,
            startDate: null,
            endDate: null,
            isComplete: false,
        }),
    }),
});

module.exports = { GraphState };
