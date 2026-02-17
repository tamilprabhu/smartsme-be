const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const State = sequelize.define(
    "State",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stateName: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'state_name' },
        stateCode: { type: DataTypes.STRING(2), allowNull: false, field: 'state_code' },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'create_date' },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'update_date' },
        isActive: { type: DataTypes.TINYINT, allowNull: false, defaultValue: true, field: 'is_active' },
        isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: false, field: 'is_deleted' },
    },
    {
        tableName: "ref_states",
        timestamps: false,
    }
);

module.exports = State;
