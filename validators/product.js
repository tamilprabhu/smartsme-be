const Joi = require("joi");
const { Op } = require("sequelize");
const { Product } = require("../models");

const createProductSchema = Joi.object({
    productName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "productName must be a string",
            "string.empty": "productName cannot be blank",
            "string.min": "productName cannot be blank",
            "any.required": "productName is required"
        }),
    rawMaterial: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "rawMaterial must be a string",
            "string.empty": "rawMaterial cannot be blank",
            "string.min": "rawMaterial cannot be blank",
            "any.required": "rawMaterial is required"
        }),
    weight: Joi.number()
        .required()
        .messages({
            "number.base": "weight must be a number",
            "any.required": "weight is required"
        }),
    wastage: Joi.number()
        .required()
        .messages({
            "number.base": "wastage must be a number",
            "any.required": "wastage is required"
        }),
    norms: Joi.number()
        .required()
        .messages({
            "number.base": "norms must be a number",
            "any.required": "norms is required"
        }),
    totalWeight: Joi.number()
        .required()
        .messages({
            "number.base": "totalWeight must be a number",
            "any.required": "totalWeight is required"
        }),
    cavity: Joi.number()
        .required()
        .messages({
            "number.base": "cavity must be a number",
            "any.required": "cavity is required"
        }),
    shotRate: Joi.number()
        .required()
        .messages({
            "number.base": "shotRate must be a number",
            "any.required": "shotRate is required"
        }),
    perItemRate: Joi.number()
        .required()
        .messages({
            "number.base": "perItemRate must be a number",
            "any.required": "perItemRate is required"
        }),
    incentiveLimit: Joi.number()
        .required()
        .messages({
            "number.base": "incentiveLimit must be a number",
            "any.required": "incentiveLimit is required"
        }),
    salesType: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "salesType must be a string",
            "string.empty": "salesType cannot be blank",
            "string.min": "salesType cannot be blank",
            "any.required": "salesType is required"
        }),
    salesCode: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "salesCode must be a string",
            "string.empty": "salesCode cannot be blank",
            "string.min": "salesCode cannot be blank",
            "any.required": "salesCode is required"
        }),
    salesPercent: Joi.number()
        .required()
        .messages({
            "number.base": "salesPercent must be a number",
            "any.required": "salesPercent is required"
        })
}).unknown(true);

const updateProductSchema = Joi.object({
    productName: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "productName must be a string",
            "string.empty": "productName cannot be blank",
            "string.min": "productName cannot be blank"
        }),
    rawMaterial: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "rawMaterial must be a string",
            "string.empty": "rawMaterial cannot be blank",
            "string.min": "rawMaterial cannot be blank"
        }),
    weight: Joi.number()
        .optional()
        .messages({
            "number.base": "weight must be a number"
        }),
    wastage: Joi.number()
        .optional()
        .messages({
            "number.base": "wastage must be a number"
        }),
    norms: Joi.number()
        .optional()
        .messages({
            "number.base": "norms must be a number"
        }),
    totalWeight: Joi.number()
        .optional()
        .messages({
            "number.base": "totalWeight must be a number"
        }),
    cavity: Joi.number()
        .optional()
        .messages({
            "number.base": "cavity must be a number"
        }),
    shotRate: Joi.number()
        .optional()
        .messages({
            "number.base": "shotRate must be a number"
        }),
    perItemRate: Joi.number()
        .optional()
        .messages({
            "number.base": "perItemRate must be a number"
        }),
    incentiveLimit: Joi.number()
        .optional()
        .messages({
            "number.base": "incentiveLimit must be a number"
        }),
    salesType: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "salesType must be a string",
            "string.empty": "salesType cannot be blank",
            "string.min": "salesType cannot be blank"
        }),
    salesCode: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "salesCode must be a string",
            "string.empty": "salesCode cannot be blank",
            "string.min": "salesCode cannot be blank"
        }),
    salesPercent: Joi.number()
        .optional()
        .messages({
            "number.base": "salesPercent must be a number"
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

const isProductNameUniqueWithinCompany = async (productName, companyId, excludeId = null) => {
    const where = {
        productName,
        companyId
    };

    if (excludeId) {
        where.prodSequence = { [Op.ne]: excludeId };
    }

    const existing = await Product.findOne({ where });
    return !existing;
};

const validateCreate = async (payload, companyId) => {
    const { error, value } = createProductSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);

    if (!await isProductNameUniqueWithinCompany(value.productName, companyId)) {
        throw { name: "ValidationError", errors: { productName: ["productName must be unique within company"] } };
    }

    return value;
};

const validateUpdate = async (id, payload, companyId) => {
    const { error, value } = updateProductSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);

    if (value.productName && !await isProductNameUniqueWithinCompany(value.productName, companyId, id)) {
        throw { name: "ValidationError", errors: { productName: ["productName must be unique within company"] } };
    }

    return value;
};

module.exports = {
    validateCreate,
    validateUpdate
};
