const { Op } = require("sequelize");
const { Asset } = require("../models");
const logger = require("../config/logger");
const ItemsPerPage = require("../constants/pagination");

const assetsService = {
    createAsset: async (assetData) => {
        logger.info("AssetsService: Creating asset", {
            module: assetData.module,
            subModule: assetData.subModule,
            identifier: assetData.identifier,
            visibility: assetData.visibility,
            companyId: assetData.companyId,
            createdBy: assetData.createdBy,
        });
        try {
            const asset = await Asset.create(assetData);
            logger.info("AssetsService: Asset created", { assetId: asset.id });
            return asset;
        } catch (error) {
            logger.error("AssetsService: Failed to create asset", {
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    listAssets: async ({ module, subModule, identifier, includePrivate, companyId, page = 1, itemsPerPage = ItemsPerPage.TEN }) => {
        const validLimit = ItemsPerPage.isValid(itemsPerPage) ? itemsPerPage : ItemsPerPage.TEN;
        logger.info("AssetsService: Listing assets", {
            module,
            subModule,
            identifier,
            includePrivate,
            companyId,
            page,
            itemsPerPage: validLimit,
        });
        try {
            const whereClause = {
                isDeleted: false,
                isActive: true,
            };

            if (module) whereClause.module = module;
            if (subModule) whereClause.subModule = subModule;
            if (identifier) whereClause.identifier = identifier;

            if (!includePrivate) {
                whereClause.visibility = 'public';
            } else if (companyId) {
                whereClause[Op.or] = [
                    { visibility: 'public', isActive: true },
                    { visibility: 'private', companyId, isActive: true },
                ];
            } else {
                whereClause.visibility = 'public';
            }

            const offset = (page - 1) * validLimit;

            const { count, rows } = await Asset.findAndCountAll({
                where: whereClause,
                limit: validLimit,
                offset,
                order: [["id", "DESC"]],
            });

            logger.info("AssetsService: Assets retrieved", { count: rows.length });
            return {
                items: rows,
                paging: {
                    currentPage: page,
                    itemsPerPage: validLimit,
                    totalItems: count,
                    totalPages: Math.ceil(count / validLimit),
                }
            };
        } catch (error) {
            logger.error("AssetsService: Failed to list assets", {
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    getAssetById: async (id) => {
        logger.info("AssetsService: Fetching asset", { assetId: id });
        try {
            return await Asset.findOne({
                where: {
                    id,
                    isDeleted: false,
                },
            });
        } catch (error) {
            logger.error("AssetsService: Failed to fetch asset", {
                assetId: id,
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    getAssetByIdAny: async (id) => {
        logger.info("AssetsService: Fetching asset (any)", { assetId: id });
        try {
            return await Asset.findOne({ where: { id } });
        } catch (error) {
            logger.error("AssetsService: Failed to fetch asset (any)", {
                assetId: id,
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    updateAsset: async (id, updates) => {
        logger.info("AssetsService: Updating asset", { assetId: id });
        try {
            const [updatedRows] = await Asset.update(updates, {
                where: {
                    id,
                    isDeleted: false,
                }
            });
            if (updatedRows === 0) {
                return null;
            }
            return await Asset.findOne({ where: { id } });
        } catch (error) {
            logger.error("AssetsService: Failed to update asset", {
                assetId: id,
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    softDeleteAsset: async (id, updatedBy) => {
        logger.info("AssetsService: Soft delete asset", { assetId: id });
        try {
            const [updatedRows] = await Asset.update({
                isDeleted: true,
                isActive: false,
                updatedBy,
            }, {
                where: {
                    id,
                    isDeleted: false,
                }
            });
            return updatedRows > 0;
        } catch (error) {
            logger.error("AssetsService: Failed to soft delete asset", {
                assetId: id,
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },

    hardDeleteAsset: async (id) => {
        logger.info("AssetsService: Hard delete asset", { assetId: id });
        try {
            const asset = await Asset.findOne({ where: { id } });
            if (!asset) {
                return null;
            }
            await Asset.destroy({ where: { id } });
            return asset;
        } catch (error) {
            logger.error("AssetsService: Failed to hard delete asset", {
                assetId: id,
                error: error.message,
                stack: error.stack,
            });
            throw error;
        }
    },
};

module.exports = assetsService;
