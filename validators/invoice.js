const Joi = require("joi");

const createInvoiceSchema = Joi.object({
    invoiceDate: Joi.date().required().messages({
        "date.base": "invoiceDate must be a valid date",
        "any.required": "invoiceDate is required"
    }),
    buyerId: Joi.string().trim().min(1).required().messages({
        "string.base": "buyerId must be a string",
        "string.empty": "buyerId cannot be blank",
        "string.min": "buyerId cannot be blank",
        "any.required": "buyerId is required"
    }),
    productId: Joi.string().trim().min(1).required().messages({
        "string.base": "productId must be a string",
        "string.empty": "productId cannot be blank",
        "string.min": "productId cannot be blank",
        "any.required": "productId is required"
    }),
    quantity: Joi.number().integer().required().messages({
        "number.base": "quantity must be a number",
        "number.integer": "quantity must be an integer",
        "any.required": "quantity is required"
    }),
    unitPrice: Joi.number().required().messages({
        "number.base": "unitPrice must be a number",
        "any.required": "unitPrice is required"
    }),
    cgstRate: Joi.number().required().messages({
        "number.base": "cgstRate must be a number",
        "any.required": "cgstRate is required"
    }),
    cgstAmount: Joi.number().required().messages({
        "number.base": "cgstAmount must be a number",
        "any.required": "cgstAmount is required"
    }),
    sgstRate: Joi.number().required().messages({
        "number.base": "sgstRate must be a number",
        "any.required": "sgstRate is required"
    }),
    sgstAmount: Joi.number().required().messages({
        "number.base": "sgstAmount must be a number",
        "any.required": "sgstAmount is required"
    }),
    totalAmount: Joi.number().required().messages({
        "number.base": "totalAmount must be a number",
        "any.required": "totalAmount is required"
    }),
    sacCode: Joi.string().trim().min(1).required().messages({
        "string.base": "sacCode must be a string",
        "string.empty": "sacCode cannot be blank",
        "string.min": "sacCode cannot be blank",
        "any.required": "sacCode is required"
    }),
    buyrGstin: Joi.string().trim().min(1).required().messages({
        "string.base": "buyrGstin must be a string",
        "string.empty": "buyrGstin cannot be blank",
        "string.min": "buyrGstin cannot be blank",
        "any.required": "buyrGstin is required"
    })
}).unknown(true);

const updateInvoiceSchema = Joi.object({
    invoiceDate: Joi.date().optional().messages({
        "date.base": "invoiceDate must be a valid date"
    }),
    buyerId: Joi.string().trim().min(1).optional().messages({
        "string.base": "buyerId must be a string",
        "string.empty": "buyerId cannot be blank",
        "string.min": "buyerId cannot be blank"
    }),
    productId: Joi.string().trim().min(1).optional().messages({
        "string.base": "productId must be a string",
        "string.empty": "productId cannot be blank",
        "string.min": "productId cannot be blank"
    }),
    quantity: Joi.number().integer().optional().messages({
        "number.base": "quantity must be a number",
        "number.integer": "quantity must be an integer"
    }),
    unitPrice: Joi.number().optional().messages({
        "number.base": "unitPrice must be a number"
    }),
    cgstRate: Joi.number().optional().messages({
        "number.base": "cgstRate must be a number"
    }),
    cgstAmount: Joi.number().optional().messages({
        "number.base": "cgstAmount must be a number"
    }),
    sgstRate: Joi.number().optional().messages({
        "number.base": "sgstRate must be a number"
    }),
    sgstAmount: Joi.number().optional().messages({
        "number.base": "sgstAmount must be a number"
    }),
    totalAmount: Joi.number().optional().messages({
        "number.base": "totalAmount must be a number"
    }),
    sacCode: Joi.string().trim().min(1).optional().messages({
        "string.base": "sacCode must be a string",
        "string.empty": "sacCode cannot be blank",
        "string.min": "sacCode cannot be blank"
    }),
    buyrGstin: Joi.string().trim().min(1).optional().messages({
        "string.base": "buyrGstin must be a string",
        "string.empty": "buyrGstin cannot be blank",
        "string.min": "buyrGstin cannot be blank"
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
    const { error, value } = createInvoiceSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateInvoiceSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
