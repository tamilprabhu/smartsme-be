var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('./config/logger');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var permissionsRouter = require('./routes/permissions');
var actionsRouter = require('./routes/actions');
var app = express();

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

app.use('/auth', authRouter);
app.use('/permissions', permissionsRouter);
app.use('/actions', actionsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
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
