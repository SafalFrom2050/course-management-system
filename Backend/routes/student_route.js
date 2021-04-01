const express = require('express');
const student = require('../controllers/student_controller');
const { check, query } = require('express-validator');
const authCheck = require('../middlewares/auth-check');
const router = express.Router();


router.post("/password", student.generatePass);

router.use(authCheck);

router.get("/modules", student.getCurrentModule);
router.get("/attendance", student.getAttendanceForm);
router.get("/getDiaries/:id", student.getDiaries);


router.post("/setDiaries", [
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], student.setDiaries);

router.patch("/editDiaries", [
    check("diary_id").not().isEmpty(),
    check("title").isLength({ min: 1 }),
    check("body").isLength({ min: 1 }),
], student.setDiaries);

router.post("/submitAttendance", [
    check("attendance_module_id").isNumeric()
], student.submitAttendance);

router.get("/routine", [query("day").not().isEmpty()], student.getRoutine);

router.get("/assignment", student.getAssignment);

router.get("/getAttendanceStatus", student.getAttendanceStatus);

router.post("/submitAssignment", [
    check("assignment_id").isNumeric(),
    check("content").isLength({ min: 5 })
], student.submitAssignment);

router.patch("/resetPassword", [
    check("email").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength(7),
    check("newPassword").isLength(7)
], student.resetPassword);

router.get("/getPersonalTutorDetails",student.getPersonalTutorDetails);

router.get("/getGrades",student.getGrades);


module.exports = router;