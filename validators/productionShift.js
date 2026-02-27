const Joi = require("joi");
const { EntryType } = require("../constants/productionShift");

const createShiftSchema = Joi.object({
    orderId: Joi.string().trim().min(1).allow(null, '').optional().messages({
        "string.base": "orderId must be a string",
        "string.min": "orderId cannot be blank"
    }),
    productId: Joi.string().trim().min(1).required().messages({
        "string.base": "productId must be a string",
        "string.empty": "productId cannot be blank",
        "string.min": "productId cannot be blank",
        "any.required": "productId is required"
    }),
    machineId: Joi.string().trim().min(1).required().messages({
        "string.base": "machineId must be a string",
        "string.empty": "machineId cannot be blank",
        "string.min": "machineId cannot be blank",
        "any.required": "machineId is required"
    }),
    shiftStartDate: Joi.date().required().messages({
        "date.base": "shiftStartDate must be a valid date",
        "any.required": "shiftStartDate is required"
    }),
    shiftEndDate: Joi.date().required().messages({
        "date.base": "shiftEndDate must be a valid date",
        "any.required": "shiftEndDate is required"
    }),
    entryType: Joi.string().trim().valid(EntryType.SHIFT, EntryType.HOURS).required().messages({
        "string.base": "entryType must be a string",
        "any.only": "entryType must be either SHIFT or HOURS",
        "any.required": "entryType is required"
    }),
    shiftType: Joi.when('entryType', {
        is: EntryType.SHIFT,
        then: Joi.string().trim().min(1).required().messages({
            "string.base": "shiftType must be a string",
            "string.empty": "shiftType is required when entryType is SHIFT",
            "any.required": "shiftType is required when entryType is SHIFT"
        }),
        otherwise: Joi.string().trim().allow('', null).optional().messages({
            "string.base": "shiftType must be a string"
        })
    }),
    shiftHours: Joi.when('entryType', {
        is: EntryType.HOURS,
        then: Joi.string().trim().min(1).required().messages({
            "string.base": "shiftHours must be a string",
            "string.empty": "shiftHours is required when entryType is HOURS",
            "any.required": "shiftHours is required when entryType is HOURS"
        }),
        otherwise: Joi.string().trim().allow('', null).optional().messages({
            "string.base": "shiftHours must be a string"
        })
    }),
    operator1: Joi.number().integer().required().messages({
        "number.base": "operator1 must be a number",
        "number.integer": "operator1 must be an integer",
        "any.required": "operator1 is required"
    }),
    operator2: Joi.number().integer().allow(null).optional().invalid(Joi.ref('operator1')).messages({
        "number.base": "operator2 must be a number",
        "number.integer": "operator2 must be an integer",
        "any.invalid": "operator2 must be different from operator1"
    }),
    operator3: Joi.number().integer().allow(null).optional().invalid(Joi.ref('operator1'), Joi.ref('operator2')).messages({
        "number.base": "operator3 must be a number",
        "number.integer": "operator3 must be an integer",
        "any.invalid": "operator3 must be different from operator1 and operator2"
    }),
    supervisor: Joi.number().integer().required().messages({
        "number.base": "supervisor must be a number",
        "number.integer": "supervisor must be an integer",
        "any.required": "supervisor is required"
    })
}).unknown(true);

const updateShiftSchema = Joi.object({
    orderId: Joi.string().trim().min(1).allow(null, '').optional().messages({
        "string.base": "orderId must be a string",
        "string.min": "orderId cannot be blank"
    }),
    productId: Joi.string().trim().min(1).optional().messages({
        "string.base": "productId must be a string",
        "string.empty": "productId cannot be blank",
        "string.min": "productId cannot be blank"
    }),
    machineId: Joi.string().trim().min(1).optional().messages({
        "string.base": "machineId must be a string",
        "string.empty": "machineId cannot be blank",
        "string.min": "machineId cannot be blank"
    }),
    shiftStartDate: Joi.date().optional().messages({
        "date.base": "shiftStartDate must be a valid date"
    }),
    shiftEndDate: Joi.date().optional().messages({
        "date.base": "shiftEndDate must be a valid date"
    }),
    entryType: Joi.string().trim().valid(EntryType.SHIFT, EntryType.HOURS).optional().messages({
        "string.base": "entryType must be a string",
        "any.only": "entryType must be either SHIFT or HOURS"
    }),
    shiftType: Joi.when('entryType', {
        is: EntryType.SHIFT,
        then: Joi.string().trim().min(1).required().messages({
            "string.base": "shiftType must be a string",
            "string.empty": "shiftType is required when entryType is SHIFT",
            "any.required": "shiftType is required when entryType is SHIFT"
        }),
        otherwise: Joi.string().trim().allow('', null).optional().messages({
            "string.base": "shiftType must be a string"
        })
    }),
    shiftHours: Joi.when('entryType', {
        is: EntryType.HOURS,
        then: Joi.string().trim().min(1).required().messages({
            "string.base": "shiftHours must be a string",
            "string.empty": "shiftHours is required when entryType is HOURS",
            "any.required": "shiftHours is required when entryType is HOURS"
        }),
        otherwise: Joi.string().trim().allow('', null).optional().messages({
            "string.base": "shiftHours must be a string"
        })
    }),
    operator1: Joi.number().integer().optional().messages({
        "number.base": "operator1 must be a number",
        "number.integer": "operator1 must be an integer"
    }),
    operator2: Joi.number().integer().optional().invalid(Joi.ref('operator1')).messages({
        "number.base": "operator2 must be a number",
        "number.integer": "operator2 must be an integer",
        "any.invalid": "operator2 must be different from operator1"
    }),
    operator3: Joi.number().integer().allow(null).optional().invalid(Joi.ref('operator1'), Joi.ref('operator2')).messages({
        "number.base": "operator3 must be a number",
        "number.integer": "operator3 must be an integer",
        "any.invalid": "operator3 must be different from operator1 and operator2"
    }),
    supervisor: Joi.number().integer().optional().messages({
        "number.base": "supervisor must be a number",
        "number.integer": "supervisor must be an integer"
    })
}).unknown(true);

const toValidationError = (joiError) => {
    const errors = {};
    joiError.details.forEach((detail) => {
        const field = detail.path[0];
        if (!errors[field]) errors[field] = [];
        errors[field].push(detail.message);
    });
    return { name: "ValidationError", errors };
};

const validateCreate = async (payload) => {
    const { error, value } = createShiftSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateShiftSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
