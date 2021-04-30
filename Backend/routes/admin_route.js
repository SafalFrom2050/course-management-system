const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const admin = require('../controllers/admin_controller');

//Student endpoints
router.post("/createStudent", [
    check("course_id").isNumeric(),
    check("name").isLength({ min: 1 }),
    check("surname").isLength({ min: 1 }),
    check("address").isLength({ min: 1 }),
    check("phone").isLength({ min: 1 }),
    check("gender").not().isEmpty(),
    check("date_of_birth").not().isEmpty(),
    check("registration_year").not().isEmpty()
], admin.createStudent);

router.post("/editStudentInfo", [
    check("student_id").not().isEmpty(),
    check("course_id").isNumeric(),
    check("name").isLength({ min: 1 }),
    check("surname").isLength({ min: 1 }),
    check("address").isLength({ min: 1 }),
    check("phone").isLength({ min: 1 }),
    check("gender").not().isEmpty(),
    check("date_of_birth").not().isEmpty(),
    check("registration_year").not().isEmpty(),
    check("student_status").not().isEmpty()
], admin.editStudentInfo);

router.post("/createStaff", [
    check("name").isLength({ min: 1 }),
    check("surname").isLength({ min: 1 }),
    check("address").isLength({ min: 1 }),
    check("role").isLength({ min: 5 }),
    check("salary").isNumeric()
], admin.createStaff);


router.post("/createCourse", [
    check("course_id").isNumeric(),
    check("course_head_staff_id").isNumeric(),
    check("course_name").isLength({ min: 1 }),
    check("start_date").not().isEmpty(),
], admin.createCourse);

router.post("/deleteCourse", [
    check("course_id").isNumeric(),
], admin.deleteCourse);

router.post("/createModule", [
    check("module_id").isNumeric(),
    check("course_id").isNumeric(),
    check("module_level").isNumeric(),
    check("module_name").isLength({ min: 1 }),
    check("module_credit").isNumeric(),
], admin.createModule);

router.get("/getAllModules",admin.getAllModules);

router.get("/getAllCourses",admin.getAllCourses);
router.get("/getAllStudents", [check("course_id").isNumeric()
], admin.getAllStudents);

router.post("/deleteModule", [
    check("module_id").isNumeric(),
], admin.deleteModule);

router.get("/getAllTutors",admin.getAllTutors);

module.exports = router;