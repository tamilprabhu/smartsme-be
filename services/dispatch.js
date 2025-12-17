const { Dispatch } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const dispatchService = {
    getAllDispatches: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`DispatchService: Fetching dispatches - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { dispatchId: { [Op.like]: `%${search}%` } },
                    { orderId: { [Op.like]: `%${search}%` } },
                    { prodId: { [Op.like]: `%${search}%` } },
                    { companyId: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Dispatch.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['dispatchIdSeq', 'DESC']]
            });
            logger.info(`DispatchService: Successfully retrieved ${rows.length} dispatches out of ${count} total`);
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

    getDispatchById: async (id) => {
        logger.info(`DispatchService: Fetching dispatch with ID: ${id}`);
        try {
            const dispatch = await Dispatch.findByPk(id);
            if (dispatch) {
                logger.info(`DispatchService: Successfully retrieved dispatch: ${dispatch.dispatchId} (ID: ${id})`);
            } else {
                logger.warn(`DispatchService: Dispatch not found with ID: ${id}`);
            }
            return dispatch;
        } catch (error) {
            logger.error(`DispatchService: Failed to fetch dispatch with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createDispatch: async (dispatchData) => {
        logger.info(`DispatchService: Creating new dispatch: ${dispatchData.dispatchId}`, { 
            orderId: dispatchData.orderId,
            quantity: dispatchData.quantity 
        });
        try {
            const dispatch = await Dispatch.create(dispatchData);
            logger.info(`DispatchService: Successfully created dispatch: ${dispatch.dispatchId} (ID: ${dispatch.dispatchIdSeq})`);
            return dispatch;
        } catch (error) {
            logger.error(`DispatchService: Failed to create dispatch: ${dispatchData.dispatchId}`, { 
                error: error.message, 
                dispatchData: dispatchData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateDispatch: async (id, dispatchData) => {
        logger.info(`DispatchService: Updating dispatch with ID: ${id}`, { updateData: dispatchData });
        try {
            const [updatedRows] = await Dispatch.update(dispatchData, {
                where: { dispatchIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`DispatchService: No dispatch found to update with ID: ${id}`);
                throw new Error("Dispatch not found");
            }
            const updatedDispatch = await Dispatch.findByPk(id);
            logger.info(`DispatchService: Successfully updated dispatch: ${updatedDispatch.dispatchId} (ID: ${id})`);
            return updatedDispatch;
        } catch (error) {
            logger.error(`DispatchService: Failed to update dispatch with ID: ${id}`, { 
                error: error.message, 
                updateData: dispatchData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteDispatch: async (id) => {
        logger.info(`DispatchService: Deleting dispatch with ID: ${id}`);
        try {
            const dispatch = await Dispatch.findByPk(id);
            const deletedRows = await Dispatch.destroy({
                where: { dispatchIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`DispatchService: No dispatch found to delete with ID: ${id}`);
                throw new Error("Dispatch not found");
            }
            logger.info(`DispatchService: Successfully deleted dispatch: ${dispatch?.dispatchId || 'Unknown'} (ID: ${id})`);
            return { message: "Dispatch deleted successfully" };
        } catch (error) {
            logger.error(`DispatchService: Failed to delete dispatch with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = dispatchService;
