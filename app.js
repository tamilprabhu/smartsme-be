require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./config/logger');
const { requestContextMiddleware } = require('./middlewares/requestContext');

const app = express();
const registerRoutes = require('./routes');

// -----------------------------------------------------------------------
// 1. Request context — MUST be the absolute first middleware.
//    Opens an AsyncLocalStorage context so every log call in the entire
//    async chain (routes, services, repositories) automatically gets
//    the requestId without any parameter passing.
// -----------------------------------------------------------------------
app.use(requestContextMiddleware);

app.use(cors());

// -----------------------------------------------------------------------
// 2. HTTP access logging via Morgan.
//    Custom token :request-id reads from req.requestId (set by middleware
//    above) so the access log line is correlated with application logs.
//    Morgan writes to the logger stream — no separate 'Incoming request'
//    middleware needed; Morgan covers every request/response in one line.
// -----------------------------------------------------------------------
morgan.token('request-id', (req) => req.requestId || '-');

const morganStream = {
    write: (message) => logger.info(message.trim()),
};

// Access log format: method  url  status  content-length  response-time
// requestId is injected automatically by the Winston requestIdFormat — no need to repeat it here
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: morganStream,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve smartsme-ionic (Angular) static files
app.use('/web', express.static(path.join(__dirname, 'www/client')));
app.get('/web/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/client/index.html'));
});

// Serve smartsme-admin (React) static files
app.use('/admin', express.static(path.join(__dirname, 'www/admin')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/admin/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

// Register all routes
registerRoutes(app);

// 404 handler
app.use(function (req, res, next) {
    logger.warn('404 Not Found', {
        method: req.method,
        url: req.url,
        ip: req.ip,
    });
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    logger.error('Application error', {
        error: err.message,
        status: err.status || 500,
        method: req.method,
        url: req.url,
        ip: req.ip,
        stack: req.app.get('env') === 'development' ? err.stack : undefined,
    });
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

logger.info('Express application initialized', {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
});

module.exports = app;
