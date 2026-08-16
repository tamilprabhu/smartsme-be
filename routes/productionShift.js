'use strict';

/**
 * Production Shift Routes
 *
 * Responsibilities of this file:
 *   1. Define HTTP endpoints
 *   2. Run middleware chain: authenticate → authorize → Joi validation → service call
 *   3. Map service results / domain errors to HTTP responses
 *   4. Forward unexpected errors to the global errorHandler via next(err)
 *
 * This file does NOT contain:
 *   - Business logic (belongs in use-cases / domain entity)
 *   - RBAC logic (belongs in authorizeProductionShift middleware)
 *   - Sequelize error parsing (domain errors are named classes now)
 *   - Direct model/repository imports
 */

const express = require('express');
const router = express.Router();

const authenticate        = require('../middlewares/authenticate');
const authorize           = require('../middlewares/authorizeProductionShift');
const errorHandler        = require('../middlewares/errorHandler');
const productionShiftService = require('../services/productionShift');
const { validateCreate, validateUpdate, validateRecordProduction } = require('../validators/productionShift');

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

const { SortBy, SortOrder } = require('../constants/sort');
const logger = require('../config/logger');

// ── GET /production-shift ─────────────────────────────────────────────────────

router.get('/', authenticate, authorize.read, async (req, res, next) => {
    const requestId = req.requestId;
    const page         = parseInt(req.query.page)         || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const search       = req.query.search    || '';
    const sortBy       = SortBy[req.query.sortBy   || ''] || SortBy.SEQUENCE;
    const sortOrder    = SortOrder[req.query.sortOrder || ''] || SortOrder.DESC;

    logger.info('ProductionShiftRoute: GET / - started', {
        requestId, page, itemsPerPage, search,
        userId: req.auth?.getUserId(),
    });

    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result = await productionShiftService.getAllProductionShifts(
            page, itemsPerPage, search, companyId, sortBy, sortOrder,
        );

        logger.info('ProductionShiftRoute: GET / - completed', {
            requestId,
            shiftsReturned: result.items.length,
            totalItems:     result.paging.totalItems,
        });

        res.json(result);
    } catch (err) {
        logger.error('ProductionShiftRoute: GET / - failed', {
            requestId, error: err.message, stack: err.stack,
        });
        next(err);
    }
});

// ── GET /production-shift/:id ─────────────────────────────────────────────────

router.get('/:id', authenticate, authorize.read, async (req, res, next) => {
    const requestId = req.requestId;
    const shiftSequence = req.params.id;

    logger.info(`ProductionShiftRoute: GET /${shiftSequence} - started`, {
        requestId, shiftSequence, userId: req.auth?.getUserId(),
    });

    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const shift = await productionShiftService.getProductionShiftById(shiftSequence, companyId);

        if (!shift) {
            logger.warn(`ProductionShiftRoute: GET /${shiftSequence} - not found`, { requestId });
            return res.status(404).json({ error: 'Shift not found' });
        }

        logger.info(`ProductionShiftRoute: GET /${shiftSequence} - completed`, { requestId });
        res.json(shift);
    } catch (err) {
        logger.error(`ProductionShiftRoute: GET /${shiftSequence} - failed`, {
            requestId, error: err.message, stack: err.stack,
        });
        next(err);
    }
});

// ── POST /production-shift ────────────────────────────────────────────────────

router.post('/', authenticate, authorize.create, async (req, res, next) => {
    const requestId = req.requestId;

    logger.info('ProductionShiftRoute: POST / - started', {
        requestId, userId: req.auth?.getUserId(),
    });

    try {
        // Joi boundary validation — throws ValidationError with named 'errors' map
        const validatedData = await validateCreate(req.body);

        const companyId = req.auth.getPrimaryCompanyId();
        const userId    = req.auth.getUserId();

        const shift = await productionShiftService.createProductionShift(
            validatedData, companyId, userId,
        );

        logger.info('ProductionShiftRoute: POST / - completed', {
            requestId, shiftId: shift.shiftId,
        });

        res.status(201).json(shift);
    } catch (err) {
        _handleMutationError(err, requestId, req, res, next, 'POST /');
    }
});

// ── PUT /production-shift/:id ─────────────────────────────────────────────────

router.put('/:id', authenticate, authorize.update, async (req, res, next) => {
    const requestId     = req.requestId;
    const shiftSequence = req.params.id;

    logger.info(`ProductionShiftRoute: PUT /${shiftSequence} - started`, {
        requestId, shiftSequence, userId: req.auth?.getUserId(),
    });

    try {
        // Joi boundary validation
        const validatedData = await validateUpdate(req.body);

        const companyId = req.auth.getPrimaryCompanyId();
        const userId    = req.auth.getUserId();

        const shift = await productionShiftService.updateProductionShift(
            shiftSequence, validatedData, companyId, userId,
        );

        logger.info(`ProductionShiftRoute: PUT /${shiftSequence} - completed`, { requestId });
        res.json(shift);
    } catch (err) {
        _handleMutationError(err, requestId, req, res, next, `PUT /${shiftSequence}`);
    }
});

// ── POST /production-shift/:id/production ────────────────────────────────────

router.post('/:id/production', authenticate, authorize.update, async (req, res, next) => {
    const requestId     = req.requestId;
    const shiftSequence = req.params.id;

    logger.info(`ProductionShiftRoute: POST /${shiftSequence}/production - started`, {
        requestId, shiftSequence, userId: req.auth?.getUserId(),
    });

    try {
        const validatedData = await validateRecordProduction(req.body);
        const companyId     = req.auth.getPrimaryCompanyId();
        const userId        = req.auth.getUserId();

        const shift = await productionShiftService.recordProductionShift(
            shiftSequence, validatedData, companyId, userId,
        );

        logger.info(`ProductionShiftRoute: POST /${shiftSequence}/production - completed`, { requestId });
        res.json(shift);
    } catch (err) {
        _handleMutationError(err, requestId, req, res, next, `POST /${shiftSequence}/production`);
    }
});

// ── DELETE /production-shift/:id ──────────────────────────────────────────────

router.delete('/:id', authenticate, authorize.delete, async (req, res, next) => {
    const requestId     = req.requestId;
    const shiftSequence = req.params.id;

    logger.info(`ProductionShiftRoute: DELETE /${shiftSequence} - started`, {
        requestId, shiftSequence, userId: req.auth?.getUserId(),
    });

    try {
        const companyId = req.auth.getPrimaryCompanyId();
        const result    = await productionShiftService.deleteProductionShift(shiftSequence, companyId);

        logger.info(`ProductionShiftRoute: DELETE /${shiftSequence} - completed`, { requestId });
        res.json(result);
    } catch (err) {
        if (err instanceof ProductionShiftNotFoundError) {
            logger.warn(`ProductionShiftRoute: DELETE /${shiftSequence} - not found`, { requestId });
            return res.status(404).json({ error: err.message });
        }
        logger.error(`ProductionShiftRoute: DELETE /${shiftSequence} - failed`, {
            requestId, error: err.message, stack: err.stack,
        });
        next(err);
    }
});

// ── Error handler ─────────────────────────────────────────────────────────────

router.use(errorHandler);

// ── Shared mutation error handler ─────────────────────────────────────────────

/**
 * Centralised handler for POST / PUT errors.
 * Maps named domain errors to appropriate HTTP status codes.
 * Falls through to the global errorHandler for anything unexpected.
 *
 * @param {Error}  err
 * @param {string} requestId
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @param {string} label  - for logging
 */
function _handleMutationError(err, requestId, req, res, next, label) {
    // Joi validation error (shape/type problems)
    if (err.name === 'ValidationError') {
        logger.warn(`ProductionShiftRoute: ${label} - validation error`, {
            requestId, errors: err.errors,
        });
        return next(err); // errorHandler formats this as 400
    }

    // Domain errors — known invalid references or invariant violations
    if (
        err instanceof InvalidProductError             ||
        err instanceof InvalidMachineError             ||
        err instanceof InvalidOrderError               ||
        err instanceof DuplicateOperatorError          ||
        err instanceof NegativeCountError              ||
        err instanceof ProductionMismatchError         ||
        err instanceof RejectionExceedsProductionError ||
        err instanceof NetProductionMismatchError      ||
        err instanceof MissingIncentiveReasonError
    ) {
        logger.warn(`ProductionShiftRoute: ${label} - domain error`, {
            requestId, error: err.message,
        });
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            errors: [{ field: _domainErrorField(err), message: err.message }],
        });
    }

    // Not-found (e.g. update on a deleted shift)
    if (err instanceof ProductionShiftNotFoundError) {
        logger.warn(`ProductionShiftRoute: ${label} - not found`, { requestId });
        return res.status(404).json({ error: err.message });
    }

    // Unexpected — let the global errorHandler return 500
    logger.error(`ProductionShiftRoute: ${label} - unexpected error`, {
        requestId, error: err.message, stack: err.stack,
    });
    next(err);
}

/** Map a domain error instance to the relevant field name for the response body. */
function _domainErrorField(err) {
    if (err instanceof InvalidProductError)             return 'productId';
    if (err instanceof InvalidMachineError)             return 'machineId';
    if (err instanceof InvalidOrderError)               return 'orderId';
    if (err instanceof DuplicateOperatorError)          return err.field;
    if (err instanceof NegativeCountError)              return err.field;
    if (err instanceof ProductionMismatchError)         return 'production';
    if (err instanceof RejectionExceedsProductionError) return 'rejection';
    if (err instanceof NetProductionMismatchError)      return 'netProduction';
    if (err instanceof MissingIncentiveReasonError)     return 'less80Reason';
    return 'base';
}

module.exports = router;
