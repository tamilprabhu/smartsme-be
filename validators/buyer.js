const Joi = require("joi");

const createBuyerSchema = Joi.object({
    buyerName: Joi.string().trim().min(1).required().messages({
        "string.base": "buyerName must be a string",
        "string.empty": "buyerName cannot be blank",
        "string.min": "buyerName cannot be blank",
        "any.required": "buyerName is required"
    }),
    buyerAddress: Joi.string().trim().min(1).required().messages({
        "string.base": "buyerAddress must be a string",
        "string.empty": "buyerAddress cannot be blank",
        "string.min": "buyerAddress cannot be blank",
        "any.required": "buyerAddress is required"
    }),
    buyerPhone: Joi.string().trim().pattern(/^[0-9]{10}$/).required().messages({
        "string.base": "buyerPhone must be a string",
        "string.empty": "buyerPhone cannot be blank",
        "string.pattern.base": "buyerPhone must be 10 digits",
        "any.required": "buyerPhone is required"
    }),
    buyerEmail: Joi.string().trim().email().required().messages({
        "string.base": "buyerEmail must be a string",
        "string.empty": "buyerEmail cannot be blank",
        "string.email": "buyerEmail must be a valid email",
        "any.required": "buyerEmail is required"
    }),
    buyerGstin: Joi.string().trim().min(1).required().messages({
        "string.base": "buyerGstin must be a string",
        "string.empty": "buyerGstin cannot be blank",
        "string.min": "buyerGstin cannot be blank",
        "any.required": "buyerGstin is required"
    })
}).unknown(true);

const updateBuyerSchema = Joi.object({
    buyerName: Joi.string().trim().min(1).optional().messages({
        "string.base": "buyerName must be a string",
        "string.empty": "buyerName cannot be blank",
        "string.min": "buyerName cannot be blank"
    }),
    buyerAddress: Joi.string().trim().min(1).optional().messages({
        "string.base": "buyerAddress must be a string",
        "string.empty": "buyerAddress cannot be blank",
        "string.min": "buyerAddress cannot be blank"
    }),
    buyerPhone: Joi.string().trim().pattern(/^[0-9]{10}$/).optional().messages({
        "string.base": "buyerPhone must be a string",
        "string.empty": "buyerPhone cannot be blank",
        "string.pattern.base": "buyerPhone must be 10 digits"
    }),
    buyerEmail: Joi.string().trim().email().optional().messages({
        "string.base": "buyerEmail must be a string",
        "string.empty": "buyerEmail cannot be blank",
        "string.email": "buyerEmail must be a valid email"
    }),
    buyerGstin: Joi.string().trim().min(1).optional().messages({
        "string.base": "buyerGstin must be a string",
        "string.empty": "buyerGstin cannot be blank",
        "string.min": "buyerGstin cannot be blank"
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
    const { error, value } = createBuyerSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateBuyerSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
