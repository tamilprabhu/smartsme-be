const { Machine } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const machineService = {
    // Get all machines with pagination and search
    getAllMachines: async (page = 1, itemsPerPage = ItemsPerPage.TEN, search = '') => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`MachineService: Fetching machines - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);
        try {
            const offset = (page - 1) * validLimit;
            
            const whereClause = search ? {
                [Op.or]: [
                    { machineName: { [Op.like]: `%${search}%` } },
                    { machineId: { [Op.like]: `%${search}%` } },
                    { machineType: { [Op.like]: `%${search}%` } },
                    { companyId: { [Op.like]: `%${search}%` } }
                ]
            } : {};
            
            const { count, rows } = await Machine.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: [['machineIdSeq', 'ASC']]
            });
            logger.info(`MachineService: Successfully retrieved ${rows.length} machines out of ${count} total`);
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
            logger.error("MachineService: Failed to fetch machines", { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Get machine by ID
    getMachineById: async (id) => {
        logger.info(`MachineService: Fetching machine with ID: ${id}`);
        try {
            const machine = await Machine.findByPk(id);
            if (machine) {
                logger.info(`MachineService: Successfully retrieved machine: ${machine.machineName} (ID: ${id})`, {
                    machineType: machine.machineType,
                    capacity: machine.capacity
                });
            } else {
                logger.warn(`MachineService: Machine not found with ID: ${id}`);
            }
            return machine;
        } catch (error) {
            logger.error(`MachineService: Failed to fetch machine with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    },

    // Create new machine
    createMachine: async (machineData) => {
        logger.info(`MachineService: Creating new machine: ${machineData.machineName}`, { 
            companyId: machineData.companyId,
            machineType: machineData.machineType,
            capacity: machineData.capacity
        });
        try {
            const machine = await Machine.create(machineData);
            logger.info(`MachineService: Successfully created machine: ${machine.machineName} (ID: ${machine.machineIdSeq})`, {
                machineId: machine.machineIdSeq,
                companyId: machine.companyId,
                activeFlag: machine.activeFlag
            });
            return machine;
        } catch (error) {
            logger.error(`MachineService: Failed to create machine: ${machineData.machineName}`, { 
                error: error.message, 
                machineData: machineData,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Update machine
    updateMachine: async (id, machineData) => {
        logger.info(`MachineService: Updating machine with ID: ${id}`, { updateData: machineData });
        try {
            const [updatedRows] = await Machine.update(machineData, {
                where: { machineIdSeq: id }
            });
            if (updatedRows === 0) {
                logger.warn(`MachineService: No machine found to update with ID: ${id}`);
                throw new Error("Machine not found");
            }
            const updatedMachine = await Machine.findByPk(id);
            logger.info(`MachineService: Successfully updated machine: ${updatedMachine.machineName} (ID: ${id})`);
            return updatedMachine;
        } catch (error) {
            logger.error(`MachineService: Failed to update machine with ID: ${id}`, { 
                error: error.message, 
                updateData: machineData,
                stack: error.stack 
            });
            throw error;
        }
    },

    // Delete machine
    deleteMachine: async (id) => {
        logger.info(`MachineService: Deleting machine with ID: ${id}`);
        try {
            const machine = await Machine.findByPk(id);
            const deletedRows = await Machine.destroy({
                where: { machineIdSeq: id }
            });
            if (deletedRows === 0) {
                logger.warn(`MachineService: No machine found to delete with ID: ${id}`);
                throw new Error("Machine not found");
            }
            logger.info(`MachineService: Successfully deleted machine: ${machine?.machineName || 'Unknown'} (ID: ${id})`);
            return { message: "Machine deleted successfully" };
        } catch (error) {
            logger.error(`MachineService: Failed to delete machine with ID: ${id}`, { 
                error: error.message, 
                stack: error.stack 
            });
            throw error;
        }
    }
};

module.exports = machineService;
