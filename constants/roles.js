const SYSTEM_ROLES = {
    GUEST: { id: 0, name: "GUEST" }
};

const GUEST_PERMISSIONS = [
    "PRODUCTION_READ",
    "SECONDARY_PROCESS_READ",
    "COMPANY_READ"
];

const GUEST_ACTIONS = ["READ"];

module.exports = {
    SYSTEM_ROLES,
    GUEST_PERMISSIONS,
    GUEST_ACTIONS
};
