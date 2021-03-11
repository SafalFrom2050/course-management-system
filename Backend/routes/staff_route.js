const express = require('express');
const { check, query } = require('express-validator');
const router = express.Router();

const staff = require('../controllers/staff_controller');


router.post("/addAssignment", [
    check("module_id").isNumeric(),
    check("content").not().isEmpty(),
    check("semester").isNumeric(),
], staff.addAssignment);

router.post("/activateAttendance", [
    check("module_id").isNumeric(),
    check("attendance_time").not().isEmpty(),
    check("semester").isNumeric(),
    check("week").isNumeric(),
    check("class_type").not().isEmpty()
], staff.activateAttendance);

router.post("/deactivateAttendance", [
    check("attendance_modules_id").isNumeric(),
], staff.deactivateAttendance);

router.get("/getModuleName", staff.getModuleName);

router.get("/getAllAttendanceRecords", staff.getAllAttendanceRecords);

router.get("/getAllPresentStudents/:attendance_modules_id", staff.getAllPresentStudents);

router.get("/routine", [query("day").not().isEmpty()], staff.getRoutine);

module.exports = router;