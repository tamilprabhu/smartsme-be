const Joi = require("joi");

const createSellerSchema = Joi.object({
    sellerName: Joi.string().trim().min(1).required().messages({
        "string.base": "sellerName must be a string",
        "string.empty": "sellerName cannot be blank",
        "string.min": "sellerName cannot be blank",
        "any.required": "sellerName is required"
    }),
    sellerAddress: Joi.string().trim().min(1).required().messages({
        "string.base": "sellerAddress must be a string",
        "string.empty": "sellerAddress cannot be blank",
        "string.min": "sellerAddress cannot be blank",
        "any.required": "sellerAddress is required"
    }),
    sellerPhone: Joi.string().trim().pattern(/^[0-9]{10}$/).required().messages({
        "string.base": "sellerPhone must be a string",
        "string.empty": "sellerPhone cannot be blank",
        "string.pattern.base": "sellerPhone must be 10 digits",
        "any.required": "sellerPhone is required"
    }),
    sellerEmail: Joi.string().trim().email().required().messages({
        "string.base": "sellerEmail must be a string",
        "string.empty": "sellerEmail cannot be blank",
        "string.email": "sellerEmail must be a valid email",
        "any.required": "sellerEmail is required"
    })
}).unknown(true);

const updateSellerSchema = Joi.object({
    sellerName: Joi.string().trim().min(1).optional().messages({
        "string.base": "sellerName must be a string",
        "string.empty": "sellerName cannot be blank",
        "string.min": "sellerName cannot be blank"
    }),
    sellerAddress: Joi.string().trim().min(1).optional().messages({
        "string.base": "sellerAddress must be a string",
        "string.empty": "sellerAddress cannot be blank",
        "string.min": "sellerAddress cannot be blank"
    }),
    sellerPhone: Joi.string().trim().pattern(/^[0-9]{10}$/).optional().messages({
        "string.base": "sellerPhone must be a string",
        "string.empty": "sellerPhone cannot be blank",
        "string.pattern.base": "sellerPhone must be 10 digits"
    }),
    sellerEmail: Joi.string().trim().email().optional().messages({
        "string.base": "sellerEmail must be a string",
        "string.empty": "sellerEmail cannot be blank",
        "string.email": "sellerEmail must be a valid email"
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
    const { error, value } = createSellerSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateSellerSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
