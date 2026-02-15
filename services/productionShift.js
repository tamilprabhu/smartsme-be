const { ProductionShift, Product, Machine, Order } = require("../models");
const { Op, col, where, fn } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");

const buildProductionShiftOrder = (sortBy, sortOrder) => {
    const direction = sortOrder === SortOrder.DESC ? 'DESC' : 'ASC';
    switch (sortBy) {
        case SortBy.CREATE_DATE:
            return [[col('create_date'), direction]];
        case SortBy.UPDATE_DATE:
            return [[col('update_date'), direction]];
        case SortBy.CREATED_BY:
            return [[col('created_by'), direction]];
        case SortBy.UPDATED_BY:
            return [[col('updated_by'), direction]];
        case SortBy.SEQUENCE:
        default:
            return [[col('shift_seq'), direction]];
    }
};

const productionShiftService = {
    // Get all production shifts with pagination and search
    getAllProductionShifts: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId = null,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProductionShiftService: Fetching shifts - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = {};
            const trimmedSearch = (search || '').trim();
            
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const include = [
                {
                    model: Product,
                    attributes: [],
                    required: false
                },
                {
                    model: Machine,
                    attributes: [],
                    required: false
                },
                {
                    model: Order,
                    attributes: [],
                    required: false
                }
            ];

            if (trimmedSearch) {
                const likeValue = `%${trimmedSearch.toLowerCase()}%`;
                whereClause[Op.or] = [
                    where(fn('LOWER', col("ProductionShift.order_id")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("ProductionShift.shift_id")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("ProductionShift.product_id")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("ProductionShift.machine_id")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("ProductionShift.shift_type")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("Product.product_name")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("Machine.machine_name")), { [Op.like]: likeValue }),
                    where(fn('LOWER', col("Order.order_name")), { [Op.like]: likeValue })
                ];
            }
            
            const { count, rows } = await ProductionShift.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildProductionShiftOrder(sortBy, sortOrder),
                include
            });
            logger.info(`ProductionShiftService: Successfully retrieved ${rows.length} shifts out of ${count} total`);
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
            logger.error("ProductionShiftService: Failed to fetch shifts", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    getProductionShiftById: async (id, companyId) => {
        logger.info(`ProductionShiftService: Fetching shift with ID: ${id}, companyId: ${companyId}`);
        try {
            const whereClause = { shiftSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const shift = await ProductionShift.findOne({ where: whereClause });
            if (shift) {
                logger.info(`ProductionShiftService: Successfully retrieved shift: ${shift.shiftId} (ID: ${id})`);
            } else {
                logger.warn(`ProductionShiftService: Shift not found with ID: ${id}, companyId: ${companyId}`);
            }
            return shift;
        } catch (error) {
            logger.error(`ProductionShiftService: Failed to fetch shift with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    createProductionShift: async (shiftData, companyId, userId) => {
        logger.info(`ProductionShiftService: Creating new shift: ${shiftData.shiftId}, companyId: ${companyId}, userId: ${userId}`);
        try {
            const shift = await ProductionShift.create({
                ...shiftData,
                companyId: companyId,
                createdBy: userId,
                updatedBy: userId,
                createDate: new Date(),
                updateDate: new Date()
            });
            logger.info(`ProductionShiftService: Successfully created shift: ${shift.shiftId} (ID: ${shift.shiftSequence})`);
            return shift;
        } catch (error) {
            logger.error(`ProductionShiftService: Failed to create shift: ${shiftData.shiftId}`, { 
                error: error.message, 
                shiftData: shiftData,
                stack: error.stack 
            });
            throw error;
        }
    },

    updateProductionShift: async (id, shiftData, companyId, userId) => {
        logger.info(`ProductionShiftService: Updating shift with ID: ${id}, companyId: ${companyId}, userId: ${userId}`, { updateData: shiftData });
        try {
            const whereClause = { shiftSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const shift = await ProductionShift.findOne({ where: whereClause });
            if (!shift) {
                logger.warn(`ProductionShiftService: No shift found to update with ID: ${id}, companyId: ${companyId}`);
                throw new Error("Shift not found");
            }

            shift.set({
                ...shiftData,
                updatedBy: userId,
                updateDate: new Date()
            });

            await shift.save();
            logger.info(`ProductionShiftService: Successfully updated shift: ${shift.shiftId} (ID: ${id})`);
            return shift;
        } catch (error) {
            logger.error(`ProductionShiftService: Failed to update shift with ID: ${id}`, { 
                error: error.message, 
                updateData: shiftData,
                stack: error.stack 
            });
            throw error;
        }
    },

    deleteProductionShift: async (id, companyId) => {
        logger.info(`ProductionShiftService: Deleting shift with ID: ${id}, companyId: ${companyId}`);
        try {
            const whereClause = { shiftSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const shift = await ProductionShift.findOne({ where: whereClause });
            const [updatedRows] = await ProductionShift.update(
                { isDeleted: true, isActive: false },
                { where: { ...whereClause, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`ProductionShiftService: No shift found to delete with ID: ${id}, companyId: ${companyId}`);
                throw new Error("Shift not found");
            }
            logger.info(`ProductionShiftService: Successfully soft deleted shift: ${shift?.shiftId || 'Unknown'} (ID: ${id})`);
            return { message: "Production shift deleted successfully" };
        } catch (error) {
            logger.error(`ProductionShiftService: Failed to delete shift with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = productionShiftService;
