const { Invoice } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { generateInvoiceId } = require("../utils/idGenerator");
const { validateCreate, validateUpdate } = require("../validators/invoice");

const MAX_RETRY_ATTEMPTS = 5;

const invoiceService = {
    // Get all invoices with pagination and search
    getAllInvoices: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId = null,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`InvoiceService: Fetching invoices - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            let whereClause = {};
            
            // Add company filter if provided
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            // Add search filter if provided
            if (search) {
                whereClause[Op.and] = [
                    ...(companyId ? [{ companyId: companyId }] : []),
                    {
                        [Op.or]: [
                            { invoiceId: { [Op.like]: `%${search}%` } },
                            { buyerId: { [Op.like]: `%${search}%` } },
                            { productId: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Invoice.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'invoice_seq', 'Invoice')
            });
            logger.info(`InvoiceService: Successfully retrieved ${rows.length} invoices out of ${count} total for company: ${companyId}`);
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
            logger.error("InvoiceService: Failed to fetch invoices", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getInvoiceById: async (id, companyId = null) => {
        logger.info(`InvoiceService: Fetching invoice with ID: ${id}, companyId: ${companyId}`);
        try {
            let whereClause = { invoiceSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const invoice = await Invoice.findOne({ where: whereClause });
            if (invoice) {
                logger.info(`InvoiceService: Successfully retrieved invoice: ${invoice.invoiceId} (ID: ${id}) for company: ${companyId}`);
            } else {
                logger.warn(`InvoiceService: Invoice not found with ID: ${id} for company: ${companyId}`);
            }
            return invoice;
        } catch (error) {
            logger.error(`InvoiceService: Failed to fetch invoice with ID: ${id}`, { 
                error: error.message, 
                companyId: companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    createInvoice: async (invoiceData, companyId = null, userId = null) => {
        logger.info(`InvoiceService: Creating new invoice: ${invoiceData.invoiceId}`, { 
            companyId: invoiceData.companyId,
            buyerId: invoiceData.buyerId,
            providedCompanyId: companyId,
            userId: userId
        });
        try {
            const validatedData = await validateCreate(invoiceData);
            const baseData = { ...validatedData };
            // Automatically populate companyId if not provided or override with authenticated user's company
            if (companyId) {
                baseData.companyId = companyId;
            }

            let invoice;
            let attempts = 0;
            while (attempts < MAX_RETRY_ATTEMPTS) {
                try {
                    invoice = await Invoice.create({
                        ...baseData,
                        invoiceId: generateInvoiceId()
                    });
                    break;
                } catch (error) {
                    const isUniqueError = error.name === "SequelizeUniqueConstraintError" &&
                        error.errors?.some((e) => e.path === "invoice_id" || e.path === "invoiceId");

                    if (isUniqueError) {
                        attempts++;
                        if (attempts >= MAX_RETRY_ATTEMPTS) {
                            throw new Error("Failed to generate unique invoice_id after maximum retries");
                        }
                        logger.warn(`InvoiceService: Duplicate invoice_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                    } else {
                        throw error;
                    }
                }
            }
            logger.info(`InvoiceService: Successfully created invoice: ${invoice.invoiceId} (ID: ${invoice.invoiceSeq}) for company: ${companyId}`);
            return invoice;
        } catch (error) {
            logger.error(`InvoiceService: Failed to create invoice: ${invoiceData.invoiceId}`, { 
                error: error.message, 
                invoiceData: invoiceData,
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateInvoice: async (id, invoiceData, companyId = null, userId = null) => {
        logger.info(`InvoiceService: Updating invoice with ID: ${id}`, { 
            updateData: invoiceData, 
            companyId: companyId,
            userId: userId 
        });
        try {
            const validatedData = await validateUpdate(invoiceData);
            const { invoiceId, ...safeInvoiceData } = validatedData;
            let whereClause = { invoiceSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const [updatedRows] = await Invoice.update(safeInvoiceData, {
                where: whereClause
            });
            if (updatedRows === 0) {
                logger.warn(`InvoiceService: No invoice found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Invoice not found");
            }
            const updatedInvoice = await Invoice.findOne({ where: whereClause });
            logger.info(`InvoiceService: Successfully updated invoice: ${updatedInvoice.invoiceId} (ID: ${id}) for company: ${companyId}`);
            return updatedInvoice;
        } catch (error) {
            logger.error(`InvoiceService: Failed to update invoice with ID: ${id}`, { 
                error: error.message, 
                updateData: invoiceData,
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteInvoice: async (id, companyId = null, userId = null) => {
        logger.info(`InvoiceService: Deleting invoice with ID: ${id}`, { 
            companyId: companyId,
            userId: userId 
        });
        try {
            let whereClause = { invoiceSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const invoice = await Invoice.findOne({ where: whereClause });
            const [updatedRows] = await Invoice.update(
                { isDeleted: true, isActive: false },
                { where: { ...whereClause, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`InvoiceService: No invoice found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Invoice not found");
            }
            logger.info(`InvoiceService: Successfully soft deleted invoice: ${invoice?.invoiceId || 'Unknown'} (ID: ${id}) for company: ${companyId}`);
            return { message: "Invoice deleted successfully" };
        } catch (error) {
            logger.error(`InvoiceService: Failed to delete invoice with ID: ${id}`, { 
                error: error.message, 
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = invoiceService;
