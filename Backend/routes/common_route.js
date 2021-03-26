const express = require('express');
const common = require('../controllers/common_controller');
const { check,query } = require('express-validator');
const authCheck = require('../middlewares/auth-check');
const router = express.Router();


router.post("/login", [
    check("email").not().isEmpty(),
    check("password").isLength(7)
], common.login);

router.use(authCheck);

router.get("/getDiaries", common.getDiaries);
router.get("/getDiaryById", common.getDiaryById);


router.get("/modules/getNearestClassTime", common.getNearestClassTimeForAModule);

router.post("/setDiaries", [
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], common.setDiaries);

router.patch("/editDiaries", [
    check("diary_id").not().isEmpty(),
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], common.editDiaries);

router.delete("/deleteDiaries", [
    check("diary_id").not().isEmpty(),
], common.deleteDiaries);

router.post("/sendMessage",[check("userType").isLength({min:4}),
check("message").isLength({min:1}),check("recipient_id").isNumeric()],common.sendMessage);

router.get("/getPersonalMessages",[query("userType").not().isEmpty(),
query("recipient_id").isNumeric()],common.getPersonalMessages);

module.exports = router;