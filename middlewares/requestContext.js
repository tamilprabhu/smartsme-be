const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');

/**
 * Request-scoped context store.
 *
 * AsyncLocalStorage automatically propagates the stored value through
 * the entire async call chain of a request — including awaited LLM calls,
 * tool invocations, DB queries, and any nested service/repository calls —
 * without any parameter passing.
 *
 * Export the store so config/logger.js can read from it on every log call.
 */
const requestContextStore = new AsyncLocalStorage();

/**
 * Express middleware — must be registered FIRST, before all routes.
 *
 * Generates a requestId, opens an AsyncLocalStorage context for the
 * entire request/response lifecycle, and sets X-Request-Id on the response
 * so clients can report it when raising support issues.
 *
 * Accepts an existing ID from the X-Request-Id request header so
 * upstream proxies or API gateways can inject their own trace IDs.
 */
function requestContextMiddleware(req, res, next) {
    const requestId = req.headers['x-request-id'] || `req_${randomUUID()}`;

    // Attach to req so morgan token and route handlers can read it directly
    req.requestId = requestId;

    // Return the ID to the caller — useful for client-side error reporting
    res.setHeader('X-Request-Id', requestId);

    // Run the rest of the request inside the async context
    requestContextStore.run({ requestId }, next);
}

/**
 * Read the requestId from the current async context.
 * Returns undefined when called outside a request context (e.g. startup logs).
 */
function getRequestId() {
    return requestContextStore.getStore()?.requestId;
}

module.exports = { requestContextMiddleware, getRequestId, requestContextStore };
