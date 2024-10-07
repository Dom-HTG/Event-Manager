const express = require('express')
const auth = require('../controllers/auth.controllers');

const router = express.Router();

router.post('/login', auth.Login); //Login user.
router.post('/register', auth.Register); //Register user.

module.exports = router;