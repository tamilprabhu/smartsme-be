const { Invoice } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const invoiceService = {
    // Get all invoices with pagination and search
    getAllInvoices: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`InvoiceService: Fetching invoices - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            let whereClause = {};
            
            // Add company filter if provided
            if (companyId) {
                whereClause.compId = companyId;
            }
            
            // Add search filter if provided
            if (search) {
                whereClause[Op.and] = [
                    ...(companyId ? [{ compId: companyId }] : []),
                    {
                        [Op.or]: [
                            { invoiceId: { [Op.like]: `%${search}%` } },
                            { buyrId: { [Op.like]: `%${search}%` } },
                            { prodId: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Invoice.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['invoiceSeq', 'ASC']]
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

    getInvoiceById: async (id) => {
        logger.info(`InvoiceService: Fetching invoice with ID: ${id}`);
        try {
            const invoice = await Invoice.findByPk(id);
            if (invoice) {
                logger.info(`InvoiceService: Successfully retrieved invoice: ${invoice.invoiceId} (ID: ${id})`);
            } else {
                logger.warn(`InvoiceService: Invoice not found with ID: ${id}`);
            }
            return invoice;
        } catch (error) {
            logger.error(`InvoiceService: Failed to fetch invoice with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createInvoice: async (invoiceData) => {
        logger.info(`InvoiceService: Creating new invoice: ${invoiceData.invoiceId}`, { 
            compId: invoiceData.compId,
            buyrId: invoiceData.buyrId 
        });
        try {
            const invoice = await Invoice.create(invoiceData);
            logger.info(`InvoiceService: Successfully created invoice: ${invoice.invoiceId} (ID: ${invoice.invoiceSeq})`);
            return invoice;
        } catch (error) {
            logger.error(`InvoiceService: Failed to create invoice: ${invoiceData.invoiceId}`, { 
                error: error.message, 
                invoiceData: invoiceData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateInvoice: async (id, invoiceData) => {
        logger.info(`InvoiceService: Updating invoice with ID: ${id}`, { updateData: invoiceData });
        try {
            const [updatedRows] = await Invoice.update(invoiceData, {
                where: { invoiceSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`InvoiceService: No invoice found to update with ID: ${id}`);
                throw new Error("Invoice not found");
            }
            const updatedInvoice = await Invoice.findByPk(id);
            logger.info(`InvoiceService: Successfully updated invoice: ${updatedInvoice.invoiceId} (ID: ${id})`);
            return updatedInvoice;
        } catch (error) {
            logger.error(`InvoiceService: Failed to update invoice with ID: ${id}`, { 
                error: error.message, 
                updateData: invoiceData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteInvoice: async (id) => {
        logger.info(`InvoiceService: Deleting invoice with ID: ${id}`);
        try {
            const invoice = await Invoice.findByPk(id);
            const deletedRows = await Invoice.destroy({
                where: { invoiceSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`InvoiceService: No invoice found to delete with ID: ${id}`);
                throw new Error("Invoice not found");
            }
            logger.info(`InvoiceService: Successfully deleted invoice: ${invoice?.invoiceId || 'Unknown'} (ID: ${id})`);
            return { message: "Invoice deleted successfully" };
        } catch (error) {
            logger.error(`InvoiceService: Failed to delete invoice with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = invoiceService;
