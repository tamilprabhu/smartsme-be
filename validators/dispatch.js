const Joi = require("joi");

const createDispatchSchema = Joi.object({
    productId: Joi.string().trim().min(1).required().messages({
        "string.base": "productId must be a string",
        "string.empty": "productId cannot be blank",
        "string.min": "productId cannot be blank",
        "any.required": "productId is required"
    }),
    orderId: Joi.string().trim().min(1).required().messages({
        "string.base": "orderId must be a string",
        "string.empty": "orderId cannot be blank",
        "string.min": "orderId cannot be blank",
        "any.required": "orderId is required"
    }),
    dispatchDate: Joi.date().required().messages({
        "date.base": "dispatchDate must be a valid date",
        "any.required": "dispatchDate is required"
    }),
    quantity: Joi.number().integer().required().messages({
        "number.base": "quantity must be a number",
        "number.integer": "quantity must be an integer",
        "any.required": "quantity is required"
    }),
    noOfPacks: Joi.number().integer().required().messages({
        "number.base": "noOfPacks must be a number",
        "number.integer": "noOfPacks must be an integer",
        "any.required": "noOfPacks is required"
    }),
    totalWeight: Joi.number().required().messages({
        "number.base": "totalWeight must be a number",
        "any.required": "totalWeight is required"
    }),
    normalWeight: Joi.number().required().messages({
        "number.base": "normalWeight must be a number",
        "any.required": "normalWeight is required"
    }),
    normsWeight: Joi.number().required().messages({
        "number.base": "normsWeight must be a number",
        "any.required": "normsWeight is required"
    })
}).unknown(true);

const updateDispatchSchema = Joi.object({
    productId: Joi.string().trim().min(1).optional().messages({
        "string.base": "productId must be a string",
        "string.empty": "productId cannot be blank",
        "string.min": "productId cannot be blank"
    }),
    orderId: Joi.string().trim().min(1).optional().messages({
        "string.base": "orderId must be a string",
        "string.empty": "orderId cannot be blank",
        "string.min": "orderId cannot be blank"
    }),
    dispatchDate: Joi.date().optional().messages({
        "date.base": "dispatchDate must be a valid date"
    }),
    quantity: Joi.number().integer().optional().messages({
        "number.base": "quantity must be a number",
        "number.integer": "quantity must be an integer"
    }),
    noOfPacks: Joi.number().integer().optional().messages({
        "number.base": "noOfPacks must be a number",
        "number.integer": "noOfPacks must be an integer"
    }),
    totalWeight: Joi.number().optional().messages({
        "number.base": "totalWeight must be a number"
    }),
    normalWeight: Joi.number().optional().messages({
        "number.base": "normalWeight must be a number"
    }),
    normsWeight: Joi.number().optional().messages({
        "number.base": "normsWeight must be a number"
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
    const { error, value } = createDispatchSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateDispatchSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
