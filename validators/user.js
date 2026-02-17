const Joi = require('joi');
const { User } = require('../models');
const { Op } = require('sequelize');

const userSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(8)
        .max(15)
        .pattern(/^[a-zA-Z0-9]+$/)
        .invalid('admin', 'root', 'super')
        .required()
        .messages({
            'string.empty': 'username cannot be blank',
            'string.min': 'username must be at least 8 characters',
            'string.max': 'username must not exceed 15 characters',
            'string.pattern.base': 'username must be alphanumeric only, no symbols allowed',
            'any.invalid': 'username cannot be admin, root, or super',
            'any.required': 'username is required'
        }),
    
    firstName: Joi.string()
        .trim()
        .min(3)
        .max(10)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.empty': 'firstName cannot be blank',
            'string.min': 'firstName must be at least 3 characters',
            'string.max': 'firstName must not exceed 10 characters',
            'string.pattern.base': 'firstName must contain only alphabets, no spaces allowed',
            'any.required': 'firstName is required'
        }),
    
    lastName: Joi.string()
        .trim()
        .min(3)
        .max(10)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.empty': 'lastName cannot be blank',
            'string.min': 'lastName must be at least 3 characters',
            'string.max': 'lastName must not exceed 10 characters',
            'string.pattern.base': 'lastName must contain only alphabets, no spaces allowed',
            'any.required': 'lastName is required'
        }),
    
    name: Joi.string()
        .trim()
        .min(8)
        .max(20)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            'string.empty': 'name cannot be blank',
            'string.min': 'name must be at least 8 characters',
            'string.max': 'name must not exceed 20 characters',
            'string.pattern.base': 'name must contain only alphabets',
            'any.required': 'name is required'
        }),
    
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'email cannot be blank',
            'string.email': 'email must be a valid email address',
            'any.required': 'email is required'
        }),
    
    mobile: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            'string.empty': 'mobile cannot be blank',
            'string.pattern.base': 'mobile must be a valid 10-digit Indian mobile number',
            'any.required': 'mobile is required'
        }),
    
    address: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'address cannot be blank',
            'any.required': 'address is required'
        }),
    
    password: Joi.string()
        .min(8)
        .max(15)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
        .required()
        .messages({
            'string.empty': 'password cannot be blank',
            'string.min': 'password must be at least 8 characters',
            'string.max': 'password must not exceed 10 characters',
            'string.pattern.base': 'password must contain at least one uppercase, one lowercase, one number and one symbol, no spaces allowed',
            'any.required': 'password is required'
        })
});

const updateUserSchema = userSchema.fork(
    ['username', 'firstName', 'lastName', 'name', 'email', 'mobile', 'address', 'password'],
    (schema) => schema.optional()
);

const checkUniqueness = async (field, value, excludeId = null) => {
    const where = { [field]: value };
    
    if (excludeId) {
        where.id = { [Op.ne]: excludeId };
    }
    
    const existing = await User.findOne({ where });
    return !existing;
};

const validateCreate = async (userData) => {
    const { error, value } = userSchema.validate(userData, { abortEarly: false });
    
    if (error) {
        const errors = {};
        error.details.forEach(detail => {
            const field = detail.path[0];
            if (!errors[field]) errors[field] = [];
            errors[field].push(detail.message);
        });
        throw { name: 'ValidationError', errors };
    }
    
    if (!await checkUniqueness('username', value.username)) {
        throw { name: 'ValidationError', errors: { username: ['username must be unique'] } };
    }
    
    if (!await checkUniqueness('email', value.email)) {
        throw { name: 'ValidationError', errors: { email: ['email must be unique'] } };
    }
    
    if (!await checkUniqueness('mobile', value.mobile)) {
        throw { name: 'ValidationError', errors: { mobile: ['mobile must be unique'] } };
    }
    
    return value;
};

const validateUpdate = async (id, userData, currentPassword) => {
    const { error, value } = updateUserSchema.validate(userData, { abortEarly: false });
    
    if (error) {
        const errors = {};
        error.details.forEach(detail => {
            const field = detail.path[0];
            if (!errors[field]) errors[field] = [];
            errors[field].push(detail.message);
        });
        throw { name: 'ValidationError', errors };
    }
    
    if (value.username && !await checkUniqueness('username', value.username, id)) {
        throw { name: 'ValidationError', errors: { username: ['username must be unique'] } };
    }
    
    if (value.email && !await checkUniqueness('email', value.email, id)) {
        throw { name: 'ValidationError', errors: { email: ['email must be unique'] } };
    }
    
    if (value.mobile && !await checkUniqueness('mobile', value.mobile, id)) {
        throw { name: 'ValidationError', errors: { mobile: ['mobile must be unique'] } };
    }
    
    if (value.password && value.password === currentPassword) {
        throw { name: 'ValidationError', errors: { password: ['password must be different from current password'] } };
    }
    
    return value;
};

module.exports = { validateCreate, validateUpdate };
