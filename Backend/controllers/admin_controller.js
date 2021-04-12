const bcrypt = require('bcrypt');
const Query = require('../Classes/Query');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http_error');
const generator = require('generate-password');


const createStudent = async (req, res, next) => {
    const errors = validationResult(req);
    const dbQuery = new Query();
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const course_id = req.body.course_id;
    const name = req.body.name;
    const surname = req.body.surname;
    const address = req.body.address;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const date_of_birth = req.body.date_of_birth;
    const registration_year = req.body.registration_year;

    let password = generator.generate({
        length: 10,
        numbers: true
    });

    let pass;
    try {
        pass = await bcrypt.hash(password, 10);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }

    const query = "SELECT MAX(student_id) FROM students WHERE course_id = ?";
    let result;
    try {
        result = await dbQuery.query(query,[course_id]);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }

    let num;
    for (const key in result[0]) {
        num = result[0][key];
    }
    ++num;
    const email = name.toLowerCase() + "." + surname.toLowerCase() + num + "woodland.edu.uk";

    const insertQuery = "INSERT INTO students VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        
    try {
        await dbQuery.query(insertQuery,[num, course_id, name, email, pass, surname, address, phone, gender, date_of_birth, registration_year, "Live"]);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    res.status(200).json({ email, password });
}

const editStudentInfo = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    const name = req.body.name;
    const surname = req.body.surname;
    const address = req.body.address;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const date_of_birth = req.body.date_of_birth;
    const registration_year = req.body.registration_year;
    const student_status = req.body.student_status;

    const query = "UPDATE students SET course_id = ?, name = ?, surname = ?, address=?, phone = ?, gender = ?, date_of_birth = ?, registration_year = ?, student_status = ? WHERE student_id = ?";


    sqlObj.con.query(query, [course_id, name, surname, address, phone, gender, date_of_birth, registration_year, student_status, student_id], (err, result) => {
        if (err) {
            return next(new HttpError(500, "Service Error. Please try again."));
        }
        res.status(200).json({ message: "Record updated" });
    })
}

const createStaff = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const name = req.body.name;
    const surname = req.body.surname;
    const address = req.body.address;
    const department = req.body.department;
    const role = req.body.role;
    const date_of_join = req.body.date_of_join;
    const salary = req.body.salary;

    let password = generator.generate({
        length: 10,
        numbers: true
    });

    let pass;
    try {
        pass = await bcrypt.hash(password, 10);
    } catch (error) {
        //ERROR
    }

    const query = "SELECT MAX(staff_id) FROM staff";
    sqlObj.con.query(query, (err, result) => {
        if (err) {
            return next(new HttpError(500, "Service Error. Please try again."));
        }
        let num;
        for (const key in result[0]) {
            num = result[0][key];
        }
        ++num;
        const email = name.toLowerCase() + "." + surname.toLowerCase() + num + "woodland.edu.uk";

        const insertQuery = "INSERT INTO staff VALUES (?,?,?,?,?,?,?,?,?,?)";
        sqlObj.con.query(insertQuery, [num, name, surname, email, address, date_of_join, department, salary, role, pass], (err, result) => {
            if (err) {
                return next(new HttpError(500, "Service Error. Please try again."));
            }
            res.status(200).json({ email, password });
        })
    })
}

const editStaffInfo = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError(422, "Invalid input passed"));
    }
    const staff_id = req.body.staff_id;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const address = req.body.address;
    const course_id = req.body.course_id;
    const role = req.body.role;
    const date_of_join = req.body.date_of_join;
    const salary = req.body.salary;

    const query = "UPDATE staff SET  name = ?, surname = ?,email=?, address=?, course_id=?, role = ?, date_of_join = ?, salary = ? WHERE staff_id = ?";

    sqlObj.con.query(query, [name, surname, email, address, course_id, role, date_of_join, salary, staff_id], (err, result) => {
        if (err) {
            console.log(err);
            return next(new HttpError(500, "Service Error. Please try again."));
        }
        res.status(200).json({ message: "Record updated" });
    })
}

const createCourse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const course_id = req.body.course_id;
    const course_head_staff_id = req.body.course_head_staff_id;
    const course_name = req.body.course_name;
    const start_date = req.body.start_date;

    const query = "INSERT INTO courses values(?,?,?,?)";


}

const deleteCourse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const course_id = req.body.course_id;

    const query = "DELETE FROM courses WHERE course_id = ?";


    sqlObj.con.query(query, [course_id], (err, result) => {
        console.log(err);
        if (!err) {
            res.status(200).json({ message: "Success" });
        } else {
            return next(new HttpError(500, "Service Error. Please try again."));
        }
    })
}

const createModule =async (req, res, next) => {
    const dbQuery = new Query();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const module_id = req.body.module_id;
    const course_id = req.body.course_id;
    const module_level = req.body.module_level;
    const module_name = req.body.module_name;
    const module_credit = req.body.module_credit;
    let ass_1 = req.body.ass_1;
    if(ass_1 ===''){ass_1 = 0};
    let ass_2 = req.body.ass_2;
    if(ass_2 ===''){ass_2 = 0};
    let exam = req.body.exam;
    if(exam ===''){exam = 0};

    const checkQuery = "SELECT module_name FROM modules WHERE module_id = ?";
    let checkResult;
    try {
        checkResult = await dbQuery.query(checkQuery,[module_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    if(checkResult.length>0){
        console.log("Error");
        return next(new HttpError(409, "Course already exists. Try another module id"));
    }
    const query = "INSERT INTO modules values(?,?,?,?,?,?,?,?)";
    try {
        await dbQuery.query(query, [module_id, course_id, module_name, module_credit, module_level, ass_1, ass_2, exam]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    
    res.status(200).json({ message: "Success" });
}

const getAllModules = async (req,res,next)=>{
    const dbQuery = new Query();
    const query = "SELECT * FROM modules";
    let result;
    try {
        result = await dbQuery.query(query,[]);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    res.json(result);
}

const deleteModule = (req, res, next) => {

}



exports.createStudent = createStudent;
exports.editStudentInfo = editStudentInfo;
exports.createStaff = createStaff;
exports.editStaffInfo = editStaffInfo;
exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.createModule = createModule;
exports.getAllModules = getAllModules;
exports.deleteModule = deleteModule;