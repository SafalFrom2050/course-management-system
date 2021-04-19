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
    const dbQuery = new Query();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const name = req.body.name;
    const surname = req.body.surname;
    const address = req.body.address;
    const role = req.body.role;
    const salary = req.body.salary;
    const personalEmail = req.body.personalEmail;
    const course_id = req.body.course_id;
    const module_id = req.body.module_id;
    const staff_id = req.body.staff_id;
    const mode = req.body.mode;

    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let query = "UPDATE staff SET name= ?, surname = ?, personalEmail = ?, course_id = ?, module_id = ?, salary = ?, role = ? WHERE staff_id=?";
    let array = [name,surname,personalEmail,course_id,module_id,salary,role,staff_id];
    let email;
    if(!mode){
        let pass;
        try {
            pass = await bcrypt.hash(password, 10);
        } catch (error) {
            return next(new HttpError(500, "Error while generating password. Try again."));
        }

        const checkQuery = "SELECT COUNT(staff_id) FROM staff WHERE personalEmail = ?";
        let emailResult;
        try {
            emailResult = await dbQuery.query(checkQuery,[personalEmail]);
        } catch (error) {
            return next(new HttpError(500, "Service Error. Please try again."));
        }
        let nums;
        for (const key in emailResult[0]) {
            nums = emailResult[0][key];
        }
        if(nums>0){
            return next(new HttpError(409, "Email already exists. Try another email"));
        }
        const maxquery = "SELECT MAX(staff_id) FROM staff";
        let maxResult;
        try {
            maxResult = await dbQuery.query(maxquery,[]);
        } catch (error) {
            console.log(error);
            return next(new HttpError(500, "Service Error. Please try again."));
        }
        let num;
        for (const key in maxResult[0]) {
            num = maxResult[0][key];
        }
        ++num;
        email = name.toLowerCase() + "." + surname.toLowerCase() + num + "woodland.edu.uk";
        query = "INSERT INTO staff (staff_id, name, surname, email,personalEmail, address,course_id,module_id,salary,role, password) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        array = [num, name, surname, email,personalEmail, address,course_id,module_id, salary, role, pass]
    }
    try {
        await dbQuery.query(query,array);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    if(mode){
        res.json({message:"Tutor info edited"});
        return;
    }
    res.status(200).json({ email, password });
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
    const mode = req.body.mode;
    let ass_1 = req.body.ass_1;
    if(ass_1 ===''){ass_1 = 0};
    let ass_2 = req.body.ass_2;
    if(ass_2 ===''){ass_2 = 0};
    let exam = req.body.exam;
    if(exam ===''){exam = 0};

    let query = "UPDATE modules SET course_id = ?, module_name = ?, module_credit = ?, module_level = ?, ass_1 = ?, ass_2 = ?, exam = ? WHERE module_id = ?";
    let array = [course_id,module_name,module_credit,module_level,ass_1,ass_2,exam,module_id]

    if(!mode){
        query = "INSERT INTO modules values(?,?,?,?,?,?,?,?)";
        array = [module_id, course_id, module_name, module_credit, module_level, ass_1, ass_2, exam];

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
    }
    try {
        await dbQuery.query(query, array);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    
    res.status(200).json({ message: "Success" });
}

const getAllModules = async (req,res,next)=>{
    const dbQuery = new Query();
    const course_id = req.query.course_id;
    const query = "SELECT * FROM modules wHERE course_id = ?";
    let result;
    try {
        result = await dbQuery.query(query,[course_id]);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    res.json(result);
}

const getAllTutors = async (req,res,next)=>{
    const dbQuery = new Query();
    const course_id = req.query.course_id;
    const query = "SELECT * FROM staff WHERE course_id = ?";
    let result;
    try {
        result = await dbQuery.query(query,[course_id]);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Service Error. Please try again."));
    }
    res.json(result);
}

const getAllCourses = async (req,res,next)=>{
    const dbQuery = new Query();
    const query = "SELECT course_id, course_name FROM courses ";
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
exports.getAllTutors = getAllTutors;
exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.createModule = createModule;
exports.getAllModules = getAllModules;
exports.getAllCourses = getAllCourses;
exports.deleteModule = deleteModule;