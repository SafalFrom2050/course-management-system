const Query = require('../Classes/Query');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http_error');

const addAssignment =async (req, res, next) => {
    const errors = validationResult(req);
    const dbQuery = new Query();
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const module_id = req.body.module_id;
    const title = req.body.title;
    const content = req.body.content;
    const semester = req.body.semester;
    const deadline = req.body.deadline;

    const query = "INSERT INTO assignments (module_id,title,content,semester,deadline) VALUES (?,?,?,?,?)";
    try {
        await dbQuery.query(query, [module_id,title, content, semester, deadline]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    res.status(200).json({ message: "Assignment added" });
}

const getAllAssignments =async (req,res,next)=>{
    const errors = validationResult(req.query);
    const module_id = req.query.module_id;
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    const dbQuery = new Query();
    const query = "SELECT m.module_name, a.assignment_id, a.title, a.deadline, a.content, a.semester FROM assignments a INNER JOIN modules m ON a.module_id = m.module_id WHERE m.module_id = ?";
    let result;
    try {
       result = await dbQuery.query(query,[module_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Server error while fetching submissions"));
    }
    res.json(result);
}

const getAllModules =async (req,res,next)=>{
    const staff_id = req.userData.user_id;
    
    const dbQuery = new Query();
    const query = "SELECT modules.* FROM modules "+
    "JOIN staff "+
    "WHERE modules.module_id = staff.module_id AND "+ 
    "staff.staff_id = ? ";
    let result;
    try {
       result = await dbQuery.query(query,[staff_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Server error while fetching submissions"));
    }
    res.json(result);
}

const getSubmissionCount = async (req,res,next)=>{
    const errors = validationResult(req.query);
    const assignment_id = req.query.assignment_id;
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    const dbQuery = new Query();
    const query = "SELECT COUNT(*) FROM submissions WHERE assignment_id = ?";
    let result;
    try {
       result = await dbQuery.query(query,[assignment_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Server error while fetching submissions"));
    }
    let count;
    for (const key in result[0]) {
        count = result[0][key];
    }
    res.json(count);
}

const getSubmissions = async (req,res,next)=>{
    const errors = validationResult(req.query);
    const assignment_id = req.query.assignment_id;
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    const dbQuery = new Query();
    const query = "SELECT su.title, su.content, s.semester, su.submission_date, s.name, s.surname FROM submissions su INNER JOIN students s ON su.student_id = s.student_id WHERE su.assignment_id = ?";
    try {
        result = await dbQuery.query(query,[assignment_id]);
     } catch (error) {
         console.log(error);
         return next(new HttpError(500, "Server error while fetching submissions"));
     }
     res.json(result);
}


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
        return next(new HttpError(500, "Service Error. Please try again."));
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

const getAllAssignedStudents =async (req,res,next)=>{
    const staff_id = req.userData.user_id;
    const dbQuery = new Query();
    const query = "SELECT course_id, semester FROM personaltutor WHERE staff_id = ?";

    let result;
    try {
        result = await dbQuery.query(query,staff_id);
    } catch (error) {
        return next(new HttpError(500, "System error. Please try again."));
    }
    const newQuery = "SELECT student_id, name, surname,registration_year FROM students WHERE course_id = ?";
    let newResult;
    try {
        newResult = await dbQuery.query(newQuery,result[0].course_id);
    } catch (error) {
        return next(new HttpError(500, "System error. Please try again."));
    }
    const maxDateQuery = "SELECT sent_date, message FROM `messages` WHERE staff_id = ? AND student_id = ? ORDER BY sent_date DESC LIMIT 1; ";
    const finalResult = await Promise.all( newResult.map( async item=>{
        const date = await dbQuery.query(maxDateQuery,[staff_id,item.student_id]);
        item.lastConvo = date[0].sent_date;
        item.lastMessage = date[0].message
        item.semester = await getCurrentYear(item.registration_year);
        item.student_id
        return item;
    }))
    res.json(finalResult);
}

const getStudentInfo = async (req, res, next) => {
    const student_id = req.query.student_id;
    const dbQuery = new Query();

    const query = "SELECT name, surname, email FROM students WHERE student_id = ?";
    let result;
    try {
        result = await dbQuery.query(query,[student_id]);
    } catch (error) {
        return next(new HttpError(500, "System error. Please try again."));
    }
     res.json(result);

}

const addMaterial =async (req,res,next)=>{
    const dbQuery = new Query();
    const module_id = req.body.module_id;
    const title = req.body.title;
    const content = req.body.content;

    const query = "INSERT INTO module_materials (module_id,title,body,datetime_added) VALUES  (?,?,?,?)";
    try {
        await dbQuery.query(query,[module_id,title,content,new Date()]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "System error. Please try again."));
    }
    res.json({message:"Material added"});
}

const gradeAssignment = async (req,res,next)=>{
    const dbQuery = new Query();
    const module_id = req.body.module_id;
    const student_id = req.body.student_id;
    const semester = req.body.semester;
    const feedback = req.body.feedback;
    const rank = req.body.rank;

    const checkQuery = 'SELECT COUNT(*) FROM grades WHERE student_id = ? AND module_id = ? AND semester = ?';
    let result;
    try {
        result =await dbQuery.query(checkQuery,[student_id,module_id,semester]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "System error. Please try again."));
    }
    let query;
    let params = [];
    if(Object.values(result[0])[0]===0){
        query = "INSERT INTO grades (student_id,module_id,semester,feedback,rank,isPublished) VALUES (?,?,?,?,?,?)";
        params = [student_id,module_id,semester,feedback,rank === null?"Z":rank,rank === null?0:1];
    }else{
        query = "UPDATE grades SET feedback = ?, rank=?, isPublished = ? WHERE student_id = ? AND module_id = ? AND semester = ?";
        params = [feedback,rank === null?"Z":rank,rank === null?0:1,student_id,module_id,semester];
    }
    try {
        await dbQuery.query(query,params);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "System error. Please try again."));
    }
    res.json({message:"Grades added"});
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



exports.addAssignment = addAssignment;
exports.activateAttendance = activateAttendance;
exports.deactivateAttendance = deactivateAttendance;
exports.getModuleName = getModuleName;
exports.getAllAttendanceRecords = getAllAttendanceRecords;
exports.getAllPresentStudents = getAllPresentStudents;
exports.getAllAssignments = getAllAssignments;
exports.getSubmissions = getSubmissions;
exports.getSubmissionCount = getSubmissionCount;
exports.getRoutine = getRoutine;
exports.getAllAssignedStudents = getAllAssignedStudents;
exports.getAllModules = getAllModules;
exports.getStudentInfo = getStudentInfo;
exports.addMaterial = addMaterial;
exports.gradeAssignment = gradeAssignment;
