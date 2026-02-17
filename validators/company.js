const Joi = require('joi');
const { Company } = require('../models');
const { Op } = require('sequelize');

const companySchema = Joi.object({
    companyId: Joi.string()
        .trim()
        .pattern(/^[A-Z]{4}\d{4}$/)
        .required()
        .messages({
            'string.empty': 'companyId cannot be blank',
            'string.pattern.base': 'companyId must have first 4 uppercase letters and last 4 digits',
            'any.required': 'companyId is required'
        }),
    
    companyName: Joi.string()
        .trim()
        .min(5)
        .max(50)
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .required()
        .messages({
            'string.empty': 'companyName cannot be blank',
            'string.min': 'companyName must be at least 5 characters',
            'string.max': 'companyName must not exceed 20 characters',
            'string.pattern.base': 'companyName must be alphanumeric only, no special characters except spaces',
            'any.required': 'companyName is required'
        }),
    
    companyType: Joi.string()
        .valid('LARGE', 'MEDIUM', 'SMALL')
        .required()
        .messages({
            'any.only': 'companyType must be one of LARGE, MEDIUM, or SMALL',
            'any.required': 'companyType is required'
        }),
    
    address: Joi.string()
        .trim()
        .min(10)
        .max(50)
        .required()
        .messages({
            'string.empty': 'address cannot be blank',
            'string.min': 'address must be at least 10 characters',
            'string.max': 'address must not exceed 50 characters',
            'any.required': 'address is required'
        }),
    
    pincode: Joi.string()
        .trim()
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            'string.empty': 'pincode cannot be blank',
            'string.pattern.base': 'pincode must be exactly 6 digits',
            'any.required': 'pincode is required'
        }),
    
    propName: Joi.string()
        .trim()
        .min(8)
        .max(20)
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .required()
        .messages({
            'string.empty': 'propName cannot be blank',
            'string.min': 'propName must be at least 8 characters',
            'string.max': 'propName must not exceed 20 characters',
            'string.pattern.base': 'propName must be alphanumeric only, no special characters except spaces',
            'any.required': 'propName is required'
        }),
    
    directPhone: Joi.string()
        .trim()
        .pattern(/^\d{2,5}-?\d{6,8}$/)
        .required()
        .messages({
            'string.empty': 'directPhone cannot be blank',
            'string.pattern.base': 'directPhone must be a valid landline number',
            'any.required': 'directPhone is required'
        }),
    
    officePhone: Joi.string()
        .trim()
        .pattern(/^\d{2,5}-?\d{6,8}$/)
        .required()
        .messages({
            'string.empty': 'officePhone cannot be blank',
            'string.pattern.base': 'officePhone must be a valid landline number',
            'any.required': 'officePhone is required'
        }),
    
    mgmtPhone: Joi.string()
        .trim()
        .pattern(/^\d{2,5}-?\d{6,8}$/)
        .required()
        .messages({
            'string.empty': 'mgmtPhone cannot be blank',
            'string.pattern.base': 'mgmtPhone must be a valid landline number',
            'any.required': 'mgmtPhone is required'
        }),
    
    mailId: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'mailId cannot be blank',
            'string.email': 'mailId must be a valid email address',
            'any.required': 'mailId is required'
        }),
    
    natureOfBusiness: Joi.string()
        .trim()
        .min(8)
        .max(20)
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .required()
        .messages({
            'string.empty': 'natureOfBusiness cannot be blank',
            'string.min': 'natureOfBusiness must be at least 8 characters',
            'string.max': 'natureOfBusiness must not exceed 20 characters',
            'string.pattern.base': 'natureOfBusiness must be alphanumeric only, no special characters except spaces',
            'any.required': 'natureOfBusiness is required'
        }),
    
    authPerson: Joi.string()
        .trim()
        .min(8)
        .max(20)
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .required()
        .messages({
            'string.empty': 'authPerson cannot be blank',
            'string.min': 'authPerson must be at least 8 characters',
            'string.max': 'authPerson must not exceed 20 characters',
            'string.pattern.base': 'authPerson must be alphanumeric only, no special characters except spaces',
            'any.required': 'authPerson is required'
        }),
    
    mobileNo: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            'string.empty': 'mobileNo cannot be blank',
            'string.pattern.base': 'mobileNo must be a valid 10-digit Indian mobile number',
            'any.required': 'mobileNo is required'
        }),
    
    businessCons: Joi.string().optional()
});

const updateCompanySchema = Joi.object({
    directPhone: companySchema.extract('directPhone').optional(),
    officePhone: companySchema.extract('officePhone').optional(),
    mgmtPhone: companySchema.extract('mgmtPhone').optional(),
    mailId: companySchema.extract('mailId').optional(),
    authPerson: companySchema.extract('authPerson').optional(),
    mobileNo: companySchema.extract('mobileNo').optional()
});

const checkUniqueness = async (field, value, excludeId = null) => {
    const where = { [field]: value };
    
    if (excludeId) {
        where.companySequence = { [Op.ne]: excludeId };
    }
    
    const existing = await Company.findOne({ where });
    return !existing;
};

const validateCreate = async (companyData) => {
    const { error, value } = companySchema.validate(companyData, { abortEarly: false });
    
    if (error) {
        const errors = {};
        error.details.forEach(detail => {
            const field = detail.path[0];
            if (!errors[field]) errors[field] = [];
            errors[field].push(detail.message);
        });
        throw { name: 'ValidationError', errors };
    }
    
    if (!await checkUniqueness('companyId', value.companyId)) {
        throw { name: 'ValidationError', errors: { companyId: ['companyId must be unique'] } };
    }
    
    if (!await checkUniqueness('companyName', value.companyName)) {
        throw { name: 'ValidationError', errors: { companyName: ['companyName must be unique'] } };
    }
    
    return value;
};

const validateUpdate = async (id, companyData) => {
    const { error, value } = updateCompanySchema.validate(companyData, { abortEarly: false });
    
    if (error) {
        const errors = {};
        error.details.forEach(detail => {
            const field = detail.path[0];
            if (!errors[field]) errors[field] = [];
            errors[field].push(detail.message);
        });
        throw { name: 'ValidationError', errors };
    }
    
    return value;
};

module.exports = { validateCreate, validateUpdate };
