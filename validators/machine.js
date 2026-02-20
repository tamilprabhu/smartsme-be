const Joi = require("joi");
const { Op } = require("sequelize");
const { Machine } = require("../models");

const createMachineSchema = Joi.object({
    machineName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "machineName must be a string",
            "string.empty": "machineName cannot be blank",
            "string.min": "machineName cannot be blank",
            "any.required": "machineName is required"
        }),
    machineType: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "machineType must be a string",
            "string.empty": "machineType cannot be blank",
            "string.min": "machineType cannot be blank",
            "any.required": "machineType is required"
        }),
    capacity: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "capacity must be a string",
            "string.empty": "capacity cannot be blank",
            "string.min": "capacity cannot be blank",
            "any.required": "capacity is required"
        }),
    model: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.base": "model must be a string",
            "string.empty": "model cannot be blank",
            "string.min": "model cannot be blank",
            "any.required": "model is required"
        }),
    activeFlag: Joi.string()
        .trim()
        .valid("Y", "N")
        .required()
        .messages({
            "string.base": "activeFlag must be a string",
            "any.only": "activeFlag must be Y or N",
            "any.required": "activeFlag is required"
        })
}).unknown(true);

const updateMachineSchema = Joi.object({
    machineName: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "machineName must be a string",
            "string.empty": "machineName cannot be blank",
            "string.min": "machineName cannot be blank"
        }),
    machineType: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "machineType must be a string",
            "string.empty": "machineType cannot be blank",
            "string.min": "machineType cannot be blank"
        }),
    capacity: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "capacity must be a string",
            "string.empty": "capacity cannot be blank",
            "string.min": "capacity cannot be blank"
        }),
    model: Joi.string()
        .trim()
        .min(1)
        .optional()
        .messages({
            "string.base": "model must be a string",
            "string.empty": "model cannot be blank",
            "string.min": "model cannot be blank"
        }),
    activeFlag: Joi.string()
        .trim()
        .valid("Y", "N")
        .optional()
        .messages({
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

const isMachineNameUniqueWithinCompany = async (machineName, companyId, excludeId = null) => {
    const where = { machineName, companyId };

    if (excludeId) {
        where.machineSequence = { [Op.ne]: excludeId };
    }

    const existing = await Machine.findOne({ where });
    return !existing;
};

const validateCreate = async (payload, companyId) => {
    const { error, value } = createMachineSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);

    if (!await isMachineNameUniqueWithinCompany(value.machineName, companyId)) {
        throw { name: "ValidationError", errors: { machineName: ["machineName must be unique within company"] } };
    }

    return value;
};

const validateUpdate = async (id, payload, companyId) => {
    const { error, value } = updateMachineSchema.validate(payload, { abortEarly: false });
    if (error) throw toValidationError(error);

    if (value.machineName && !await isMachineNameUniqueWithinCompany(value.machineName, companyId, id)) {
        throw { name: "ValidationError", errors: { machineName: ["machineName must be unique within company"] } };
    }

    return value;
};

module.exports = {
    validateCreate,
    validateUpdate
};
