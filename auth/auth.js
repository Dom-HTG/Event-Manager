const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET;

//Create new token.
const createToken = (userID, email) => {
    const token = jwt.sign({ id: userID, email }, jwtSecret, {expiresIn: '1h'});
    return token;
};

//verify the token.
const verifyToken = (token) => {
   try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
   } catch (err) {
    return new Error({code: 401, msg: "Invalid token", err: err});
   };
};

module.exports = { createToken, verifyToken };

