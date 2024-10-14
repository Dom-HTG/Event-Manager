const express = require('express')
const auth = require('../controllers/auth.controllers');
const validate = require('../middlewares/validate.middlewares');
const { LoginSchema, RegisterSchema } = require('../utils/validate');

const router = express.Router();

router.post('/login', validate(LoginSchema), auth.Login); //Login user.
router.post('/register', validate(RegisterSchema), auth.Register); //Register user.

module.exports = router;