const { col } = require("sequelize");
const { SortBy, SortOrder } = require("../constants/sort");

const buildSortOrder = (sortBy, sortOrder, sequenceColumn) => {
    const direction = sortOrder === SortOrder.DESC ? 'DESC' : 'ASC';
    switch (sortBy) {
        case SortBy.CREATE_DATE:
            return [[col('create_date'), direction]];
        case SortBy.UPDATE_DATE:
            return [[col('update_date'), direction]];
        case SortBy.CREATED_BY:
            return [[col('created_by'), direction]];
        case SortBy.UPDATED_BY:
            return [[col('updated_by'), direction]];
        case SortBy.SEQUENCE:
        default:
            return [[col(sequenceColumn), direction]];
    }
};

module.exports = { buildSortOrder };
