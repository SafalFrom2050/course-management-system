const express = require('express');
const common = require('../controllers/common_controller');
const { check } = require('express-validator');
const authCheck = require('../middlewares/auth-check');
const router = express.Router();


router.post("/login", [
    check("email").not().isEmpty(),
    check("password").isLength(7)
], common.login);

module.exports = router; 