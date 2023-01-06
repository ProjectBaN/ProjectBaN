const express = require('express');
const { signUp } = require('../controller/auth');
const router = express.Router();


router.get('/', signUp);

module.exports = router;