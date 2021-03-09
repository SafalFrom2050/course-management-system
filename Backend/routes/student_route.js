const express = require('express');
const student = require('../controllers/student_controller');
const { check } = require('express-validator');
const authCheck = require('../middlewares/auth-check');
const router = express.Router();


router.post("/password", student.generatePass);

//router.use(authCheck); //Activate later

router.get("/modules/:id", student.getCurrentModule);
router.get("/attendance/:id", student.getAttendanceForm);
router.get("/getDiaries/:id", student.getDiaries);

router.post("/setDiaries", [
    check("id").not().isEmpty(),
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], student.setDiaries);

router.post("/submitAttendance", [
    check("student_id").isNumeric(),
    check("attendance_module_id").isNumeric()
], student.submitAttendance);

router.get("/routine/:id", student.getRoutine);

router.get("/assignment", student.getAssignment);

router.get("/getAttendanceStatus/:id", student.getAttendanceStatus);

router.post("/submitAssignment", [
    check("student_id").isNumeric(),
    check("assignment_id").isNumeric(),
    check("content").isLength({ min: 5 })
], student.submitAssignment);

router.patch("/resetPassword", [
    check("email").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength(7),
    check("newPassword").isLength(7)
], student.resetPassword);

module.exports = router; 