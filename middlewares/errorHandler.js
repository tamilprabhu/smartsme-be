const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        logger.warn('Validation error', { 
            requestId: req.requestId,
            username: req.auth?.username,
            errors: err.errors 
        });
        
        const errors = Object.entries(err.errors).flatMap(([field, messages]) =>
            messages.map(message => ({ field, message }))
        );
        
        return res.status(400).json({ 
            status: 400,
            message: 'Validation failed',
            errors
        });
    }
    
    // Handle all other errors with 500
    logger.error('Internal server error', {
        requestId: req.requestId,
        username: req.auth?.username,
        error: err.message,
        stack: err.stack
    });
    
    res.status(500).json({
        status: 500,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

module.exports = errorHandler;
