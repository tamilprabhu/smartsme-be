const morgan = require('morgan');
const logger = require('../config/logger');

const { accessLogger } = logger;

morgan.token('request-id', (req) => req.requestId || '-');

function emptyToUndefined(value) {
    return value && value !== '-' ? value : undefined;
}

function numberOrUndefined(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
}

function accessLogFormat(tokens, req, res) {
    return JSON.stringify({
        requestId: emptyToUndefined(tokens['request-id'](req, res)),
        http: {
            request: {
                method: tokens.method(req, res),
                url: tokens.url(req, res),
                remoteAddress: emptyToUndefined(tokens['remote-addr'](req, res)),
                referrer: emptyToUndefined(tokens.referrer(req, res)),
                userAgent: emptyToUndefined(tokens['user-agent'](req, res)),
            },
            response: {
                statusCode: numberOrUndefined(tokens.status(req, res)),
                contentLength: numberOrUndefined(tokens.res(req, res, 'content-length')),
                responseTimeMs: numberOrUndefined(tokens['response-time'](req, res)),
            },
        },
    });
}

const accessLogStream = {
    write(message) {
        try {
            accessLogger.http('HTTP access', JSON.parse(message));
        } catch (error) {
            accessLogger.http(message.trim());
        }
    },
};

module.exports = morgan(accessLogFormat, { stream: accessLogStream });
