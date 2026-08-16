'use strict';

const logger = require('../config/logger');

// Domain errors
const DuplicateBuyerError = require('../domain/DuplicateBuyerError');
const {
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
} = require('../domain/ProductionShiftErrors');

/**
 * Global Express error handler.
 *
 * Maps known error types to deterministic HTTP responses.
 * Falls through to a 500 for anything unrecognised.
 *
 * Error type → HTTP status mapping:
 *   ValidationError                → 400 (Joi / domain shape errors)
 *   DuplicateBuyerError            → 409
 *   ProductionShiftNotFoundError   → 404
 *   InvalidProductError            → 422
 *   InvalidMachineError            → 422
 *   InvalidOrderError              → 422
 *   DuplicateOperatorError         → 422
 *   Everything else                → 500
 */
const errorHandler = (err, req, res, next) => {

    // ── 400 Validation (Joi / manual) ────────────────────────────────────────
    if (err.name === 'ValidationError') {
        logger.warn('Validation error', {
            requestId: req.requestId,
            username:  req.auth?.username,
            errors:    err.errors,
        });

        const errors = Object.entries(err.errors).flatMap(([field, messages]) =>
            messages.map((message) => ({ field, message })),
        );

        return res.status(400).json({
            status:  400,
            message: 'Validation failed',
            errors,
        });
    }

    // ── 404 Not found ────────────────────────────────────────────────────────
    if (err instanceof ProductionShiftNotFoundError) {
        logger.warn('Production shift not found', {
            requestId: req.requestId,
            username:  req.auth?.username,
            shiftId:   err.shiftId,
        });

        return res.status(404).json({
            status:  404,
            message: 'Not Found',
            errors:  [{ field: 'id', message: err.message }],
        });
    }

    // ── 409 Conflict ─────────────────────────────────────────────────────────
    if (err instanceof DuplicateBuyerError) {
        logger.warn('Duplicate buyer conflict', {
            requestId:  req.requestId,
            username:   req.auth?.username,
            buyerName:  err.buyerName,
            companyId:  err.companyId,
        });

        return res.status(409).json({
            status:  409,
            message: 'Conflict',
            errors:  [{ field: 'buyerName', message: err.message }],
        });
    }

    // ── 422 Unprocessable Entity (domain / referential errors) ───────────────
    if (
        err instanceof InvalidProductError          ||
        err instanceof InvalidMachineError          ||
        err instanceof InvalidOrderError            ||
        err instanceof DuplicateOperatorError       ||
        err instanceof NegativeCountError           ||
        err instanceof ProductionMismatchError      ||
        err instanceof RejectionExceedsProductionError ||
        err instanceof NetProductionMismatchError   ||
        err instanceof MissingIncentiveReasonError
    ) {
        const field =
            err instanceof InvalidProductError             ? 'productId'      :
            err instanceof InvalidMachineError             ? 'machineId'      :
            err instanceof InvalidOrderError               ? 'orderId'        :
            err instanceof DuplicateOperatorError          ? err.field        :
            err instanceof NegativeCountError              ? err.field        :
            err instanceof ProductionMismatchError         ? 'production'     :
            err instanceof RejectionExceedsProductionError ? 'rejection'      :
            err instanceof NetProductionMismatchError      ? 'netProduction'  :
            err instanceof MissingIncentiveReasonError     ? 'less80Reason'   :
            'base';

        logger.warn('Domain validation error', {
            requestId: req.requestId,
            username:  req.auth?.username,
            error:     err.message,
            field,
        });

        return res.status(422).json({
            status:  422,
            message: 'Unprocessable Entity',
            errors:  [{ field, message: err.message }],
        });
    }

    // ── 500 Internal server error (catch-all) ────────────────────────────────
    logger.error('Internal server error', {
        requestId: req.requestId,
        username:  req.auth?.username,
        error:     err.message,
        stack:     err.stack,
    });

    res.status(500).json({
        status:  500,
        message: 'Internal server error',
        error:   process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    });
};

module.exports = errorHandler;
