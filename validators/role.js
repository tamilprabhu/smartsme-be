const Joi = require('joi');
const { Role } = require('../models');
const { Op } = require('sequelize');

const roleSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .pattern(/^[A-Z_]+$/)
        .required()
        .messages({
            'string.empty': 'name cannot be blank',
            'string.min': 'name must be at least 2 characters',
            'string.max': 'name must not exceed 100 characters',
            'string.pattern.base': 'name must be uppercase letters and underscores only',
            'any.required': 'name is required'
        }),
    description: Joi.string()
        .trim()
        .allow('')
        .max(1000)
        .optional()
        .messages({
            'string.max': 'description must not exceed 1000 characters'
        })
});

const updateRoleSchema = Joi.object({
    name: roleSchema.extract('name').optional(),
    description: roleSchema.extract('description').optional()
}).min(1).messages({
    'object.min': 'at least one field is required for update'
});

const toValidationError = (error) => {
    const errors = {};
    error.details.forEach(detail => {
        const field = detail.path[0] || 'general';
        if (!errors[field]) errors[field] = [];
        errors[field].push(detail.message);
    });
    return { name: 'ValidationError', errors };
};

const checkNameUniqueness = async (name, excludeId = null) => {
    const where = { name };
    if (excludeId) {
        where.id = { [Op.ne]: excludeId };
    }
    const existing = await Role.findOne({ where });
    return !existing;
};

const validateCreate = async (roleData) => {
    const { error, value } = roleSchema.validate(roleData, { abortEarly: false });
    if (error) throw toValidationError(error);

    if (!await checkNameUniqueness(value.name)) {
        throw { name: 'ValidationError', errors: { name: ['name must be unique'] } };
    }

    return value;
};

const validateUpdate = async (id, roleData) => {
    const { error, value } = updateRoleSchema.validate(roleData, { abortEarly: false });
    if (error) throw toValidationError(error);

    if (value.name && !await checkNameUniqueness(value.name, id)) {
        throw { name: 'ValidationError', errors: { name: ['name must be unique'] } };
    }

    return value;
};

module.exports = { validateCreate, validateUpdate };
