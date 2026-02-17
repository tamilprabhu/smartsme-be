const { Company } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { validateCreate, validateUpdate } = require("../validators/company");

const companyService = {
    getAllCompanies: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`CompanyService: Fetching companies - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { companyId: { [Op.like]: `%${search}%` } },
                    { companyName: { [Op.like]: `%${search}%` } },
                    { propName: { [Op.like]: `%${search}%` } },
                    { mailId: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Company.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'company_seq', 'Company')
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

    createCompany: async (companyData, context) => {
        logger.info("CompanyService: Creating new company", { 
            companyName: companyData.companyName,
            actorId: context.actor?.userId 
        });
        try {
            const validatedData = await validateCreate(companyData);
            const company = await Company.create(validatedData, { context });
            logger.info(`CompanyService: Successfully created company: ${company.companyName} (ID: ${company.companySequence})`);
            return company;
        } catch (error) {
            logger.error("CompanyService: Failed to create company", { 
                companyName: companyData.companyName,
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    updateCompany: async (id, companyData, context) => {
        logger.info(`CompanyService: Updating company with ID: ${id}`, { 
            updates: Object.keys(companyData),
            actorId: context.actor?.userId 
        });
        try {
            const currentCompany = await Company.findByPk(id);
            if (!currentCompany) {
                logger.warn(`CompanyService: No company found to update with ID: ${id}`);
                return null;
            }
            
            const validatedData = await validateUpdate(id, companyData);
            
            const [updatedRowsCount] = await Company.update(validatedData, {
                where: { companySequence: id },
                context
            });
            
            if (updatedRowsCount === 0) {
                logger.warn(`CompanyService: No company found to update with ID: ${id}`);
                return null;
            }
            
            const updatedCompany = await Company.findByPk(id);
            logger.info(`CompanyService: Successfully updated company: ${updatedCompany.companyName} (ID: ${id})`);
            return updatedCompany;
        } catch (error) {
            logger.error(`CompanyService: Failed to update company with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteCompany: async (id, context) => {
        logger.info(`CompanyService: Deleting company with ID: ${id}`, { actorId: context.actor?.userId });
        try {
            const company = await Company.findByPk(id);
            if (!company) {
                logger.warn(`CompanyService: Company not found for deletion with ID: ${id}`);
                return false;
            }
            
            const [updatedRows] = await Company.update(
                { isDeleted: true, isActive: false },
                { where: { companySequence: id, isDeleted: false }, context }
            );
            if (updatedRows === 0) {
                logger.warn(`CompanyService: Company already deleted with ID: ${id}`);
                return false;
            }
            logger.info(`CompanyService: Successfully soft deleted company: ${company.companyName} (ID: ${id})`);
            return true;
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
