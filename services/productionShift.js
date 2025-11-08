const { ProductionShift } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");

const productionShiftService = {
    create: async (shiftData) => {
        logger.info(`ProductionShiftService: Creating new shift: ${shiftData.shiftId}`, { 
            orderId: shiftData.orderId,
            machineId: shiftData.machineId,
            prodName: shiftData.prodName,
            shiftType: shiftData.shiftType
        });
        try {
            const now = new Date();
            const shift = await ProductionShift.create({
                ...shiftData,
                createDate: now,
                updateDate: now
            });
            logger.info(`ProductionShiftService: Successfully created shift: ${shift.shiftId} (ID: ${shift.shiftIdSeq})`, {
                shiftId: shift.shiftIdSeq,
                orderId: shift.orderId,
                production: shift.production,
                netProduction: shift.netProduction
            });
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

    getAll: async (page = 1, limit = 10, search = '') => {
        logger.info(`ProductionShiftService: Fetching shifts - Page: ${page}, Limit: ${limit}, Search: '${search}'`);
        try {
            const offset = (page - 1) * limit;
            const whereClause = search ? {
                [Op.or]: [
                    { orderId: { [Op.like]: `%${search}%` } },
                    { shiftId: { [Op.like]: `%${search}%` } },
                    { prodName: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            const { count, rows } = await ProductionShift.findAndCountAll({
                where: whereClause,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createDate', 'DESC']]
            });

            const result = {
                shifts: rows,
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page)
            };

            logger.info(`ProductionShiftService: Successfully retrieved ${rows.length} shifts out of ${count} total`, {
                page: page,
                totalPages: result.totalPages,
                searchTerm: search
            });

            return result;
        } catch (error) {
            logger.error("ProductionShiftService: Failed to fetch shifts", { 
                error: error.message, 
                page: page,
                limit: limit,
                search: search,
                stack: error.stack 
            });
            throw error;
        }
    },

    getById: async (id) => {
        logger.info(`ProductionShiftService: Fetching shift with ID: ${id}`);
        try {
            const shift = await ProductionShift.findByPk(id);
            if (shift) {
                logger.info(`ProductionShiftService: Successfully retrieved shift: ${shift.shiftId} (ID: ${id})`, {
                    orderId: shift.orderId,
                    production: shift.production,
                    netProduction: shift.netProduction,
                    shiftType: shift.shiftType
                });
            } else {
                logger.warn(`ProductionShiftService: Shift not found with ID: ${id}`);
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

    update: async (id, updateData) => {
        logger.info(`ProductionShiftService: Updating shift with ID: ${id}`, { updateData: updateData });
        try {
            const [updatedRowsCount] = await ProductionShift.update({
                ...updateData,
                updateDate: new Date()
            }, {
                where: { shiftIdSeq: id }
            });
            
            if (updatedRowsCount === 0) {
                logger.warn(`ProductionShiftService: No shift found to update with ID: ${id}`);
                throw new Error('Shift not found');
            }
            
            const updatedShift = await ProductionShift.findByPk(id);
            logger.info(`ProductionShiftService: Successfully updated shift: ${updatedShift.shiftId} (ID: ${id})`, {
                production: updatedShift.production,
                netProduction: updatedShift.netProduction
            });
            return updatedShift;
        } catch (error) {
            logger.error(`ProductionShiftService: Failed to update shift with ID: ${id}`, { 
                error: error.message, 
                updateData: updateData,
                stack: error.stack 
            });
            throw error;
        }
    },

    delete: async (id) => {
        logger.info(`ProductionShiftService: Deleting shift with ID: ${id}`);
        try {
            const shift = await ProductionShift.findByPk(id);
            const deletedRowsCount = await ProductionShift.destroy({
                where: { shiftIdSeq: id }
            });
            
            if (deletedRowsCount === 0) {
                logger.warn(`ProductionShiftService: No shift found to delete with ID: ${id}`);
                throw new Error('Shift not found');
            }
            
            logger.info(`ProductionShiftService: Successfully deleted shift: ${shift?.shiftId || 'Unknown'} (ID: ${id})`);
            return { message: 'Shift deleted successfully' };
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
