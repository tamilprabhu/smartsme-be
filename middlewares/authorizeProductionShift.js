'use strict';

const { SYSTEM_ROLES } = require('../constants/roles');

/**
 * PRODUCTION SHIFT RBAC MIDDLEWARE
 *
 * Each exported function is an Express middleware that guards a specific
 * operation on the production-shift resource.
 *
 * Role hierarchy (from roles.js SYSTEM_ROLES):
 *   OWNER, ADMIN          → full access
 *   PLANT_HEAD            → full access
 *   SHIFT_INCHARGE        → read + create + update
 *   PRODUCTION_EMPLOYEE   → read only
 *   GUEST                 → read only
 *   All others            → denied
 *
 * Usage:
 *   const authorize = require('../middlewares/authorizeProductionShift');
 *   router.get('/', authenticate, authorize.read, handler);
 *   router.post('/', authenticate, authorize.create, handler);
 */

const FULL_ACCESS_ROLES   = ['OWNER', 'ADMIN', 'PLANT_HEAD'];
const CREATE_UPDATE_ROLES = [...FULL_ACCESS_ROLES, 'SHIFT_INCHARGE'];
const READ_ROLES          = [...CREATE_UPDATE_ROLES, 'PRODUCTION_EMPLOYEE'];

/**
 * Build a middleware that allows the request through if the authenticated
 * user holds any of the permitted role names, or is a GUEST (read-only tier).
 *
 * @param {string[]} permittedRoles  - role names that may pass
 * @param {boolean}  guestAllowed    - if true, GUEST users also pass
 * @returns {import('express').RequestHandler}
 */
function buildAuthorize(permittedRoles, guestAllowed = false) {
    return function authorize(req, res, next) {
        const roles = req.auth?.roles ?? [];

        const isGuest = roles.some((r) => r.id === SYSTEM_ROLES.GUEST?.id);
        if (isGuest && guestAllowed) return next();
        if (isGuest) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        const roleNames = roles.map((r) => r.name).filter(Boolean);
        const permitted = roleNames.some((name) => permittedRoles.includes(name));
        if (!permitted) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
    };
}

module.exports = {
    /** GET /production-shift and GET /production-shift/:id */
    read:   buildAuthorize(READ_ROLES,          /* guestAllowed */ true),

    /** POST /production-shift */
    create: buildAuthorize(CREATE_UPDATE_ROLES, /* guestAllowed */ false),

    /** PUT /production-shift/:id */
    update: buildAuthorize(CREATE_UPDATE_ROLES, /* guestAllowed */ false),

    /** DELETE /production-shift/:id */
    delete: buildAuthorize(FULL_ACCESS_ROLES,   /* guestAllowed */ false),
};
