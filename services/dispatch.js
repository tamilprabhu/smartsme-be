const { Dispatch } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const dispatchService = {
    getAllDispatches: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`DispatchService: Fetching dispatches - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
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
                            { dispatchId: { [Op.like]: `%${search}%` } },
                            { orderId: { [Op.like]: `%${search}%` } },
                            { prodId: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Dispatch.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['dispatchIdSeq', 'DESC']]
            });
            logger.info(`DispatchService: Successfully retrieved ${rows.length} dispatches out of ${count} total for company: ${companyId}`);
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
            logger.error("DispatchService: Failed to fetch dispatches", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getDispatchById: async (id, companyId = null) => {
        logger.info(`DispatchService: Fetching dispatch with ID: ${id}, companyId: ${companyId}`);
        try {
            let whereClause = { dispatchIdSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const dispatch = await Dispatch.findOne({ where: whereClause });
            if (dispatch) {
                logger.info(`DispatchService: Successfully retrieved dispatch: ${dispatch.dispatchId} (ID: ${id}) for company: ${companyId}`);
            } else {
                logger.warn(`DispatchService: Dispatch not found with ID: ${id} for company: ${companyId}`);
            }
            return dispatch;
        } catch (error) {
            logger.error(`DispatchService: Failed to fetch dispatch with ID: ${id}`, { 
                error: error.message, 
                companyId: companyId,
                stack: error.stack 
            });
            throw error;
        }
    },

    createDispatch: async (dispatchData, companyId = null, userId = null) => {
        logger.info(`DispatchService: Creating new dispatch: ${dispatchData.dispatchId}`, { 
            orderId: dispatchData.orderId,
            quantity: dispatchData.quantity,
            companyId: companyId,
            userId: userId
        });
        try {
            const enrichedData = { ...dispatchData };
            if (companyId) {
                enrichedData.companyId = companyId;
            }
            if (userId) {
                enrichedData.createdBy = userId;
                enrichedData.updatedBy = userId;
            }
            
            const dispatch = await Dispatch.create(enrichedData);
            logger.info(`DispatchService: Successfully created dispatch: ${dispatch.dispatchId} (ID: ${dispatch.dispatchIdSeq}) for company: ${companyId}`);
            return dispatch;
        } catch (error) {
            logger.error(`DispatchService: Failed to create dispatch: ${dispatchData.dispatchId}`, { 
                error: error.message, 
                dispatchData: dispatchData,
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateDispatch: async (id, dispatchData, companyId = null, userId = null) => {
        logger.info(`DispatchService: Updating dispatch with ID: ${id}`, { 
            updateData: dispatchData,
            companyId: companyId,
            userId: userId
        });
        try {
            let whereClause = { dispatchIdSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const enrichedData = { ...dispatchData };
            if (userId) {
                enrichedData.updatedBy = userId;
            }
            
            const [updatedRows] = await Dispatch.update(enrichedData, {
                where: whereClause
            });
            if (updatedRows === 0) {
                logger.warn(`DispatchService: No dispatch found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Dispatch not found");
            }
            const updatedDispatch = await Dispatch.findOne({ where: whereClause });
            logger.info(`DispatchService: Successfully updated dispatch: ${updatedDispatch.dispatchId} (ID: ${id}) for company: ${companyId}`);
            return updatedDispatch;
        } catch (error) {
            logger.error(`DispatchService: Failed to update dispatch with ID: ${id}`, { 
                error: error.message, 
                updateData: dispatchData,
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteDispatch: async (id, companyId = null, userId = null) => {
        logger.info(`DispatchService: Deleting dispatch with ID: ${id}`, {
            companyId: companyId,
            userId: userId
        });
        try {
            let whereClause = { dispatchIdSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const dispatch = await Dispatch.findOne({ where: whereClause });
            const deletedRows = await Dispatch.destroy({
                where: whereClause
            });
            if (deletedRows === 0) {
                logger.warn(`DispatchService: No dispatch found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Dispatch not found");
            }
            logger.info(`DispatchService: Successfully deleted dispatch: ${dispatch?.dispatchId || 'Unknown'} (ID: ${id}) for company: ${companyId} by user: ${userId}`);
            return { message: "Dispatch deleted successfully" };
        } catch (error) {
            logger.error(`DispatchService: Failed to delete dispatch with ID: ${id}`, { 
                error: error.message,
                companyId: companyId,
                userId: userId,
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = dispatchService;
