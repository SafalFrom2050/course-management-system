const Query = require('../Classes/Query');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http_error');

const addAssignment = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const module_id = req.body.module_id;
    const content = req.body.content;
    const semester = req.body.semester;
    const deadline = req.body.deadline;

    const query = "INSERT INTO assignments (module_id,content,semester,deadline) VALUES (?,?,?,?)";
    sqlObj.con.query(query, [module_id, content, semester, deadline], (err, result) => {
        if (err) {
            console.log(err);
            throw new HttpError(500, "Service Error. Please try again.");
        }
        res.status(200).json({ message: "Assignment added" });
    })
}

// This function is used to check if an attendance is active or not.
const getModuleName = async (req, res, next) => {
    const module_id = req.query.module_id;
    if (!module_id) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const dbQuery = new Query();

    const query = "SELECT module_name FROM modules WHERE module_id = ?";
    const result = await dbQuery.query(query, [module_id]);
    if (result.length === 0) {
        return next(new HttpError(404, "Module not found"));
    }
    return res.json({ module_name: result[0].module_name });
}

const activateAttendance = async (req, res, next) => {
    console.log("Activate");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    const dbQuery = new Query();

    const module_id = req.body.module_id;
    const attendance_time = req.body.attendance_time;
    const semester = req.body.semester;
    const week = req.body.week;
    const class_type = req.body.class_type;

    const query = "INSERT INTO attendancemodules (module_id,attendance_time,semester,attendance_status,week,class_type)" +
        "VALUES(?,?,?,?,?,?);";
    let resp;
    try {
        resp = await dbQuery.query(query, [module_id, attendance_time, semester, 1, week, class_type]);
    } catch (error) {
        throw new HttpError(500, "Service Error. Please try again.");
    }
    res.status(200).json({ message: "Attendance added", attendance_modules_id: resp.insertId });
}

const deactivateAttendance = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    const dbQuery = new Query();
    const attendance_modules_id = req.body.attendance_modules_id;

    const query = "UPDATE attendancemodules SET attendance_status = 0 WHERE attendance_modules_id = ?";
    try {
        await dbQuery.query(query, [attendance_modules_id]);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    res.status(200).json({ message: "Attendance disabled" });
}

const getAllAttendanceRecords = async (req, res, next) => {
    const module_id = req.query.module_id;
    const isActive = req.query.isActive;
    if (!module_id) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const dbQuery = new Query();

    const query = `SELECT a.attendance_modules_id, m.module_name, a.attendance_time, a.week  FROM attendancemodules a JOIN modules m ON m.module_id = a.module_id WHERE a.attendance_status = ${isActive === "true" ? "1" : "0"} AND m.module_id = ?`;
    let finalRes = [];
    const result = await dbQuery.query(query, [module_id]);

    for (const key in result) {
        const element = result[key];
        const query1 = "SELECT student_id FROM attendances WHERE attendance_module_id = ?";
        const totalStudents = await dbQuery.query(query1, [element.attendance_modules_id]);
        const obj = {
            attendance_modules_id: element.attendance_modules_id,
            module_name: element.module_name,
            attendance_time: element.attendance_time,
            week: element.week,
            totalStudents: totalStudents.length
        }
        finalRes.push(obj);
    }
    res.json(finalRes);
}

const getAllPresentStudents = async (req, res, next) => {
    const attendance_module_id = req.params.attendance_modules_id;
    const dbQuery = new Query();

    const query = "SELECT s.name, s.surname, s.email,  a.attendance_time FROM attendances a INNER JOIN students s ON a.student_id = s.student_id WHERE a.attendance_module_id = ?";
    try {
        const result = await dbQuery.query(query, [attendance_module_id]);
        res.json(result);
    } catch (error) {
        return next(new HttpError(500, "Internal error. Try again later"));
    }
}

const getRoutine = async (req, res, next) => {
    const staff_id = req.userData.user_id;
    const day = req.query.day;
    const dbQuery = new Query();
    const query = "SELECT m.module_name, rm.start_time, rm.end_time, s.name, s.surname, r.class_type FROM routines r INNER JOIN routinemodules rm ON r.routine_id = rm.routine_id INNER JOIN modules m ON rm.module_id = m.module_id INNER JOIN staff s ON s.module_id = m.module_id WHERE r.day = ? AND s.staff_id = ?";
    let result;
    try {
        result = await dbQuery.query(query, [day, staff_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "System error. Please try again."));
    }
    res.json(result);
}


exports.addAssignment = addAssignment;
exports.activateAttendance = activateAttendance;
exports.deactivateAttendance = deactivateAttendance;
exports.getModuleName = getModuleName;
exports.getAllAttendanceRecords = getAllAttendanceRecords;
exports.getAllPresentStudents = getAllPresentStudents;
exports.getRoutine = getRoutine;
