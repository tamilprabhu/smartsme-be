const { ProductionShift } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const productionShiftService = {
    // Get all production shifts with pagination and search
    getAllProductionShifts: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '', companyId = null) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`ProductionShiftService: Fetching shifts - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = {};
            
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            if (search) {
                whereClause[Op.or] = [
                    { orderId: { [Op.like]: `%${search}%` } },
                    { shiftId: { [Op.like]: `%${search}%` } },
                    { prodName: { [Op.like]: `%${search}%` } },
                    { machineId: { [Op.like]: `%${search}%` } },
                    { shiftType: { [Op.like]: `%${search}%` } }
                ];
            }
            
            const { count, rows } = await ProductionShift.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['createDate', 'DESC']]
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
            const whereClause = { shiftIdSeq: id };
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
            logger.info(`ProductionShiftService: Successfully created shift: ${shift.shiftId} (ID: ${shift.shiftIdSeq})`);
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
            const whereClause = { shiftIdSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const [updatedRows] = await ProductionShift.update({
                ...shiftData,
                updatedBy: userId,
                updateDate: new Date()
            }, {
                where: whereClause
            });
            if (updatedRows === 0) {
                logger.warn(`ProductionShiftService: No shift found to update with ID: ${id}, companyId: ${companyId}`);
                throw new Error("Shift not found");
            }
            const updatedShift = await ProductionShift.findOne({ where: whereClause });
            logger.info(`ProductionShiftService: Successfully updated shift: ${updatedShift.shiftId} (ID: ${id})`);
            return updatedShift;
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
            const whereClause = { shiftIdSeq: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const shift = await ProductionShift.findOne({ where: whereClause });
            const deletedRows = await ProductionShift.destroy({ where: whereClause });
            if (deletedRows === 0) {
                logger.warn(`ProductionShiftService: No shift found to delete with ID: ${id}, companyId: ${companyId}`);
                throw new Error("Shift not found");
            }
            logger.info(`ProductionShiftService: Successfully deleted shift: ${shift?.shiftId || 'Unknown'} (ID: ${id})`);
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
