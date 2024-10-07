//This is a middleware to handle Authentication tokens.
const { customError } = require('../errors/errror');
const jwt = require('jsonwebtoken');

const Authenticate = (req, res, next) => {
    //This middleware function extracts the token from the authorization header and verifies it.
    try {
        //Retrieve bearer token.
        const headerToken = req.headers["authorization"];
        const token = headerToken.split(" ")[1];

        //Check if token exists.
        if (!token) {
            throw new customError('Token does not exist', 404);
        };

        //Verify the auth token.
        const jwtSecret = process.env.JWTSECRET;
        const jwtPayload = jwt.verify(token, jwtSecret);
        if (error) {
            throw new customError('Invalid or Expired token', 400);
        };

        //Add the token payload to the request object.
        req.tokenPayload = jwtPayload;
        next();

    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";

        return res.status(statusCode).json({ err: message });
    }
};

module.exports = { Authenticate }; 