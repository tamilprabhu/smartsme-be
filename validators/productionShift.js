const Joi = require("joi");

const createShiftSchema = Joi.object({
    orderId: Joi.string().trim().min(1).optional().messages({
        "string.base": "orderId must be a string",
        "string.empty": "orderId cannot be blank",
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
    entryType: Joi.string().trim().min(1).required().messages({
        "string.base": "entryType must be a string",
        "string.empty": "entryType cannot be blank",
        "string.min": "entryType cannot be blank",
        "any.required": "entryType is required"
    }),
    shiftType: Joi.string().trim().min(1).required().messages({
        "string.base": "shiftType must be a string",
        "string.empty": "shiftType cannot be blank",
        "string.min": "shiftType cannot be blank",
        "any.required": "shiftType is required"
    }),
    shiftHours: Joi.string().trim().min(1).required().messages({
        "string.base": "shiftHours must be a string",
        "string.empty": "shiftHours cannot be blank",
        "string.min": "shiftHours cannot be blank",
        "any.required": "shiftHours is required"
    }),
    operator1: Joi.number().integer().required().messages({
        "number.base": "operator1 must be a number",
        "number.integer": "operator1 must be an integer",
        "any.required": "operator1 is required"
    }),
    supervisor: Joi.number().integer().required().messages({
        "number.base": "supervisor must be a number",
        "number.integer": "supervisor must be an integer",
        "any.required": "supervisor is required"
    })
}).unknown(true);

const updateShiftSchema = Joi.object({
    orderId: Joi.string().trim().min(1).optional().messages({
        "string.base": "orderId must be a string",
        "string.empty": "orderId cannot be blank",
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
    entryType: Joi.string().trim().min(1).optional().messages({
        "string.base": "entryType must be a string",
        "string.empty": "entryType cannot be blank",
        "string.min": "entryType cannot be blank"
    }),
    shiftType: Joi.string().trim().min(1).optional().messages({
        "string.base": "shiftType must be a string",
        "string.empty": "shiftType cannot be blank",
        "string.min": "shiftType cannot be blank"
    }),
    shiftHours: Joi.string().trim().min(1).optional().messages({
        "string.base": "shiftHours must be a string",
        "string.empty": "shiftHours cannot be blank",
        "string.min": "shiftHours cannot be blank"
    }),
    operator1: Joi.number().integer().optional().messages({
        "number.base": "operator1 must be a number",
        "number.integer": "operator1 must be an integer"
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
