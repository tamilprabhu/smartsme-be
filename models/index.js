const sequelize = require("../db/sequelize");
const { attachAuditHooks } = require("../utils/auditHooks");

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
const Machine = require("./machine");
const Order = require("./order");
const OrderQuantity = require("./orderQuantity");
const Buyer = require("./buyer");
const Dispatch = require("./dispatch");
const Seller = require("./seller");
const Stock = require("./stock");
const Asset = require("./asset");
const Invoice = require("./invoice");
const State = require("./state");
const District = require("./district");
const Pincode = require("./pincode");

// Attach audit hooks to models that have audit fields
const modelsWithAudit = [
    User, Company, Employee, Product, Machine, Order, 
    OrderQuantity, Buyer, Dispatch, Seller, Stock, Asset, Invoice, ProductionShift
];

modelsWithAudit.forEach(model => attachAuditHooks(model));

// Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

User.hasMany(UserRole, { foreignKey: 'userId' });
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(UserRole, { foreignKey: 'roleId' });

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

// Production shift associations
ProductionShift.belongsTo(Product, { foreignKey: 'productId', targetKey: 'productId' });
Product.hasMany(ProductionShift, { foreignKey: 'productId', sourceKey: 'productId' });

ProductionShift.belongsTo(Machine, { foreignKey: 'machineId', targetKey: 'machineId' });
Machine.hasMany(ProductionShift, { foreignKey: 'machineId', sourceKey: 'machineId' });

ProductionShift.belongsTo(Order, { foreignKey: 'orderId', targetKey: 'orderId' });
Order.hasMany(ProductionShift, { foreignKey: 'orderId', sourceKey: 'orderId' });

// Reference data associations
District.belongsTo(State, { foreignKey: 'stateId' });
State.hasMany(District, { foreignKey: 'stateId' });

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
    Machine,
    Order,
    OrderQuantity,
    Buyer,
    Dispatch,
    Seller,
    Stock,
    Asset,
    Invoice,
    State,
    District,
    Pincode,
};
