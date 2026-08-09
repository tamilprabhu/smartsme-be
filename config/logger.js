// logger.js
require('newrelic');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const newrelicFormatter = require('@newrelic/winston-enricher')(winston);
const { getRequestId } = require('../middlewares/requestContext');

const isProd = process.env.NODE_ENV === 'production';
const logDirectory = process.env.LOG_DIR || 'logs';

/**
 * Custom Winston format that reads the requestId from AsyncLocalStorage
 * and injects it into every log entry automatically.
 *
 * Because this runs inside Winston's format pipeline on every log call,
 * no service, agent, or repository needs to be changed - the requestId
 * flows through the entire async call chain transparently.
 *
 * Entries produced outside a request context (startup, background jobs)
 * simply omit the field rather than setting it to undefined.
 */
const requestIdFormat = winston.format((info) => {
    const requestId = getRequestId();
    if (requestId) {
        info.requestId = requestId;
    }
    return info;
});

function createDevFormat() {
    return winston.format.combine(
        requestIdFormat(),
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf(
            ({ level, message, timestamp, stack, requestId, logType, ...meta }) => {
                const logTypeStr = logType ? ` [${logType}]` : '';
                const reqIdStr = requestId ? ` [${requestId}]` : '';
                const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
                const stackString = stack ? `\n${stack}` : '';
                return `${timestamp} ${level}:${logTypeStr}${reqIdStr} ${message}${metaString}${stackString}`;
            },
        ),
    );
}

function createProdFormat({ enrichNewRelic = false } = {}) {
    const formats = [
        requestIdFormat(),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
    ];

    if (enrichNewRelic) {
        formats.push(newrelicFormatter());
    }

    formats.push(winston.format.json());

    return winston.format.combine(...formats);
}

function createRotatingFileTransport(logName) {
    return new DailyRotateFile({
        filename: `${logDirectory}/${logName}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: process.env.LOG_MAX_SIZE || '20m',
        maxFiles: process.env.LOG_RETENTION || '14d',
        zippedArchive: true,
    });
}

function createTransports(logName) {
    return isProd ? [createRotatingFileTransport(logName)] : [new winston.transports.Console()];
}

const logger = winston.createLogger({
    level: process.env.APP_LOG_LEVEL || process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
    defaultMeta: { logType: 'application' },
    format: isProd ? createProdFormat({ enrichNewRelic: true }) : createDevFormat(),
    transports: createTransports('app'),
});

const accessLogger = winston.createLogger({
    level: process.env.ACCESS_LOG_LEVEL || 'http',
    defaultMeta: { logType: 'access' },
    format: isProd ? createProdFormat() : createDevFormat(),
    transports: createTransports('access'),
});

module.exports = logger;
module.exports.appLogger = logger;
module.exports.accessLogger = accessLogger;
