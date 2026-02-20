const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const errorHandler = require("../middlewares/errorHandler");
const logger = require("../config/logger");
const { SortBy, SortOrder } = require("../constants/sort");
const companyCreationService = require("../services/companyCreation");

const buildContext = (req) => {
    const auth = req.auth || {};
    const actorUserId =
        typeof auth.getUserId === "function" ? auth.getUserId() : auth.id ?? null;
    const actorCompanyId =
        typeof auth.getPrimaryCompanyId === "function" ? auth.getPrimaryCompanyId() : null;

    return {
        actor: {
            userId: actorUserId,
            companyId: actorCompanyId
        },
        requestId: req.requestId,
        source: "http",
        username: auth.username || null
    };
};

router.get("/", authenticate, async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage, 10) || 10;
        const search = req.query.search || "";
        const sortBy = SortBy[`${req.query.sortBy || ""}`] || SortBy.SEQUENCE;
        const sortOrder = SortOrder[`${req.query.sortOrder || ""}`] || SortOrder.DESC;

        const result = await companyCreationService.getAllCompanyCreations(
            page,
            itemsPerPage,
            search,
            sortBy,
            sortOrder
        );

        res.json(result);
    } catch (error) {
        next(error);
    }
});

const parseRegistrationId = (value) => {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
        return null;
    }
    return parsed;
};

router.get("/:registrationId", authenticate, async (req, res, next) => {
    try {
        const registrationId = parseRegistrationId(req.params.registrationId);
        if (!registrationId) {
            return res.status(400).json({ error: "registrationId must be a positive integer" });
        }

        const item = await companyCreationService.getCompanyCreationById(registrationId);
        if (!item) {
            return res.status(404).json({ error: "Company not found" });
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
});

router.post("/", authenticate, async (req, res, next) => {
    try {
        const context = buildContext(req);
        const result = await companyCreationService.createCompanyWithUser(req.body, context);
        res.status(201).json(result);
    } catch (error) {
        logger.error("CompanyCreationRoute: POST /company-creation failed", {
            error: error.message,
            stack: error.stack
        });
        next(error);
    }
});

router.patch("/:registrationId", authenticate, async (req, res, next) => {
    try {
        const registrationId = parseRegistrationId(req.params.registrationId);
        if (!registrationId) {
            return res.status(400).json({ error: "registrationId must be a positive integer" });
        }

        const context = buildContext(req);
        const result = await companyCreationService.updateCompanyWithUser(registrationId, req.body, context);
        res.json(result);
    } catch (error) {
        if (error.message === "Company not found") {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
});

router.delete("/:registrationId", authenticate, async (req, res, next) => {
    try {
        const registrationId = parseRegistrationId(req.params.registrationId);
        if (!registrationId) {
            return res.status(400).json({ error: "registrationId must be a positive integer" });
        }

        const context = buildContext(req);
        await companyCreationService.deleteCompanyWithUser(registrationId, context);
        res.status(204).send();
    } catch (error) {
        if (error.message === "Company not found") {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
