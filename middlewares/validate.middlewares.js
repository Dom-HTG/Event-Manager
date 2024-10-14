//This is a middleware function to handle validation of user input.
const { ZodError } = require('zod');

function validateInput (schema) {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const zodErrors = error.errors.map(err => ({
                    message: err.message,
                }));
                res.status(400).json({ validationError: zodErrors }); //returning 400_BAD_REQUEST_ERROR
            } else {
                res.status(500).json({ error: "Internal Server Error" }); //returning 500_INTERNAL_SERVER_ERROR
            }
        }
    }
};

module.exports = validateInput;