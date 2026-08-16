'use strict';

/**
 * ProductionShiftErrors
 *
 * Named domain errors for the ProductionShift bounded context (DDD, Evans §5).
 * Each error maps to a precise business invariant or application-layer check.
 * Using distinct class types lets errorHandler do a clean instanceof dispatch
 * without coupling to magic strings.
 */

class ProductionShiftNotFoundError extends Error {
    /**
     * @param {string|number} id - the shift sequence or shift ID that was not found
     */
    constructor(id) {
        super(`Production shift "${id}" not found`);
        this.name = 'ProductionShiftNotFoundError';
        this.shiftId = id;
        if (Error.captureStackTrace) Error.captureStackTrace(this, ProductionShiftNotFoundError);
    }
}

class InvalidProductError extends Error {
    /**
     * @param {string} productId - the productId that failed the existence check
     */
    constructor(productId) {
        super(`Product "${productId}" does not exist or is not active`);
        this.name = 'InvalidProductError';
        this.productId = productId;
        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidProductError);
    }
}

class InvalidMachineError extends Error {
    /**
     * @param {string} machineId - the machineId that failed the existence check
     */
    constructor(machineId) {
        super(`Machine "${machineId}" does not exist or is not active`);
        this.name = 'InvalidMachineError';
        this.machineId = machineId;
        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidMachineError);
    }
}

class InvalidOrderError extends Error {
    /**
     * @param {string} orderId - the orderId that failed the existence check
     */
    constructor(orderId) {
        super(`Order "${orderId}" does not exist or is not active`);
        this.name = 'InvalidOrderError';
        this.orderId = orderId;
        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidOrderError);
    }
}

class DuplicateOperatorError extends Error {
    /**
     * @param {string} field   - which operator field is duplicate (e.g. 'operator2')
     * @param {number} value   - the duplicate employee ID
     */
    constructor(field, value) {
        super(`${field} (${value}) must be different from the other assigned operators`);
        this.name = 'DuplicateOperatorError';
        this.field = field;
        this.value = value;
        if (Error.captureStackTrace) Error.captureStackTrace(this, DuplicateOperatorError);
    }
}

class NegativeCountError extends Error {
    constructor(field, value) {
        super(`${field} cannot be negative (got ${value})`);
        this.name = 'NegativeCountError';
        this.field = field;
        this.value = value;
        if (Error.captureStackTrace) Error.captureStackTrace(this, NegativeCountError);
    }
}

class ProductionMismatchError extends Error {
    constructor(closingCount, openingCount, actual) {
        super(`production must equal closingCount - openingCount (${closingCount} - ${openingCount} = ${closingCount - openingCount}, got ${actual})`);
        this.name = 'ProductionMismatchError';
        if (Error.captureStackTrace) Error.captureStackTrace(this, ProductionMismatchError);
    }
}

class RejectionExceedsProductionError extends Error {
    constructor(rejection, production) {
        super(`rejection (${rejection}) cannot exceed production (${production})`);
        this.name = 'RejectionExceedsProductionError';
        if (Error.captureStackTrace) Error.captureStackTrace(this, RejectionExceedsProductionError);
    }
}

class NetProductionMismatchError extends Error {
    constructor(production, rejection, actual) {
        super(`netProduction must equal production - rejection (${production} - ${rejection} = ${production - rejection}, got ${actual})`);
        this.name = 'NetProductionMismatchError';
        if (Error.captureStackTrace) Error.captureStackTrace(this, NetProductionMismatchError);
    }
}

class MissingIncentiveReasonError extends Error {
    constructor() {
        super(`less80Reason is required when netProduction is below the incentive limit`);
        this.name = 'MissingIncentiveReasonError';
        if (Error.captureStackTrace) Error.captureStackTrace(this, MissingIncentiveReasonError);
    }
}

module.exports = {
    ProductionShiftNotFoundError,
    InvalidProductError,
    InvalidMachineError,
    InvalidOrderError,
    DuplicateOperatorError,
    NegativeCountError,
    ProductionMismatchError,
    RejectionExceedsProductionError,
    NetProductionMismatchError,
    MissingIncentiveReasonError,
};
