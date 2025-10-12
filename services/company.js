const { Company } = require("../models");
const { Op } = require("sequelize");

const companyService = {
    // Create company
    create: async (companyData) => {
        const now = new Date();
        return await Company.create({
            ...companyData,
            createDate: now,
            updateDate: now
        });
    },

    // Get all companies with pagination
    getAll: async (page = 1, limit = 10, search = '') => {
        const offset = (page - 1) * limit;
        const whereClause = search ? {
            [Op.or]: [
                { companyName: { [Op.like]: `%${search}%` } },
                { companyId: { [Op.like]: `%${search}%` } },
                { propName: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await Company.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createDate', 'DESC']]
        });

        return {
            companies: rows,
            totalCount: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        };
    },

    // Get company by ID
    getById: async (id) => {
        return await Company.findByPk(id);
    },

    // Update company
    update: async (id, updateData) => {
        const [updatedRowsCount] = await Company.update({
            ...updateData,
            updateDate: new Date()
        }, {
            where: { companyIdSeq: id }
        });
        
        if (updatedRowsCount === 0) {
            throw new Error('Company not found');
        }
        
        return await Company.findByPk(id);
    },

    // Delete company
    delete: async (id) => {
        const deletedRowsCount = await Company.destroy({
            where: { companyIdSeq: id }
        });
        
        if (deletedRowsCount === 0) {
            throw new Error('Company not found');
        }
        
        return { message: 'Company deleted successfully' };
    }
};

module.exports = companyService;
