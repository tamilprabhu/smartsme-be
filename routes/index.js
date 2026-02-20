const authRouter = require('./auth');
const permissionsRouter = require('./permissions');
const actionsRouter = require('./actions');
const buyerRouter = require('./buyer');
const companyRouter = require('./company');
const companyCreationRouter = require('./companyCreation');
const dispatchRouter = require('./dispatch');
const employeeRouter = require('./employee');
const invoiceRouter = require('./invoice');
const machineRouter = require('./machine');
const orderRouter = require('./order');
const orderQuantityRouter = require('./orderQuantity');
const productRouter = require('./product');
const productionShiftRouter = require('./productionShift');
const sellerRouter = require('./seller');
const stockRouter = require('./stock');
const assetsRouter = require('./assets');
const usersRouter = require('./users');
const roleRouter = require('./role');
const referenceRouter = require('./reference');
const homeRouter = require('./home'); // your existing index route

const API_BASE = '/api/1.0.0';
const API_BASE_V1 = '/api/v1';

const apiRoutes = [
    ['auth', authRouter],
    ['permissions', permissionsRouter],
    ['actions', actionsRouter],
    ['buyer', buyerRouter],
    ['company', companyRouter],
    ['company-creation', companyCreationRouter],
    ['dispatch', dispatchRouter],
    ['employee', employeeRouter],
    ['invoice', invoiceRouter],
    ['machine', machineRouter],
    ['order', orderRouter],
    ['order-quantity', orderQuantityRouter],
    ['product', productRouter],
    ['production-shift', productionShiftRouter],
    ['seller', sellerRouter],
    ['stock', stockRouter],
    ['assets', assetsRouter],
    ['users', usersRouter],
    ['role', roleRouter],
    ['reference', referenceRouter]
];

module.exports = (app) => {
    apiRoutes.forEach(([path, router]) => app.use(`${API_BASE}/${path}`, router));
    app.use(`${API_BASE_V1}/company-registrations`, companyCreationRouter);
    app.use('/', homeRouter);
};
