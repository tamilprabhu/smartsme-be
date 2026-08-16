'use strict';

const Joi = require('joi');
const { Buyer } = require('../models');
const { Op } = require('sequelize');

// ---------------------------------------------------------------------------
// Format constants — single source of truth shared by create & update schemas
// ---------------------------------------------------------------------------

/**
 * GSTIN format: 2-digit state code + PAN (5 alpha + 4 digit + 1 alpha) +
 * entity number (1 alphanumeric, never 0) + 'Z' + checksum (1 alphanumeric).
 * Total: 15 characters.
 */
const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

/**
 * Indian mobile: starts with 6–9, followed by 9 digits. Exactly 10 digits.
 */
const PHONE_PATTERN = /^[6-9]\d{9}$/;

// ---------------------------------------------------------------------------
// Reusable field definitions
// ---------------------------------------------------------------------------

const fields = {
    buyerName: Joi.string().trim().min(3).max(100).required().messages({
        'string.base': 'buyerName must be a string',
        'string.empty': 'buyerName cannot be blank',
        'string.min': 'buyerName must be at least 3 characters',
        'string.max': 'buyerName must not exceed 100 characters',
        'any.required': 'buyerName is required',
    }),

    buyerAddress: Joi.string().trim().min(10).max(200).required().messages({
        'string.base': 'buyerAddress must be a string',
        'string.empty': 'buyerAddress cannot be blank',
        'string.min': 'buyerAddress must be at least 10 characters',
        'string.max': 'buyerAddress must not exceed 200 characters',
        'any.required': 'buyerAddress is required',
    }),

    buyerPhone: Joi.string()
        .trim()
        .pattern(PHONE_PATTERN)
        .required()
        .messages({
            'string.base': 'buyerPhone must be a string',
            'string.empty': 'buyerPhone cannot be blank',
            'string.pattern.base':
                'buyerPhone must be a valid 10-digit Indian mobile number starting with 6–9',
            'any.required': 'buyerPhone is required',
        }),

    buyerEmail: Joi.string().trim().email({ tlds: { allow: false } }).max(100).required().messages({
        'string.base': 'buyerEmail must be a string',
        'string.empty': 'buyerEmail cannot be blank',
        'string.email': 'buyerEmail must be a valid email address',
        'string.max': 'buyerEmail must not exceed 100 characters',
        'any.required': 'buyerEmail is required',
    }),

    buyerGstin: Joi.string()
        .trim()
        .uppercase()
        .pattern(GSTIN_PATTERN)
        .required()
        .messages({
            'string.base': 'buyerGstin must be a string',
            'string.empty': 'buyerGstin cannot be blank',
            'string.pattern.base':
                'buyerGstin must be a valid 15-character GSTIN (e.g. 29ABCDE1234F1Z5)',
            'any.required': 'buyerGstin is required',
        }),
};

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const createBuyerSchema = Joi.object({
    buyerName: fields.buyerName,
    buyerAddress: fields.buyerAddress,
    buyerPhone: fields.buyerPhone,
    buyerEmail: fields.buyerEmail,
    buyerGstin: fields.buyerGstin,
}).options({ stripUnknown: true });

const updateBuyerSchema = Joi.object({
    buyerName: fields.buyerName.optional(),
    buyerAddress: fields.buyerAddress.optional(),
    buyerPhone: fields.buyerPhone.optional(),
    buyerEmail: fields.buyerEmail.optional(),
    buyerGstin: fields.buyerGstin.optional(),
}).options({ stripUnknown: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const toValidationError = (joiError) => {
    const errors = {};
    joiError.details.forEach((detail) => {
        const field = detail.path[0];
        if (!errors[field]) errors[field] = [];
        errors[field].push(detail.message);
    });
    return { name: 'ValidationError', errors };
};

/**
 * Check uniqueness of a field value within a company scope.
 * On update, pass excludeSequence to ignore the buyer being updated.
 *
 * @param {string} field      - Sequelize model attribute name
 * @param {string} value      - value to check
 * @param {string} companyId  - tenant scope
 * @param {number|null} excludeSequence - buyerSequence to exclude (update case)
 * @returns {Promise<boolean>} true if the value is available (no conflict)
 */
const isFieldUnique = async (field, value, companyId, excludeSequence = null) => {
    const where = {
        [field]: value,
        companyId,
        isDeleted: false,
    };
    if (excludeSequence !== null) {
        where.buyerSequence = { [Op.ne]: excludeSequence };
    }
    const existing = await Buyer.findOne({ where });
    return existing === null;
};

/**
 * Run all uniqueness checks and collect per-field error messages.
 * Returns a ValidationError-shaped object (or null if all pass).
 */
const runUniquenessChecks = async (data, companyId, excludeSequence = null) => {
    const uniquenessErrors = {};

    const checks = [
        { field: 'buyerEmail',  label: 'buyerEmail',  value: data.buyerEmail },
        { field: 'buyerPhone',  label: 'buyerPhone',  value: data.buyerPhone },
        { field: 'buyerGstin',  label: 'buyerGstin',  value: data.buyerGstin },
    ];

    await Promise.all(
        checks
            .filter(({ value }) => value !== undefined && value !== null)
            .map(async ({ field, label, value }) => {
                const unique = await isFieldUnique(field, value, companyId, excludeSequence);
                if (!unique) {
                    uniquenessErrors[label] = [
                        `${label} is already registered for this company`,
                    ];
                }
            }),
    );

    if (Object.keys(uniquenessErrors).length === 0) return null;

    return { name: 'ValidationError', errors: uniquenessErrors };
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Validate a create payload. Runs format + uniqueness checks within
 * the caller's company scope.
 *
 * @param {object} payload   - raw request body
 * @param {string} companyId - tenant identifier from JWT
 * @returns {Promise<object>} validated + stripped payload
 */
const validateCreate = async (payload, companyId) => {
    const { error, value } = createBuyerSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);

    const uniquenessError = await runUniquenessChecks(value, companyId);
    if (uniquenessError) throw uniquenessError;

    return value;
};

/**
 * Validate an update payload. Skips uniqueness check for fields not present
 * in the update body; excludes the buyer being updated from conflict detection.
 *
 * @param {object} payload         - raw request body
 * @param {string} companyId       - tenant identifier from JWT
 * @param {number} buyerSequence   - PK of the buyer being updated
 * @returns {Promise<object>} validated + stripped payload
 */
const validateUpdate = async (payload, companyId, buyerSequence) => {
    const { error, value } = updateBuyerSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);

    const uniquenessError = await runUniquenessChecks(value, companyId, buyerSequence);
    if (uniquenessError) throw uniquenessError;

    return value;
};

module.exports = { validateCreate, validateUpdate };
