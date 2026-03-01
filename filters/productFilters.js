const logger = require('../config/logger');

class FilterStrategy {
    apply(whereClause, context) {
        return whereClause;
    }
}

class PlatformUserFilter extends FilterStrategy {
    apply(whereClause, { roles }) {
        const isPlatformUser = roles.some((role) => role.name.startsWith('SMARTSME_'));

        if (isPlatformUser) {
            delete whereClause.companyId;
            logger.debug('PlatformUserFilter: Removed companyId filter for platform user');
        }

        return whereClause;
    }
}

class CompanyUserFilter extends FilterStrategy {
    apply(whereClause, { roles, companyId }) {
        const isPlatformUser = roles.some((role) => role.name.startsWith('SMARTSME_'));

        if (!isPlatformUser && companyId) {
            whereClause.companyId = companyId;
            logger.debug(`CompanyUserFilter: Applied companyId filter: ${companyId}`);
        }

        return whereClause;
    }
}

class FilterChain {
    constructor() {
        this.filters = [];
    }

    add(filter) {
        this.filters.push(filter);
        return this;
    }

    execute(whereClause, context) {
        return this.filters.reduce((clause, filter) => filter.apply(clause, context), whereClause);
    }
}

const createProductFilterChain = () => {
    return new FilterChain().add(new PlatformUserFilter()).add(new CompanyUserFilter());
};

module.exports = {
    FilterStrategy,
    PlatformUserFilter,
    CompanyUserFilter,
    FilterChain,
    createProductFilterChain,
};
