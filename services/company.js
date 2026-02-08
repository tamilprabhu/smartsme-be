const { Company } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const companyService = {
    // Get all companies with pagination and search
    getAllCompanies: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`CompanyService: Fetching companies - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { companyName: { [Op.like]: `%${search}%` } },
                    { companyId: { [Op.like]: `%${search}%` } },
                    { propName: { [Op.like]: `%${search}%` } },
                    { businessCons: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Company.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['companyIdSeq', 'ASC']]
            });
            logger.info(`CompanyService: Successfully retrieved ${rows.length} companies out of ${count} total`);
            return {
                items: rows,
                paging: {
                    currentPage: page,
                    totalPages: Math.ceil(count / validLimit),
                    itemsPerPage: validLimit,
                    totalItems: count
                }
            };
        } catch (error) {
            logger.error("CompanyService: Failed to fetch companies", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getCompanyById: async (id) => {
        logger.info(`CompanyService: Fetching company with ID: ${id}`);
        try {
            const company = await Company.findByPk(id);
            if (company) {
                logger.info(`CompanyService: Successfully retrieved company: ${company.companyName} (ID: ${id})`);
            } else {
                logger.warn(`CompanyService: Company not found with ID: ${id}`);
            }
            return company;
        } catch (error) {
            logger.error(`CompanyService: Failed to fetch company with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createCompany: async (companyData) => {
        logger.info(`CompanyService: Creating new company: ${companyData.companyName}`);
        try {
            const company = await Company.create({
                ...companyData,
                createDate: new Date(),
                updateDate: new Date()
            });
            logger.info(`CompanyService: Successfully created company: ${company.companyName} (ID: ${company.companyIdSeq})`);
            return company;
        } catch (error) {
            logger.error(`CompanyService: Failed to create company: ${companyData.companyName}`, { 
                error: error.message, 
                companyData: companyData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateCompany: async (id, companyData) => {
        logger.info(`CompanyService: Updating company with ID: ${id}`, { updateData: companyData });
        try {
            const [updatedRows] = await Company.update({
                ...companyData,
                updateDate: new Date()
            }, {
                where: { companyIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`CompanyService: No company found to update with ID: ${id}`);
                throw new Error("Company not found");
            }
            const updatedCompany = await Company.findByPk(id);
            logger.info(`CompanyService: Successfully updated company: ${updatedCompany.companyName} (ID: ${id})`);
            return updatedCompany;
        } catch (error) {
            logger.error(`CompanyService: Failed to update company with ID: ${id}`, { 
                error: error.message, 
                updateData: companyData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteCompany: async (id) => {
        logger.info(`CompanyService: Deleting company with ID: ${id}`);
        try {
            const company = await Company.findByPk(id);
            const [updatedRows] = await Company.update(
                { isDeleted: true, isActive: false },
                { where: { companyIdSeq: id, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`CompanyService: No company found to delete with ID: ${id}`);
                throw new Error("Company not found");
            }
            logger.info(`CompanyService: Successfully soft deleted company: ${company?.companyName || 'Unknown'} (ID: ${id})`);
            return { message: "Company deleted successfully" };
        } catch (error) {
            logger.error(`CompanyService: Failed to delete company with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = companyService;
