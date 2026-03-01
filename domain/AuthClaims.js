class AuthClaims {
    constructor(decoded) {
        this.userId = decoded.sub;
        this.username = decoded.username;
        this.jti = decoded.jti;
        this.roles = decoded.roles || [];
        this.companies = decoded.companies || [];
        this.type = decoded.type;
        this.iss = decoded.iss;
        this.aud = decoded.aud;
    }

    validate() {
        if (!this.userId) {
            throw new Error('Missing user ID in token claims');
        }
        if (!Array.isArray(this.roles) || this.roles.length === 0) {
            throw new Error('Missing or invalid roles in token claims');
        }
        if (!Array.isArray(this.companies)) {
            throw new Error('Missing or invalid companies in token claims');
        }
        if (this.type !== 'access') {
            throw new Error('Invalid token type');
        }
        if (this.iss !== 'smartsme-api' || this.aud !== 'smartsme-client') {
            throw new Error('Invalid token issuer or audience');
        }
    }

    getPrimaryCompanyId() {
        return this.companies[0]?.companyId || null;
    }

    getUserId() {
        return this.userId;
    }

    getRoleNames() {
        return this.roles.map((role) => role?.name).filter(Boolean);
    }

    hasRole(roleName) {
        return this.getRoleNames().includes(roleName);
    }

    hasAnyRole(roleNames = []) {
        const names = this.getRoleNames();
        return roleNames.some((roleName) => names.includes(roleName));
    }

    hasAllRoles(roleNames = []) {
        const names = this.getRoleNames();
        return roleNames.every((roleName) => names.includes(roleName));
    }
}

module.exports = AuthClaims;
