const Joi = require("joi");

const createEmployeeSchema = Joi.object({
    userId: Joi.number().integer().required().messages({
        "number.base": "userId must be a number",
        "number.integer": "userId must be an integer",
        "any.required": "userId is required"
    }),
    salary: Joi.number().required().messages({
        "number.base": "salary must be a number",
        "any.required": "salary is required"
    }),
    activeFlag: Joi.string().trim().valid("Y", "N").required().messages({
        "string.base": "activeFlag must be a string",
        "any.only": "activeFlag must be Y or N",
        "any.required": "activeFlag is required"
    })
}).unknown(true);

const updateEmployeeSchema = Joi.object({
    userId: Joi.number().integer().optional().messages({
        "number.base": "userId must be a number",
        "number.integer": "userId must be an integer"
    }),
    salary: Joi.number().optional().messages({
        "number.base": "salary must be a number"
    }),
    activeFlag: Joi.string().trim().valid("Y", "N").optional().messages({
        "string.base": "activeFlag must be a string",
        "any.only": "activeFlag must be Y or N"
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
    const { error, value } = createEmployeeSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

const validateUpdate = async (payload) => {
    const { error, value } = updateEmployeeSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);
    return value;
};

module.exports = { validateCreate, validateUpdate };
