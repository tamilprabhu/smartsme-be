const { Buyer } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const buyerService = {
    // Get all buyers with pagination and search
    getAllBuyers: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`BuyerService: Fetching buyers - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
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
                    ...(companyId ? [{ companyId }] : []),
                    {
                        [Op.or]: [
                            { buyerName: { [Op.like]: `%${search}%` } },
                            { buyerId: { [Op.like]: `%${search}%` } },
                            { buyerEmail: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Buyer.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['buyerIdSeq', 'ASC']]
            });
            logger.info(`BuyerService: Successfully retrieved ${rows.length} buyers out of ${count} total for company: ${companyId}`);
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

    getBuyerById: async (id, companyId) => {
        logger.info(`BuyerService: Fetching buyer with ID: ${id} for company: ${companyId}`);
        try {
            const buyer = await Buyer.findOne({
                where: { 
                    buyerIdSeq: id,
                    companyId: companyId
                }
            });
            if (buyer) {
                logger.info(`BuyerService: Successfully retrieved buyer: ${buyer.buyerName} (ID: ${id})`);
            } else {
                logger.warn(`BuyerService: Buyer not found with ID: ${id} for company: ${companyId}`);
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

    createBuyer: async (buyerData, companyId, userId) => {
        logger.info(`BuyerService: Creating new buyer: ${buyerData.buyerName}`, { 
            companyId: companyId,
            buyerId: buyerData.buyerId 
        });
        try {
            const buyerWithCompanyAndUser = {
                ...buyerData,
                companyId: companyId,
                createdBy: userId,
                updatedBy: userId
            };
            const buyer = await Buyer.create(buyerWithCompanyAndUser);
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

    updateBuyer: async (id, buyerData, companyId, userId) => {
        logger.info(`BuyerService: Updating buyer with ID: ${id} for company: ${companyId}`, { updateData: buyerData });
        try {
            const buyerWithUpdatedBy = {
                ...buyerData,
                updatedBy: userId
            };
            const [updatedRows] = await Buyer.update(buyerWithUpdatedBy, {
                where: { 
                    buyerIdSeq: id,
                    companyId: companyId
                }
            });
            if (updatedRows === 0) {
                logger.warn(`BuyerService: No buyer found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Buyer not found");
            }
            const updatedBuyer = await Buyer.findOne({
                where: { 
                    buyerIdSeq: id,
                    companyId: companyId
                }
            });
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

    deleteBuyer: async (id, companyId) => {
        logger.info(`BuyerService: Deleting buyer with ID: ${id} for company: ${companyId}`);
        try {
            const buyer = await Buyer.findOne({
                where: { 
                    buyerIdSeq: id,
                    companyId: companyId
                }
            });
            const [updatedRows] = await Buyer.update(
                { isDeleted: true, isActive: false },
                {
                    where: {
                        buyerIdSeq: id,
                        companyId: companyId,
                        isDeleted: false
                    }
                }
            );
            if (updatedRows === 0) {
                logger.warn(`BuyerService: No buyer found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Buyer not found");
            }
            logger.info(`BuyerService: Successfully soft deleted buyer: ${buyer?.buyerName || 'Unknown'} (ID: ${id})`);
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
