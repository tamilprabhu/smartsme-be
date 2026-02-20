const { Machine } = require("../models");
const { Op } = require("sequelize");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");
const { SortBy, SortOrder } = require("../constants/sort");
const { buildSortOrder } = require("../utils/sort");
const { generateMachineId } = require("../utils/idGenerator");
const { validateCreate, validateUpdate } = require("../validators/machine");

const MAX_RETRY_ATTEMPTS = 5;

const machineService = {
    // Get all machines with pagination and search
    getAllMachines: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        companyId = null,
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`MachineService: Fetching machines - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}, companyId: ${companyId}`);
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
                            { machineName: { [Op.like]: `%${search}%` } },
                            { machineId: { [Op.like]: `%${search}%` } },
                            { machineType: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ];
            }
            
            const { count, rows } = await Machine.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset: offset,
                order: buildSortOrder(sortBy, sortOrder, 'machine_seq', 'Machine')
            });
            logger.info(`MachineService: Successfully retrieved ${rows.length} machines out of ${count} total for company: ${companyId}`);
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
    getMachineById: async (id, companyId = null) => {
        logger.info(`MachineService: Fetching machine with ID: ${id}, companyId: ${companyId}`);
        try {
            const whereClause = { machineSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const machine = await Machine.findOne({ where: whereClause });
            if (machine) {
                logger.info(`MachineService: Successfully retrieved machine: ${machine.machineName} (ID: ${id})`, {
                    machineType: machine.machineType,
                    capacity: machine.capacity
                });
            } else {
                logger.warn(`MachineService: Machine not found with ID: ${id} for company: ${companyId}`);
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
    createMachine: async (machineData, companyId, userId) => {
        const baseData = {
            companyId: companyId,
            createdBy: userId,
            updatedBy: userId
        };
        
        logger.info(`MachineService: Creating new machine: ${machineData.machineName}`, { 
            companyId: companyId,
            machineType: machineData.machineType,
            capacity: machineData.capacity,
            createdBy: userId
        });
        try {
            const validatedData = await validateCreate(machineData, companyId);

            let machine;
            let attempts = 0;
            while (attempts < MAX_RETRY_ATTEMPTS) {
                try {
                    const enrichedData = {
                        ...validatedData,
                        ...baseData,
                        machineId: generateMachineId()
                    };
                    machine = await Machine.create(enrichedData);
                    break;
                } catch (error) {
                    const isUniqueError = error.name === "SequelizeUniqueConstraintError" &&
                        error.errors?.some((e) => e.path === "machine_id" || e.path === "machineId");

                    if (isUniqueError) {
                        attempts++;
                        if (attempts >= MAX_RETRY_ATTEMPTS) {
                            throw new Error("Failed to generate unique machine_id after maximum retries");
                        }
                        logger.warn(`MachineService: Duplicate machine_id, retrying (${attempts}/${MAX_RETRY_ATTEMPTS})`);
                    } else {
                        throw error;
                    }
                }
            }

            logger.info(`MachineService: Successfully created machine: ${machine.machineName} (ID: ${machine.machineSequence})`, {
                machineId: machine.machineId,
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
    updateMachine: async (id, machineData, companyId, userId) => {
        logger.info(`MachineService: Updating machine with ID: ${id}`, { updateData: machineData, companyId });
        try {
            const validatedData = await validateUpdate(id, machineData, companyId);
            const { machineId, ...safeData } = validatedData;
            const enrichedData = {
                ...safeData,
                updatedBy: userId
            };

            const whereClause = { machineSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const [updatedRows] = await Machine.update(enrichedData, {
                where: whereClause
            });
            if (updatedRows === 0) {
                logger.warn(`MachineService: No machine found to update with ID: ${id} for company: ${companyId}`);
                throw new Error("Machine not found");
            }
            const updatedMachine = await Machine.findOne({ where: whereClause });
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
    deleteMachine: async (id, companyId) => {
        logger.info(`MachineService: Deleting machine with ID: ${id}, companyId: ${companyId}`);
        try {
            const whereClause = { machineSequence: id };
            if (companyId) {
                whereClause.companyId = companyId;
            }
            
            const machine = await Machine.findOne({ where: whereClause });
            const [updatedRows] = await Machine.update(
                { isDeleted: true, isActive: false },
                { where: { ...whereClause, isDeleted: false } }
            );
            if (updatedRows === 0) {
                logger.warn(`MachineService: No machine found to delete with ID: ${id} for company: ${companyId}`);
                throw new Error("Machine not found");
            }
            logger.info(`MachineService: Successfully soft deleted machine: ${machine?.machineName || 'Unknown'} (ID: ${id})`);
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
