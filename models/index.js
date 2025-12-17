const sequelize = require("../db/sequelize");
const User = require("./user");
const Role = require("./role");
const Action = require("./action");
const Permission = require("./permission");
const UserRole = require("./userRole");
const RolePermission = require("./rolePermission");
const RoleAction = require("./roleAction");
const Company = require("./company");
const Employee = require("./employee");
const ProductionShift = require("./productionShift");
const Product = require("./product");
const ProdHourly = require("./prodHourly");
const Machine = require("./machine");
const Order = require("./order");
const OrderQuantity = require("./orderQuantity");
const Buyer = require("./buyer");
const Dispatch = require("./dispatch");
const Seller = require("./seller");
const Stock = require("./stock");
const Invoice = require("./invoice");

// Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

Role.belongsToMany(Action, { through: RoleAction, foreignKey: 'roleId' });
Action.belongsToMany(Role, { through: RoleAction, foreignKey: 'actionId' });

Permission.belongsTo(Action, { foreignKey: 'actionId' });
Action.hasMany(Permission, { foreignKey: 'actionId' });

RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' });
RolePermission.belongsTo(Role, { foreignKey: 'roleId' });

RoleAction.belongsTo(Action, { foreignKey: 'actionId' });
RoleAction.belongsTo(Role, { foreignKey: 'roleId' });

// Employee associations
Employee.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Employee, { foreignKey: 'userId' });

Employee.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'companyId' });
Company.hasMany(Employee, { foreignKey: 'companyId', sourceKey: 'companyId' });

module.exports = {
    sequelize,
    User,
    Role,
    Action,
    Permission,
    UserRole,
    RolePermission,
    RoleAction,
    Company,
    Employee,
    ProductionShift,
    Product,
    ProdHourly,
    Machine,
    Order,
    OrderQuantity,
    Buyer,
    Dispatch,
    Seller,
    Stock,
    Invoice,
};
