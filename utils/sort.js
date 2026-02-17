const { col } = require("sequelize");
const { SortBy, SortOrder } = require("../constants/sort");

const buildSortOrder = (sortBy, sortOrder, sequenceColumn, tableAlias = null) => {
    const direction = sortOrder === SortOrder.DESC ? 'DESC' : 'ASC';
    const qualifiedColumn = (columnName) => (tableAlias ? `${tableAlias}.${columnName}` : columnName);

    switch (sortBy) {
        case SortBy.CREATE_DATE:
            return [[col(qualifiedColumn('create_date')), direction]];
        case SortBy.UPDATE_DATE:
            return [[col(qualifiedColumn('update_date')), direction]];
        case SortBy.CREATED_BY:
            return [[col(qualifiedColumn('created_by')), direction]];
        case SortBy.UPDATED_BY:
            return [[col(qualifiedColumn('updated_by')), direction]];
        case SortBy.SEQUENCE:
        default:
            return [[col(qualifiedColumn(sequenceColumn)), direction]];
    }
};

module.exports = { buildSortOrder };
