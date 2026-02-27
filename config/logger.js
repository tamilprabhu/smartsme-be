// logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const isProd = process.env.NODE_ENV === 'production';

const devFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
        const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        const stackString = stack ? `\n${stack}` : '';
        return `${timestamp} ${level}: ${message}${metaString}${stackString}`;
    })
);

const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
    format: isProd ? prodFormat : devFormat,
    transports: isProd
        ? [new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true
        })]
        : [new winston.transports.Console()]
});

module.exports = logger;
