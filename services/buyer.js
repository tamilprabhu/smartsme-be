const { Buyer } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const buyerService = {
    // Get all buyers with pagination and search
    getAllBuyers: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`BuyerService: Fetching buyers - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { buyerName: { [Op.like]: `%${search}%` } },
                    { buyerId: { [Op.like]: `%${search}%` } },
                    { buyerEmail: { [Op.like]: `%${search}%` } },
                    { companyId: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Buyer.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['buyerIdSeq', 'ASC']]
            });
            logger.info(`BuyerService: Successfully retrieved ${rows.length} buyers out of ${count} total`);
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
            logger.error("BuyerService: Failed to fetch buyers", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getBuyerById: async (id) => {
        logger.info(`BuyerService: Fetching buyer with ID: ${id}`);
        try {
            const buyer = await Buyer.findByPk(id);
            if (buyer) {
                logger.info(`BuyerService: Successfully retrieved buyer: ${buyer.buyerName} (ID: ${id})`);
            } else {
                logger.warn(`BuyerService: Buyer not found with ID: ${id}`);
            }
            return buyer;
        } catch (error) {
            logger.error(`BuyerService: Failed to fetch buyer with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createBuyer: async (buyerData) => {
        logger.info(`BuyerService: Creating new buyer: ${buyerData.buyerName}`, { 
            companyId: buyerData.companyId,
            buyerId: buyerData.buyerId 
        });
        try {
            const buyer = await Buyer.create(buyerData);
            logger.info(`BuyerService: Successfully created buyer: ${buyer.buyerName} (ID: ${buyer.buyerIdSeq})`);
            return buyer;
        } catch (error) {
            logger.error(`BuyerService: Failed to create buyer: ${buyerData.buyerName}`, { 
                error: error.message, 
                buyerData: buyerData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateBuyer: async (id, buyerData) => {
        logger.info(`BuyerService: Updating buyer with ID: ${id}`, { updateData: buyerData });
        try {
            const [updatedRows] = await Buyer.update(buyerData, {
                where: { buyerIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`BuyerService: No buyer found to update with ID: ${id}`);
                throw new Error("Buyer not found");
            }
            const updatedBuyer = await Buyer.findByPk(id);
            logger.info(`BuyerService: Successfully updated buyer: ${updatedBuyer.buyerName} (ID: ${id})`);
            return updatedBuyer;
        } catch (error) {
            logger.error(`BuyerService: Failed to update buyer with ID: ${id}`, { 
                error: error.message, 
                updateData: buyerData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteBuyer: async (id) => {
        logger.info(`BuyerService: Deleting buyer with ID: ${id}`);
        try {
            const buyer = await Buyer.findByPk(id);
            const deletedRows = await Buyer.destroy({
                where: { buyerIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`BuyerService: No buyer found to delete with ID: ${id}`);
                throw new Error("Buyer not found");
            }
            logger.info(`BuyerService: Successfully deleted buyer: ${buyer?.buyerName || 'Unknown'} (ID: ${id})`);
            return { message: "Buyer deleted successfully" };
        } catch (error) {
            logger.error(`BuyerService: Failed to delete buyer with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = buyerService;
