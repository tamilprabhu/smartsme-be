const { Seller } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const sellerService = {
    getAllSellers: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`SellerService: Fetching sellers - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
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
                            { sellerName: { [Op.like]: `%${search}%` } },
                            { sellerId: { [Op.like]: `%${search}%` } },
                            { sellerEmail: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Seller.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['sellerIdSeq', 'ASC']]
            });
            logger.info(`SellerService: Successfully retrieved ${rows.length} sellers out of ${count} total for company: ${companyId}`);
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
            logger.error("SellerService: Failed to fetch sellers", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getSellerById: async (id) => {
        logger.info(`SellerService: Fetching seller with ID: ${id}`);
        try {
            const seller = await Seller.findByPk(id);
            if (seller) {
                logger.info(`SellerService: Successfully retrieved seller: ${seller.sellerName} (ID: ${id})`);
            } else {
                logger.warn(`SellerService: Seller not found with ID: ${id}`);
            }
            return seller;
        } catch (error) {
            logger.error(`SellerService: Failed to fetch seller with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createSeller: async (sellerData) => {
        logger.info(`SellerService: Creating new seller: ${sellerData.sellerName}`, { 
            companyId: sellerData.companyId,
            sellerId: sellerData.sellerId 
        });
        try {
            const seller = await Seller.create(sellerData);
            logger.info(`SellerService: Successfully created seller: ${seller.sellerName} (ID: ${seller.sellerIdSeq})`);
            return seller;
        } catch (error) {
            logger.error(`SellerService: Failed to create seller: ${sellerData.sellerName}`, { 
                error: error.message, 
                sellerData: sellerData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateSeller: async (id, sellerData) => {
        logger.info(`SellerService: Updating seller with ID: ${id}`, { updateData: sellerData });
        try {
            const [updatedRows] = await Seller.update(sellerData, {
                where: { sellerIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`SellerService: No seller found to update with ID: ${id}`);
                throw new Error("Seller not found");
            }
            const updatedSeller = await Seller.findByPk(id);
            logger.info(`SellerService: Successfully updated seller: ${updatedSeller.sellerName} (ID: ${id})`);
            return updatedSeller;
        } catch (error) {
            logger.error(`SellerService: Failed to update seller with ID: ${id}`, { 
                error: error.message, 
                updateData: sellerData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteSeller: async (id) => {
        logger.info(`SellerService: Deleting seller with ID: ${id}`);
        try {
            const seller = await Seller.findByPk(id);
            const deletedRows = await Seller.destroy({
                where: { sellerIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`SellerService: No seller found to delete with ID: ${id}`);
                throw new Error("Seller not found");
            }
            logger.info(`SellerService: Successfully deleted seller: ${seller?.sellerName || 'Unknown'} (ID: ${id})`);
            return { message: "Seller deleted successfully" };
        } catch (error) {
            logger.error(`SellerService: Failed to delete seller with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = sellerService;
