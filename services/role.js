const { Role } = require('../models');
const { Op } = require('sequelize');
const logger = require('../config/logger');
const ItemsPerPage = require('../constants/pagination');
const { SortBy, SortOrder } = require('../constants/sort');
const { buildSortOrder } = require('../utils/sort');
const { validateCreate, validateUpdate } = require('../validators/role');

const roleService = {
    getAllRoles: async (
        page = 1,
        itemsPerPage = ItemsPerPage.TEN,
        search = '',
        sortBy = SortBy.SEQUENCE,
        sortOrder = SortOrder.DESC
    ) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info(`RoleService: Fetching roles - page: ${page}, itemsPerPage: ${validLimit}, search: ${search}`);

        try {
            const offset = (page - 1) * validLimit;
            const where = {
                isDeleted: false,
                name: { [Op.notLike]: 'SMARTSME_%' },
                ...(search
                    ? {
                          [Op.or]: [
                              { name: { [Op.like]: `%${search}%` } },
                              { description: { [Op.like]: `%${search}%` } }
                          ]
                      }
                    : {})
            };

            const { count, rows } = await Role.findAndCountAll({
                where,
                limit: validLimit,
                offset,
                order: buildSortOrder(sortBy, sortOrder, 'id', 'Role')
            });

            logger.info(`RoleService: Successfully retrieved ${rows.length} roles out of ${count} total`);
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
            logger.error('RoleService: Failed to fetch roles', {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    getRoleById: async (id) => {
        logger.info(`RoleService: Fetching role with ID: ${id}`);

        try {
            const role = await Role.findOne({ where: { id, isDeleted: false } });
            if (role) {
                logger.info(`RoleService: Successfully retrieved role: ${role.name} (ID: ${id})`);
            } else {
                logger.warn(`RoleService: Role not found with ID: ${id}`);
            }
            return role;
        } catch (error) {
            logger.error(`RoleService: Failed to fetch role with ID: ${id}`, {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    createRole: async (roleData, context) => {
        logger.info('RoleService: Creating new role', {
            roleName: roleData.name,
            actorId: context.actor?.userId
        });

        try {
            const validatedData = await validateCreate(roleData);
            const role = await Role.create(
                {
                    ...validatedData,
                    createdBy: context.actor?.userId ?? null,
                    updatedBy: context.actor?.userId ?? null
                },
                { context }
            );

            logger.info(`RoleService: Successfully created role: ${role.name} (ID: ${role.id})`);
            return role;
        } catch (error) {
            logger.error('RoleService: Failed to create role', {
                roleName: roleData.name,
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    updateRole: async (id, roleData, context) => {
        logger.info(`RoleService: Updating role with ID: ${id}`, {
            updates: Object.keys(roleData),
            actorId: context.actor?.userId
        });

        try {
            const currentRole = await Role.findOne({ where: { id, isDeleted: false } });
            if (!currentRole) {
                logger.warn(`RoleService: No role found to update with ID: ${id}`);
                return null;
            }
            const validatedData = await validateUpdate(id, roleData);

            const [updatedRowsCount] = await Role.update(
                {
                    ...validatedData,
                    updatedBy: context.actor?.userId ?? currentRole.updatedBy
                },
                {
                    where: { id, isDeleted: false },
                    context
                }
            );

            if (updatedRowsCount === 0) {
                logger.warn(`RoleService: No role found to update with ID: ${id}`);
                return null;
            }

            const updatedRole = await Role.findByPk(id);
            logger.info(`RoleService: Successfully updated role: ${updatedRole.name} (ID: ${id})`);
            return updatedRole;
        } catch (error) {
            logger.error(`RoleService: Failed to update role with ID: ${id}`, {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    },

    deleteRole: async (id, context) => {
        logger.info(`RoleService: Deleting role with ID: ${id}`, {
            actorId: context.actor?.userId
        });

        try {
            const role = await Role.findOne({ where: { id, isDeleted: false } });
            if (!role) {
                logger.warn(`RoleService: Role not found for deletion with ID: ${id}`);
                return false;
            }

            const [updatedRowsCount] = await Role.update(
                {
                    isDeleted: true,
                    isActive: false,
                    updatedBy: context.actor?.userId ?? role.updatedBy
                },
                {
                    where: { id, isDeleted: false },
                    context
                }
            );

            if (updatedRowsCount === 0) {
                logger.warn(`RoleService: Role already deleted with ID: ${id}`);
                return false;
            }

            logger.info(`RoleService: Successfully soft deleted role: ${role.name} (ID: ${id})`);
            return true;
        } catch (error) {
            logger.error(`RoleService: Failed to delete role with ID: ${id}`, {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    }
};

module.exports = roleService;
