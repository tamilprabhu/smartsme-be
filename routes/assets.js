const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const logger = require("../config/logger");
const authenticate = require("../middlewares/authenticate");
const optionalAuth = require("../middlewares/optionalAuth");
const assetsService = require("../services/assets");
const ItemsPerPage = require("../constants/pagination");

const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "application/vnd.android.package-archive",
    "application/zip",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "text/plain",
]);

const MAX_UPLOAD_MB = parseInt(process.env.UPLOAD_MAX_MB || "100", 10);
const MAX_UPLOAD_BYTES = Number.isFinite(parseInt(process.env.UPLOAD_MAX_BYTES || "", 10))
    ? parseInt(process.env.UPLOAD_MAX_BYTES, 10)
    : (Number.isFinite(MAX_UPLOAD_MB) ? MAX_UPLOAD_MB * 1024 * 1024 : 100 * 1024 * 1024);
const STORAGE_ROOT = process.env.ASSET_STORAGE_ROOT || path.join(__dirname, "..", "storage", "uploads");
const DOWNLOAD_EXPIRES_IN = process.env.ASSET_DOWNLOAD_EXPIRES_IN || "15m";
const DOWNLOAD_TOKEN_TYPE = "asset_download";

const normalizeSegment = (value) => (value || "").toString().trim();
const safeSegment = (value) => normalizeSegment(value).replace(/[^a-zA-Z0-9._-]/g, "_") || "unknown";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const moduleName = normalizeSegment(req.body.module);
        const subModuleName = normalizeSegment(req.body.subModule);
        if (!moduleName || !subModuleName) {
            return cb(new Error("module and subModule are required"));
        }
        const safeModule = safeSegment(moduleName);
        const safeSubModule = safeSegment(subModuleName);
        const dest = path.join(STORAGE_ROOT, safeModule, safeSubModule);
        fs.mkdir(dest, { recursive: true }, (err) => {
            if (err) return cb(err);
            req.assetStorage = { safeModule, safeSubModule, dest };
            cb(null, dest);
        });
    },
    filename: (req, file, cb) => {
        const safeOriginal = safeSegment(file.originalname || "file");
        const uuid = crypto.randomUUID();
        const storedName = `${uuid}_${safeOriginal}`;
        req.assetStoredName = storedName;
        cb(null, storedName);
    }
});

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_UPLOAD_BYTES },
});

const buildDownloadUrl = (req, asset, token) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const tokenParam = token ? `?token=${encodeURIComponent(token)}` : "";
    return `${baseUrl}/api/1.0.0/assets/download/${asset.id}${tokenParam}`;
};

const createDownloadToken = (asset) => {
    const payload = {
        type: DOWNLOAD_TOKEN_TYPE,
        assetId: asset.id,
        visibility: asset.visibility,
        companyId: asset.companyId || null,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: DOWNLOAD_EXPIRES_IN,
        issuer: "smartsme-api",
        audience: "smartsme-client",
    });
};

const getCompanyId = (req) => {
    if (req.auth?.getPrimaryCompanyId) return req.auth.getPrimaryCompanyId();
    return req.auth?.companies?.[0]?.companyId || null;
};

const getUserId = (req) => {
    if (req.auth?.getUserId) return req.auth.getUserId();
    return req.auth?.sub || req.auth?.id || null;
};

const parseMetadata = (raw) => {
    if (!raw) return null;
    try {
        return typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (err) {
        return undefined;
    }
};

const ensureCompanyAccess = (asset, companyId) => {
    if (!asset.companyId) return true;
    if (!companyId) return false;
    return asset.companyId === companyId;
};

const handleUpload = async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: POST /assets - Request started", {
        requestId,
        companyId,
        userId,
    });

    try {
        if (!req.file) {
            return res.status(400).json({ error: "file is required" });
        }

        const moduleName = normalizeSegment(req.body.module);
        const subModuleName = normalizeSegment(req.body.subModule);
        const identifier = normalizeSegment(req.body.identifier);
        const visibility = normalizeSegment(req.body.visibility || "private").toLowerCase();
        const metadata = parseMetadata(req.body.metadata);

        if (metadata === undefined) {
            return res.status(400).json({ error: "metadata must be valid JSON" });
        }

        if (!moduleName || !subModuleName || !identifier) {
            return res.status(400).json({ error: "module, subModule, and identifier are required" });
        }
        if (!["public", "private"].includes(visibility)) {
            return res.status(400).json({ error: "visibility must be public or private" });
        }

        if (visibility === "private" && !companyId) {
            return res.status(400).json({ error: "private assets require companyId" });
        }

        const relativePath = path.posix.join(
            safeSegment(moduleName),
            safeSegment(subModuleName),
            req.assetStoredName || req.file.filename
        );

        const asset = await assetsService.createAsset({
            module: moduleName,
            subModule: subModuleName,
            identifier: identifier,
            originalName: req.file.originalname,
            storedName: req.file.filename,
            mimeType: req.file.mimetype,
            sizeBytes: req.file.size,
            storagePath: relativePath,
            visibility: visibility,
            companyId: companyId,
            createdBy: userId,
            updatedBy: userId,
            isDeleted: false,
            isActive: true,
            metadata: metadata,
        });

        const token = createDownloadToken(asset);
        const downloadUrl = buildDownloadUrl(req, asset, token);

        logger.info("AssetsRoute: POST /assets - Request completed", {
            requestId,
            assetId: asset.id,
            module: moduleName,
            subModule: subModuleName,
            identifier,
            visibility,
            companyId,
            userId,
        });

        res.status(201).json({
            asset,
            downloadUrl,
        });
    } catch (error) {
        logger.error("AssetsRoute: POST /assets - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
            companyId,
            userId,
        });

        if (req.file?.path) {
            fs.unlink(req.file.path, () => {});
        }

        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /assets or /assets/upload - Upload asset (authenticated)
router.post("/upload", authenticate, upload.single("file"), handleUpload);
router.post("/", authenticate, upload.single("file"), handleUpload);

// GET /assets - List assets with filters
router.get("/", optionalAuth, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: GET /assets - Request started", {
        requestId,
        companyId,
        userId,
    });

    try {
        const moduleName = normalizeSegment(req.query.module);
        const subModuleName = normalizeSegment(req.query.subModule);
        const identifier = normalizeSegment(req.query.identifier);
        const itemsPerPage = ItemsPerPage.isValid(req.query.itemsPerPage) ? parseInt(req.query.itemsPerPage, 10) : ItemsPerPage.TEN;
        const page = parseInt(req.query.page, 10) || 1;

        const includePrivate = !!userId && !!companyId;

        const result = await assetsService.listAssets({
            module: moduleName || undefined,
            subModule: subModuleName || undefined,
            identifier: identifier || undefined,
            includePrivate,
            companyId,
            page,
            itemsPerPage,
        });

        const items = result.items.map((asset) => {
            const token = createDownloadToken(asset);
            return {
                ...asset.toJSON(),
                downloadUrl: buildDownloadUrl(req, asset, token),
            };
        });

        logger.info("AssetsRoute: GET /assets - Request completed", {
            requestId,
            count: items.length,
            companyId,
            userId,
        });

        res.json({
            items,
            paging: result.paging,
        });
    } catch (error) {
        logger.error("AssetsRoute: GET /assets - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
            companyId,
            userId,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /assets/download/:id - Download asset
router.get("/download/:id", async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    logger.info("AssetsRoute: GET /assets/download/:id - Request started", { requestId, assetId: req.params.id });

    try {
        const assetId = req.params.id;
        const asset = await assetsService.getAssetById(assetId);

        if (!asset || asset.isActive === false) {
            return res.status(404).json({ error: "Asset not found" });
        }

        const token = req.query.token;
        if (asset.visibility === "private") {
            if (!token) {
                return res.status(401).json({ error: "Download token required" });
            }
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET, {
                    issuer: "smartsme-api",
                    audience: "smartsme-client",
                });
            } catch (err) {
                return res.status(401).json({ error: "Invalid or expired download token" });
            }

            if (decoded.type !== DOWNLOAD_TOKEN_TYPE || decoded.assetId?.toString() !== asset.id.toString()) {
                return res.status(401).json({ error: "Invalid download token" });
            }

            if (asset.companyId && decoded.companyId && asset.companyId !== decoded.companyId) {
                return res.status(403).json({ error: "Access denied" });
            }
        } else if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                    issuer: "smartsme-api",
                    audience: "smartsme-client",
                });
                if (decoded.type !== DOWNLOAD_TOKEN_TYPE || decoded.assetId?.toString() !== asset.id.toString()) {
                    return res.status(401).json({ error: "Invalid download token" });
                }
            } catch (err) {
                return res.status(401).json({ error: "Invalid or expired download token" });
            }
        }

        const absolutePath = path.resolve(STORAGE_ROOT, asset.storagePath);
        const rootPath = path.resolve(STORAGE_ROOT);
        if (!absolutePath.startsWith(rootPath)) {
            return res.status(400).json({ error: "Invalid asset path" });
        }

        if (!fs.existsSync(absolutePath)) {
            return res.status(404).json({ error: "File not found" });
        }

        logger.info("AssetsRoute: GET /assets/download/:id - Request completed", {
            requestId,
            assetId: asset.id,
        });

        res.setHeader("Content-Type", asset.mimeType);
        res.setHeader("Content-Disposition", `attachment; filename="${asset.originalName}"`);
        return res.sendFile(absolutePath);
    } catch (error) {
        logger.error("AssetsRoute: GET /assets/download/:id - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /assets/:module/:subModule/:identifier - List assets by reference
router.get("/:module/:subModule/:identifier", optionalAuth, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: GET /assets/:module/:subModule/:identifier - Request started", {
        requestId,
        companyId,
        userId,
        module: req.params.module,
        subModule: req.params.subModule,
        identifier: req.params.identifier,
    });

    try {
        const moduleName = normalizeSegment(req.params.module);
        const subModuleName = normalizeSegment(req.params.subModule);
        const identifier = normalizeSegment(req.params.identifier);

        if (!moduleName || !subModuleName || !identifier) {
            return res.status(400).json({ error: "module, subModule, and identifier are required" });
        }

        const includePrivate = !!userId && !!companyId;

        const result = await assetsService.listAssets({
            module: moduleName,
            subModule: subModuleName,
            identifier,
            includePrivate,
            companyId,
            page: 1,
            itemsPerPage: ItemsPerPage.HUNDRED,
        });

        const items = result.items.map((asset) => {
            const token = createDownloadToken(asset);
            return {
                ...asset.toJSON(),
                downloadUrl: buildDownloadUrl(req, asset, token),
            };
        });

        logger.info("AssetsRoute: GET /assets/:module/:subModule/:identifier - Request completed", {
            requestId,
            count: items.length,
            companyId,
            userId,
        });

        res.json({ items });
    } catch (error) {
        logger.error("AssetsRoute: GET /assets/:module/:subModule/:identifier - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /assets/:id - Get asset metadata
router.get("/:id", optionalAuth, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: GET /assets/:id - Request started", {
        requestId,
        assetId: req.params.id,
        companyId,
        userId,
    });

    try {
        const assetId = req.params.id;
        const asset = await assetsService.getAssetById(assetId);

        if (!asset || asset.isActive === false) {
            return res.status(404).json({ error: "Asset not found" });
        }

        if (asset.visibility === "private" && (!userId || !ensureCompanyAccess(asset, companyId))) {
            return res.status(403).json({ error: "Access denied" });
        }

        const token = createDownloadToken(asset);
        res.json({
            asset,
            downloadUrl: buildDownloadUrl(req, asset, token),
        });
    } catch (error) {
        logger.error("AssetsRoute: GET /assets/:id - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
            companyId,
            userId,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /assets/:id - Update asset metadata/visibility/status
router.put("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: PUT /assets/:id - Request started", {
        requestId,
        assetId: req.params.id,
        companyId,
        userId,
    });

    try {
        const assetId = req.params.id;
        const visibility = normalizeSegment(req.body.visibility).toLowerCase();
        const isActiveRaw = req.body.isActive;
        const metadata = parseMetadata(req.body.metadata);

        if (metadata === undefined) {
            return res.status(400).json({ error: "metadata must be valid JSON" });
        }

        const updates = {};
        if (visibility) {
            if (!["public", "private"].includes(visibility)) {
                return res.status(400).json({ error: "visibility must be public or private" });
            }
            updates.visibility = visibility;
        }
        if (typeof isActiveRaw !== "undefined") {
            updates.isActive = Boolean(isActiveRaw === true || isActiveRaw === "true" || isActiveRaw === 1 || isActiveRaw === "1");
        }
        if (metadata !== null && metadata !== undefined) {
            updates.metadata = metadata;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const asset = await assetsService.getAssetById(assetId);
        if (!asset || asset.isDeleted) {
            return res.status(404).json({ error: "Asset not found" });
        }

        if (!ensureCompanyAccess(asset, companyId)) {
            return res.status(403).json({ error: "Access denied" });
        }

        if (updates.visibility === "private" && !companyId) {
            return res.status(400).json({ error: "private assets require companyId" });
        }

        updates.updatedBy = userId;

        const updated = await assetsService.updateAsset(assetId, updates);
        if (!updated) {
            return res.status(404).json({ error: "Asset not found" });
        }

        res.json({ asset: updated });
    } catch (error) {
        logger.error("AssetsRoute: PUT /assets/:id - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
            companyId,
            userId,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /assets/:id/hard - Hard delete (file + row)
router.delete("/:id/hard", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: DELETE /assets/:id/hard - Request started", {
        requestId,
        assetId: req.params.id,
        companyId,
        userId,
    });

    try {
        const assetId = req.params.id;
        const asset = await assetsService.getAssetByIdAny(assetId);
        if (!asset) {
            return res.status(404).json({ error: "Asset not found" });
        }

        if (!ensureCompanyAccess(asset, companyId)) {
            return res.status(403).json({ error: "Access denied" });
        }

        const absolutePath = path.resolve(STORAGE_ROOT, asset.storagePath);
        const rootPath = path.resolve(STORAGE_ROOT);
        if (!absolutePath.startsWith(rootPath)) {
            return res.status(400).json({ error: "Invalid asset path" });
        }

        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }

        await assetsService.hardDeleteAsset(assetId);

        res.json({ message: "Asset hard deleted" });
    } catch (error) {
        logger.error("AssetsRoute: DELETE /assets/:id/hard - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
            companyId,
            userId,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /assets/:id - Soft delete
router.delete("/:id", authenticate, async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const companyId = getCompanyId(req);
    const userId = getUserId(req);

    logger.info("AssetsRoute: DELETE /assets/:id - Request started", {
        requestId,
        assetId: req.params.id,
        companyId,
        userId,
    });

    try {
        const assetId = req.params.id;
        const asset = await assetsService.getAssetById(assetId);
        if (!asset) {
            return res.status(404).json({ error: "Asset not found" });
        }

        if (!ensureCompanyAccess(asset, companyId)) {
            return res.status(403).json({ error: "Access denied" });
        }

        const success = await assetsService.softDeleteAsset(assetId, userId);
        if (!success) {
            return res.status(404).json({ error: "Asset not found" });
        }

        res.json({ message: "Asset soft deleted" });
    } catch (error) {
        logger.error("AssetsRoute: DELETE /assets/:id - Request failed", {
            requestId,
            error: error.message,
            stack: error.stack,
            companyId,
            userId,
        });
        res.status(500).json({ error: "Internal server error" });
    }
});

// Multer error handler
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({ error: `File too large. Max ${MAX_UPLOAD_MB} MB` });
        }
        return res.status(400).json({ error: err.message });
    }

    if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

module.exports = router;
