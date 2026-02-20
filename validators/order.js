const Joi = require("joi");

const createOrderSchema = Joi.object({
    orderName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "orderName must be a string",
            "string.empty": "orderName cannot be blank",
            "string.min": "orderName cannot be blank",
            "any.required": "orderName is required"
        }),
    productId: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "productId must be a string",
            "string.empty": "productId cannot be blank",
            "string.min": "productId cannot be blank",
            "any.required": "productId is required"
        }),
    buyerId: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "buyerId must be a string",
            "string.empty": "buyerId cannot be blank",
            "string.min": "buyerId cannot be blank",
            "any.required": "buyerId is required"
        }),
    orderStatus: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "orderStatus must be a string",
            "string.empty": "orderStatus cannot be blank",
            "string.min": "orderStatus cannot be blank",
            "any.required": "orderStatus is required"
        }),
    orderDate: Joi.date()
        .required()
        .messages({
            "date.base": "orderDate must be a valid date",
            "any.required": "orderDate is required"
        }),
    targetDate: Joi.date()
        .required()
        .messages({
            "date.base": "targetDate must be a valid date",
            "any.required": "targetDate is required"
        }),
    orderQuantity: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "orderQuantity must be a number",
            "number.integer": "orderQuantity must be an integer",
            "any.required": "orderQuantity is required"
        }),
    price: Joi.number()
        .required()
        .messages({
            "number.base": "price must be a number",
            "any.required": "price is required"
        }),
    discount: Joi.number()
        .required()
        .messages({
            "number.base": "discount must be a number",
            "any.required": "discount is required"
        }),
    totalPrice: Joi.number()
        .required()
        .messages({
            "number.base": "totalPrice must be a number",
            "any.required": "totalPrice is required"
        })
}).unknown(true);

const updateOrderSchema = Joi.object({
    orderName: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "orderName must be a string",
            "string.empty": "orderName cannot be blank",
            "string.min": "orderName cannot be blank"
        }),
    productId: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "productId must be a string",
            "string.empty": "productId cannot be blank",
            "string.min": "productId cannot be blank"
        }),
    buyerId: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "buyerId must be a string",
            "string.empty": "buyerId cannot be blank",
            "string.min": "buyerId cannot be blank"
        }),
    orderStatus: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "orderStatus must be a string",
            "string.empty": "orderStatus cannot be blank",
            "string.min": "orderStatus cannot be blank"
        }),
    orderDate: Joi.date()
        .optional()
        .messages({
            "date.base": "orderDate must be a valid date"
        }),
    targetDate: Joi.date()
        .optional()
        .messages({
            "date.base": "targetDate must be a valid date"
        }),
    orderQuantity: Joi.number()
        .integer()
        .optional()
        .messages({
            "number.base": "orderQuantity must be a number",
            "number.integer": "orderQuantity must be an integer"
        }),
    price: Joi.number()
        .optional()
        .messages({
            "number.base": "price must be a number"
        }),
    discount: Joi.number()
        .optional()
        .messages({
            "number.base": "discount must be a number"
        }),
    totalPrice: Joi.number()
        .optional()
        .messages({
            "number.base": "totalPrice must be a number"
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
    const { error, value } = createOrderSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateOrderSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = {
    validateCreate,
    validateUpdate
};
