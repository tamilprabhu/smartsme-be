const { Dispatch } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { generateDispatchId } = require("../utils/idGenerator");
const { validateCreate, validateUpdate } = require("../validators/dispatch");

const MAX_RETRY_ATTEMPTS = 5;

const dispatchService = {
    getAllDispatches: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId = null,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
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
                            { productId: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Dispatch.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'dispatch_seq', 'Dispatch')
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
            let whereClause = { dispatchSequence: id };
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
            const validatedData = await validateCreate(dispatchData);
            const baseData = { ...validatedData };
            if (companyId) {
                baseData.companyId = companyId;
            }
            if (userId) {
                baseData.createdBy = userId;
                baseData.updatedBy = userId;
            }

            let dispatch;
            let attempts = 0;
            while (attempts < MAX_RETRY_ATTEMPTS) {
                try {
                    dispatch = await Dispatch.create({
                        ...baseData,
                        dispatchId: generateDispatchId()
                    });
                    break;
                } catch (error) {
                    const isUniqueError = error.name === "SequelizeUniqueConstraintError" &&
                        error.errors?.some((e) => e.path === "dispatch_id" || e.path === "dispatchId");

                    if (isUniqueError) {
                        attempts++;
                        if (attempts >= MAX_RETRY_ATTEMPTS) {
                            throw new Error("Failed to generate unique dispatch_id after maximum retries");
                        }
                        logger.warn(`DispatchService: Duplicate dispatch_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                    } else {
                        throw error;
                    }
                }
            }
            logger.info(`DispatchService: Successfully created dispatch: ${dispatch.dispatchId} (ID: ${dispatch.dispatchSequence}) for company: ${companyId}`);
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
            const validatedData = await validateUpdate(dispatchData);
            const { dispatchId, ...safeDispatchData } = validatedData;
            let whereClause = { dispatchSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const enrichedData = { ...safeDispatchData };
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
            let whereClause = { dispatchSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const dispatch = await Dispatch.findOne({ where: whereClause });
            const [updatedRows] = await Dispatch.update(
                { isDeleted: true, isActive: false },
                { where: { ...whereClause, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`DispatchService: No dispatch found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Dispatch not found");
            }
            logger.info(`DispatchService: Successfully soft deleted dispatch: ${dispatch?.dispatchId || 'Unknown'} (ID: ${id}) for company: ${companyId} by user: ${userId}`);
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
