const express = require('express');
const common = require('../controllers/common_controller');
const { check } = require('express-validator');
const authCheck = require('../middlewares/auth-check');
const router = express.Router();


router.post("/login", [
    check("email").not().isEmpty(),
    check("password").isLength(7)
], common.login);

router.use(authCheck);

router.get("/getDiaries", common.getDiaries);

router.post("/setDiaries", [
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], common.setDiaries);

router.patch("/editDiaries", [
    check("diary_id").not().isEmpty(),
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], common.editDiaries);

module.exports = router;