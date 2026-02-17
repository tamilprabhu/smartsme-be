/**
 * Creates an execution context for transport-agnostic operations
 * @param {number} userId - The ID of the user performing the action
 * @param {number|null} companyId - Optional company ID for multi-tenant operations
 * @param {Object} metadata - Optional metadata (requestId, source, etc.)
 */
const createContext = (userId, companyId = null, metadata = {}) => {
  return {
    actor: { userId, companyId },
    ...metadata
  };
};

/**
 * Extracts context from HTTP request (adapter for web transport)
 */
const fromHttpRequest = (req) => {
  return createContext(
    req.auth?.getUserId(),
    req.auth?.getPrimaryCompanyId(),
    { 
      requestId: req.requestId,
      source: 'http',
      username: req.auth?.username 
    }
  );
};

module.exports = { createContext, fromHttpRequest };
