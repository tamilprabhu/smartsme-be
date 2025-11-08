const { Machine } = require("../models");
const logger = require("../config/logger");

const machineService = {
    // Get all machines
    getAllMachines: async () => {
        logger.info("MachineService: Fetching all machines");
        try {
            const machines = await Machine.findAll();
            logger.info(`MachineService: Successfully retrieved ${machines.length} machines`);
            return machines;
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
