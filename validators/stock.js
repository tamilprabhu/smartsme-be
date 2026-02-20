const Joi = require("joi");

const createStockSchema = Joi.object({
    sellerId: Joi.string().trim().min(1).required().messages({
        "string.base": "sellerId must be a string",
        "string.empty": "sellerId cannot be blank",
        "string.min": "sellerId cannot be blank",
        "any.required": "sellerId is required"
    }),
    stockDate: Joi.date().required().messages({
        "date.base": "stockDate must be a valid date",
        "any.required": "stockDate is required"
    }),
    rawMaterial: Joi.string().trim().min(1).required().messages({
        "string.base": "rawMaterial must be a string",
        "string.empty": "rawMaterial cannot be blank",
        "string.min": "rawMaterial cannot be blank",
        "any.required": "rawMaterial is required"
    }),
    noOfBars: Joi.number().integer().required().messages({
        "number.base": "noOfBars must be a number",
        "number.integer": "noOfBars must be an integer",
        "any.required": "noOfBars is required"
    }),
    weight: Joi.number().required().messages({
        "number.base": "weight must be a number",
        "any.required": "weight is required"
    })
}).unknown(true);

const updateStockSchema = Joi.object({
    sellerId: Joi.string().trim().min(1).optional().messages({
        "string.base": "sellerId must be a string",
        "string.empty": "sellerId cannot be blank",
        "string.min": "sellerId cannot be blank"
    }),
    stockDate: Joi.date().optional().messages({
        "date.base": "stockDate must be a valid date"
    }),
    rawMaterial: Joi.string().trim().min(1).optional().messages({
        "string.base": "rawMaterial must be a string",
        "string.empty": "rawMaterial cannot be blank",
        "string.min": "rawMaterial cannot be blank"
    }),
    noOfBars: Joi.number().integer().optional().messages({
        "number.base": "noOfBars must be a number",
        "number.integer": "noOfBars must be an integer"
    }),
    weight: Joi.number().optional().messages({
        "number.base": "weight must be a number"
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
    const { error, value } = createStockSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateStockSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
