// This is a custom error object used to parse errors.

class customError extends Error { 
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
 }

 module.exports = customError;