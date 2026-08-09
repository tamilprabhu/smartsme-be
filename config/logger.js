// logger.js
require('newrelic');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const newrelicFormatter = require('@newrelic/winston-enricher')(winston);
const { getRequestId } = require('../middlewares/requestContext');

const isProd = process.env.NODE_ENV === 'production';

/**
 * Custom Winston format that reads the requestId from AsyncLocalStorage
 * and injects it into every log entry automatically.
 *
 * Because this runs inside Winston's format pipeline on every log call,
 * no service, agent, or repository needs to be changed — the requestId
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

const devFormat = winston.format.combine(
    requestIdFormat(),
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp, stack, requestId, ...meta }) => {
        const reqIdStr = requestId ? ` [${requestId}]` : '';
        const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        const stackString = stack ? `\n${stack}` : '';
        return `${timestamp} ${level}:${reqIdStr} ${message}${metaString}${stackString}`;
    }),
);

const prodFormat = winston.format.combine(
    requestIdFormat(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    newrelicFormatter(),
    winston.format.json(),
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
    format: isProd ? prodFormat : devFormat,
    transports: isProd
        ? [
              new DailyRotateFile({
                  filename: 'logs/app-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                  maxSize: '20m',
                  maxFiles: '14d',
                  zippedArchive: true,
              }),
          ]
        : [new winston.transports.Console()],
});

module.exports = logger;
