const bcrypt = require('bcrypt');
const sqlObj = require('../server');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http_error');
const Query = require('../Classes/Query');


const resetPassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    const query = "SELECT password FROM students WHERE email = ?";
    sqlObj.con.query(query, [email], async (err, result) => {

        if (err || result.length === 0) {
            return next(new HttpError(500, "No such user found"));
        }
        try {
            await bcrypt.compare(password, result[0].password);
        } catch (error) {
            return next(new HttpError(401, "Password didn't match"));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = "UPDATE students SET password = ? WHERE email = ?";
        sqlObj.con.query(updateQuery, [hashedPassword, email], (err, result) => {
            if (err) {
                return next(new HttpError(500, "Internal error"));
            }
            res.status(200).json({ message: "Password changed" });
        });
    });
}

const getCurrentModule = async (req, res, next) => {
    const student_id = req.params.id;
    const response = await currentModule(student_id, next);
    res.json(response)
}

async function currentModule(student_id, next) {
    const dbQuery = new Query();

    const querySmtp = "SELECT course_id, registration_year FROM students WHERE student_id = ?";
    let smtp;
    try {
        smtp = await dbQuery.query(querySmtp, [student_id]);
    } catch (error) {
        return next(new HttpError(500, "User not found"));
    }
    const sem = parseInt(getCurrentYear(smtp[0].registration_year) / 2);

    const query1 = "SELECT * FROM modules WHERE course_id = ? AND module_level = ?";
    let queryResult;
    try {
        queryResult = await dbQuery.query(query1, [smtp[0].course_id, sem]);
    } catch (error) {
        return next(new HttpError(500, "Error while getting modules"));
    }
    return queryResult;
}

const getAttendanceForm = async (req, res, next) => {
    const dbQuery = new Query();
    const student_id = req.params.id;

    const sem = await getSemester(student_id);
    const query = "SELECT modules.module_name, attendancemodules.attendance_modules_id, attendancemodules.attendance_time, attendancemodules.week FROM attendancemodules JOIN modules ON attendancemodules.module_id = modules.module_id WHERE attendancemodules.attendance_status = 1 AND attendancemodules.semester = ?";
    let attendance;
    try {
        attendance = await dbQuery.query(query, [sem]);
    } catch (error) {
        return next(new HttpError(500, "Error while getting attendance form"));
    }
    if (attendance.length === 0) {
        return res.json([]);
    }
    const checkQuery = "SELECT * FROM attendances WHERE attendance_module_id = ? AND student_id = ?";
    let check;
    try {
        check = await dbQuery.query(checkQuery, [attendance[0].attendance_modules_id, student_id]);
        if (check.length > 0) {
            return res.status(200).json([]);
        }
    } catch (error) {
        return next(new HttpError(500, error.code));
    }
    res.status(200).json(attendance);
}

const submitAttendance = async (req, res, next) => {
    const student_id = req.body.student_id;
    const attendance_module_id = req.body.attendance_module_id;
    const attendance_time = new Date();
    const dbQuery = new Query();

    const check = "SELECT attendance_status FROM attendancemodules WHERE attendance_modules_id = ?";
    let result;
    try {
        result = await dbQuery.query(check, [attendance_module_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "System error. Please try again."));
    }
    if (result[0].attendance_status === 0) {
        res.status(409).json({ message: "Error. Conflict" });
        return;
    }

    const query2 = "INSERT INTO attendances (attendance_module_id, student_id, attendance_time) VALUES (?,?,?)";
    sqlObj.con.query(query2, [attendance_module_id, student_id, attendance_time], (err, result) => {
        if (err) {
            return next(new HttpError(500, err.code));
        }
        res.status(200).json({ message: "Attendance added" })
    });
}

const getRoutine = async (req, res, next) => {
    const student_id = req.query.student_id;
    const day = req.query.day;
    const dbQuery = new Query();

    const sem = await getSemester(student_id);

    const courseQuery = "SELECT course_id FROM students WHERE student_id = ?";
    let response;
    try {
        response = await dbQuery.query(courseQuery, [student_id]);
    } catch (error) {
        return next(new HttpError(500, "System error. Please try again."));
    }

    const query = "SELECT m.module_name, rm.start_time, rm.end_time, s.name, s.surname FROM routines r INNER JOIN routinemodules rm ON r.routine_id = rm.routine_id INNER JOIN modules m ON rm.module_id = m.module_id INNER JOIN staff s ON s.module_id = m.module_id WHERE r.semester = ? AND r.day = ? AND r.course_id = ?";
    let result;
    try {
        result = await dbQuery.query(query, [sem, day, response[0].course_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "System error. Please try again."));
    }
    res.json(result);
}

const getAttendanceStatus = async (req, res, next) => {
    const dbQuery = new Query();
    const student_id = req.params.id;
    const sem = await getSemester(student_id);
    const responseArray = [];
    const modules = await currentModule(student_id, next);

    for (const key in modules) {
        const element = modules[key];
        const obj = {
            module_name: element.module_name,
            attendance_status: new Array(13)
        }
        responseArray.push(obj);
    }
    const statusQuery = "SELECT attendancemodules.week, modules.module_name FROM attendances INNER JOIN attendancemodules ON" +
        " attendances.attendance_module_id = attendancemodules.attendance_modules_id INNER JOIN modules ON attendancemodules.module_id " +
        " = modules.module_id WHERE student_id = ? AND attendancemodules.semester = ? ORDER BY modules.module_name ASC";
    let statusResult;
    try {
        statusResult = await dbQuery.query(statusQuery, [student_id, sem]);
    } catch (error) {
        return next(new HttpError(500, "Error while fetching attendances"));
    }

    for (const key in statusResult) {
        const element = statusResult[key];

        let obj = responseArray.find((item) => {
            return item.module_name === element.module_name;
        })
        obj.attendance_status[element.week] = 1;
    }
    res.json(responseArray);
}


const getDiaries = (req, res, next) => {
    const student_id = req.params.id;
    const query = "SELECT * FROM diaries WHERE student_id = ? ORDER BY date_created DESC";
    sqlObj.con.query(query, [student_id], (err, result) => {
        if (err) {
            return next(new HttpError(500, "Error while creating diaries"));
        }
        if (result.length === 0) {
            return next(new HttpError(404, "No diaries created"));
        }
        res.json(result);
    })
}

const setDiaries = async (req, res, next) => {
    const student_id = req.body.student_id;
    const title = req.body.title;
    const body = req.body.body;
    const dbQuery = new Query();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Invalid input passed");
    }

    const query = "INSERT INTO diaries (student_id, title, body) VALUES(?,?,?)";

    try {
        await dbQuery.query(query, [student_id, title, body]);
    } catch (error) {
        return next(new HttpError(500, err));
    }
    res.status(200).json({ message: "Diary added" });
}

const editDiaries = async (req, res, next) => {
    const student_id = req.body.student_id;
    const diary_id = req.body.diary_id;
    const title = req.body.title;
    const body = req.body.body;
    const dbQuery = new Query();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Invalid input passed");
    }

    const query = "UPDATE diaries set title=?, body=? WHERE student_id=? AND diary_id = ?";

    try {
        await dbQuery.query(query, [title, body, student_id, diary_id]);
    } catch (error) {
        return next(new HttpError(500, err));
    }
    res.status(200).json({ message: "Diary added" });
}

const generatePass = (req, res, next) => {
    const { password } = req.body;

    bcrypt.hash(password, 12).then(hash => {
        res.json(hash);
    });
}

const getAssignment = async (req, res, next) => {
    const module_id = req.query.module_id;
    const student_id = req.query.id;
    const dbQuery = new Query();

    const currentSem = await getSemester(student_id);

    const query = "SELECT * FROM assignments WHERE semester = ?";
    const result = await dbQuery.query(query, [currentSem, module_id]);
    if (result[0].deadline < new Date()) {
        res.status(200).json({});
        return;
    }
    res.status(200).json(result);
}

const submitAssignment = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Invalid input passed");
    }

    const assignment_id = req.body.assignment_id;
    const student_id = req.body.student_id;
    const submission_date = new Date();
    const content = req.body.content;

    const query = "SELECT COUNT(*) FROM submissions WHERE assignment_id = ? AND student_id = ?";
    sqlObj.con.query(query, [assignment_id, student_id], (err, result) => {
        let count;
        for (const key in result[0]) {
            count = result[0][key];
        }
        let query;
        let params = [submission_date, content, assignment_id, student_id];
        if (count > 0) {
            query = "UPDATE submissions SET submission_date = ?, content = ? WHERE assignment_id = ? AND student_id = ?";
        } else {
            query = "INSERT INTO submissions (student_id,assignment_id,submission_date,content) VALUES (?,?,?,?)";
            params = [student_id, assignment_id, submission_date, content];
        }
        sqlObj.con.query(query, params, (err, result) => {
            if (err) {
                return next(new HttpError(500, "Something went wrong while submitting assignments"));
            }
            res.status(200).json({ message: "Assignment submitted" });
        });

    });
}

const getSemester = async (student_id) => {
    const dbQuery = new Query();
    const date = "SELECT registration_year FROM students WHERE student_id = ?";
    let dateResult;
    try {
        dateResult = await dbQuery.query(date, [student_id]);
    } catch (error) {
        return next(new HttpError(500, "Invalid user"));
    }
    const sem = getCurrentYear(dateResult[0].registration_year);
    return Promise.resolve(sem);
}

function getCurrentYear(inputDate) {
    let year = JSON.stringify(inputDate);
    year = year.slice(1, 5);
    const currentYear = new Date().getFullYear();
    let currentSem = (currentYear - parseInt(year)) * 2;
    const currentMonth = ((currentYear - parseInt(year)) * 12) + new Date().getMonth() + 1;
    if (currentSem === 2) { currentSem = 1; }
    if (currentMonth < 6) { --currentSem }
    return currentSem;
}

// For testing
exports.generatePass = generatePass;

exports.getCurrentModule = getCurrentModule;
exports.getAttendanceForm = getAttendanceForm;
exports.submitAttendance = submitAttendance;
exports.getAttendanceStatus = getAttendanceStatus;
exports.getDiaries = getDiaries;
exports.setDiaries = setDiaries;
exports.editDiaries = editDiaries;
exports.getAssignment = getAssignment;
exports.submitAssignment = submitAssignment;
exports.resetPassword = resetPassword;
exports.getRoutine = getRoutine;

