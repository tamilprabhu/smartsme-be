'use strict';

/**
 * DuplicateBuyerError
 *
 * Domain error (DDD, Eric Evans §5) raised when an attempt is made to create
 * a Buyer that would violate the invariant:
 *   "A buyer with the same name must not already exist and be active within
 *    the same company."
 *
 * Keeping this as a named error type (GoF — distinct from generic Error)
 * lets the route handler perform a precise instanceof check and map to 409
 * without coupling to magic strings.
 */
class DuplicateBuyerError extends Error {
    /**
     * @param {string} buyerName  - the conflicting buyer name
     * @param {string} companyId  - tenant scope in which the duplicate was found
     */
    constructor(buyerName, companyId) {
        super(`Buyer "${buyerName}" already exists for company ${companyId}`);
        this.name = 'DuplicateBuyerError';
        this.buyerName = buyerName;
        this.companyId = companyId;

        // Maintain proper prototype chain in transpiled environments
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateBuyerError);
        }
    }
}

module.exports = DuplicateBuyerError;
