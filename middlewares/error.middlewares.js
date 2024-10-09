// This is a middleware funtion that will be used as a centralized point for handling all errors thrown.

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({errrorMessage: message});
};

module.exports = { errorHandler };