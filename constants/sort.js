const SortBy = Object.freeze({
    CREATE_DATE: 'CREATE_DATE',
    UPDATE_DATE: 'UPDATE_DATE',
    SEQUENCE: 'SEQUENCE',
    CREATED_BY: 'CREATED_BY',
    UPDATED_BY: 'UPDATED_BY'
});

const SortOrder = Object.freeze({
    ASC: 'ASC',
    DESC: 'DESC'
});

module.exports = { SortBy, SortOrder };
