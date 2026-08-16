'use strict';

const Machine = require('../models/machine');

/**
 * SequelizeMachineRepository
 *
 * Minimal repository providing the findById() existence-check method
 * needed by production-shift use-cases. Only returns active, non-deleted records.
 */
class SequelizeMachineRepository {
    /**
     * @param {string} machineId
     * @param {string} companyId
     * @returns {Promise<object|null>} plain Sequelize instance or null
     */
    async findById(machineId, companyId) {
        const where = { machineId, isDeleted: false, isActive: true };
        if (companyId) where.companyId = companyId;
        return Machine.findOne({ where, attributes: ['machineId'] });
    }
}

module.exports = new SequelizeMachineRepository();
