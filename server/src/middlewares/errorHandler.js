// /server/src/middlewares/errorHandler.js

/**
 * Error handling middleware for Express applications.
 * This middleware captures errors thrown in the application and sends a structured response.
 */

const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(`[Error] ${err.message}`, err);

    // Set the status code
    const statusCode = err.status || 500;

    // Prepare the error response
    const errorResponse = {
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development mode
    };

    // Send the error response
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;