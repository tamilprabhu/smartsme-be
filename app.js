const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./config/logger');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const permissionsRouter = require('./routes/permissions');
const actionsRouter = require('./routes/actions');
const buyerRouter = require('./routes/buyer');
const companyRouter = require('./routes/company');
const dispatchRouter = require('./routes/dispatch');
const employeeRouter = require('./routes/employee');
const invoiceRouter = require('./routes/invoice');
const machineRouter = require('./routes/machine');
const orderRouter = require('./routes/order');
const orderQuantityRouter = require('./routes/orderQuantity');
const prodHourlyRouter = require('./routes/prodHourly');
const productRouter = require('./routes/product');
const productionShiftRouter = require('./routes/productionShift');
const sellerRouter = require('./routes/seller');
const stockRouter = require('./routes/stock');
const usersRouter = require('./routes/users');

const app = express();

// Method 1: Allow all origins (completely open - NOT RECOMMENDED for production)
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Custom morgan stream to integrate with Winston
const morganStream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

// Morgan logging with Winston integration
app.use(morgan('combined', { stream: morganStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Log all incoming requests
app.use((req, res, next) => {
    logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    next();
});

// API v1.0.0 routes
app.use('/api/1.0.0/auth', authRouter);
app.use('/api/1.0.0/permissions', permissionsRouter);
app.use('/api/1.0.0/actions', actionsRouter);

app.use('/api/1.0.0/buyer', buyerRouter);
app.use('/api/1.0.0/company', companyRouter);
app.use('/api/1.0.0/dispatch', dispatchRouter);
app.use('/api/1.0.0/employee', employeeRouter);
app.use('/api/1.0.0/invoice', invoiceRouter);
app.use('/api/1.0.0/machine', machineRouter);
app.use('/api/1.0.0/order', orderRouter);
app.use('/api/1.0.0/order-quantity', orderQuantityRouter);
app.use('/api/1.0.0/production-hourly', prodHourlyRouter);
app.use('/api/1.0.0/product', productRouter);
app.use('/api/1.0.0/production-shift', productionShiftRouter);
app.use('/api/1.0.0/seller', sellerRouter);
app.use('/api/1.0.0/stock', stockRouter);
app.use('/api/1.0.0/users', usersRouter);

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    logger.warn('404 Not Found', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // Log the error
    logger.error('Application error', {
        error: err.message,
        status: err.status || 500,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        stack: req.app.get('env') === 'development' ? err.stack : undefined
    });
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Log application startup
logger.info('Express application initialized', {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000
});

module.exports = app;
