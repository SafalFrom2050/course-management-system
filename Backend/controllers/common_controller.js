const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http_error');
const Query = require('../Classes/Query');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const dbQuery = new Query();

    let { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }
    let userType = "student";
    let query = "SELECT * FROM students WHERE email = ?";
    let result;
    try {
        result = await dbQuery.query(query, [email]);
    } catch (error) {
        return next(new HttpError(500, "Service Error. Please try again."));
    }

    if (result.length === 0) {
        query = "SELECT * FROM staff WHERE email = ?";
        try {
            result = await dbQuery.query(query, [email]);
            userType = "staff";
        } catch (error) {
            return next(new HttpError(500, "Service Error. Please try again."));
        }
    }
    if (result.length === 0) {
        return next(new HttpError(404, "Error. User not found"));
    }

    bcrypt.compare(password, result[0].password)
        .then(ans => {
            if (ans) {
                const token = jwt.sign({ user_id: userType === "staff" ? result[0].staff_id : result[0].student_id, email: result[0].email }, "try_and_hack_me_noobs", { expiresIn: '12h' });
                let resObj = { student_id: result[0].student_id, email: result[0].email, name: result[0].name + " " + result[0].surname, gender:result[0].gender, token: token, userType };
                if (userType === "staff") {
                    resObj = { staff_id: result[0].staff_id, email: result[0].email, name: result[0].name, module_id: result[0].module_id, token: token, userType };
                }
                res.json(resObj);
            } else {
                return next(new HttpError(401, "Password didn't match"));
            }
        });
}

const setDiaries = async (req, res, next) => {
    const user_id = req.userData.user_id;
    const userType = req.query.userType;
    const title = req.body.title;
    const body = req.body.body;
    const dbQuery = new Query();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    let query = "INSERT INTO diaries (student_id, title, body) VALUES(?,?,?)";
    if (userType === "staff") {
        query = "INSERT INTO staffDiaries (staff_id, title, body) VALUES(?,?,?)";
    }
    try {
        await dbQuery.query(query, [user_id, title, body]);
    } catch (error) {
        return next(new HttpError(500, err));
    }
    res.status(200).json({ message: "Diary added" });
}

const getDiaries = async (req, res, next) => {
    const dbQuery = new Query();
    let user_id = req.userData.user_id;
    const userType = req.query.userType;
    let query = "SELECT * FROM diaries WHERE student_id = ? ORDER BY date_created DESC";
    if (userType === "staff") {
        query = "SELECT * FROM staffDiaries WHERE staff_id = ? ORDER BY date_created DESC";
    }

    let result = [];
    try {
        result = await dbQuery.query(query, [user_id]);
    } catch (error) {
        return next(new HttpError(500, "Error while creating diaries"));
    }
    res.json(result);
}

const getReadingMaterials = async (req, res, next) => {
    const dbQuery = new Query();
    let user_id = req.userData.user_id;
    const module_id = req.query.module_id;
    let query = "SELECT * FROM module_materials WHERE module_id = ? ORDER BY datetime_added DESC";

    let result = [];
    try {
        result = await dbQuery.query(query, [module_id]);
    } catch (error) {
        return next(new HttpError(500, "Error while creating diaries"));
    }
    res.json(result);
}

const getDiaryById = async (req, res, next) => {
    const dbQuery = new Query();
    let user_id = req.userData.user_id;
    const userType = req.query.userType;
    const diary_id = req.query.diary_id;
    let query = "SELECT * FROM diaries WHERE student_id = ? AND diary_id = ? ORDER BY date_created DESC";
    if (userType === "staff") {
        query = "SELECT * FROM staffDiaries WHERE staff_id = ? AND diary_id = ? ORDER BY date_created DESC";
    }

    let result = [];
    try {
        result = await dbQuery.query(query, [user_id, diary_id]);
    } catch (error) {
        return next(new HttpError(500, "Error while creating diaries"));
    }
    res.json(result);
}

const editDiaries = async (req, res, next) => {
    const user_id = req.userData.user_id;
    const userType =  req.query.userType;
    const diary_id = req.body.diary_id;
    const title = req.body.title;
    const body = req.body.body;
    const dbQuery = new Query();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }


    let query = "UPDATE diaries set title=?, body=? WHERE student_id=? AND diary_id = ?";
    if(userType=="staff"){
        query = "UPDATE staffDiaries set title=?, body=? WHERE staff_id=? AND diary_id = ?";
    }

    try {
        await dbQuery.query(query, [title, body, user_id, diary_id]);
    } catch (error) {
        return next(new HttpError(500, "Error editing diaries.. Try again"));
    }
    res.status(200).json({ message: "Diary Edited" });
}

const deleteDiaries = async (req, res, next) => {
    const userType =  req.query.userType;
    const diary_id = req.query.diary_id;

    const dbQuery = new Query();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }


    let query = "DELETE FROM diaries WHERE diary_id = ?";
    if(userType=="staff"){
        query = "DELETE FROM staffDiaries WHERE diary_id = ?";
    }

    try {
        await dbQuery.query(query, [diary_id]);
    } catch (error) {
        return next(new HttpError(500, "Error deleting diaries.. Try again"));
    }
    res.status(200).json({ message: "Diary deleted" });
}


const getNearestClassTimeForAModule = async (req, res, next) => {
    const module_id = req.query.module_id;

    const daysMap = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };
    const date = new Date();
    const today = date.getDay();
    const time = {
        hour: date.getHours(),
        minute: date.getMinutes(),
    };

    const query = "SELECT modules.module_name , routinemodules.start_time, routines.day FROM modules "+
        "JOIN routinemodules " +
        "JOIN routines " +
        "WHERE routinemodules.routine_id = routines.routine_id AND " +
        "modules.module_id = routinemodules.module_id AND " +
        "modules.module_id = ? " +
        "ORDER BY routinemodules.start_time ASC";
    
    let queryResult;
    const dbQuery = new Query();
    try {
        queryResult = await dbQuery.query(query, module_id);
    } catch (error) {
        return next(new HttpError(500, "Error while getting module nearest start time"));
    }

    for([key, value] of Object.entries(daysMap)){
        queryResult.forEach(data => {
            if(value === data.day){
                if(today==key) data.day = "Today";

                hr = parseInt(data.start_time.split(":")[0]);
                min = parseInt(data.start_time.split(":")[1]);
                if(today<=key && time.hour *60 + time.minute <= hr * 60 + min){
                    res.json(data);
                }
            }
        });
    }
    // res.json(queryResult);
}

const sendMessage = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const user_id = req.userData.user_id;
    const userType = req.body.userType;
    const message = req.body.message;
    const title = req.body.title;
    const dbQuery = new Query();

    let recipient_id = req.body.recipient_id;
    let array;
    if(userType=="student"){
        array=[user_id,recipient_id,message,title, user_id]
    }else{
        array=[recipient_id,user_id,message,title, user_id]
    }
    const query = "INSERT INTO messages(student_id,staff_id,message,title, sent_by) VALUES (?,?,?,?,?)";
    try {
        await dbQuery.query(query,array);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Error while saving messages"));
    }
    res.json({message:"Message sent"});
}

const getPersonalMessages = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(422, "Invalid input passed"));
    }

    const user_id = req.userData.user_id;
    const userType = req.query.userType;
    let recipient_id = req.query.recipient_id;

    let array;
    if(userType=="student"){
        array=[recipient_id,user_id]
    }else{
        array=[user_id,recipient_id]
    }

    const dbQuery = new Query();
    const query = "SELECT message, sent_date, sent_by, title FROM messages WHERE staff_id = ? AND student_id = ? ORDER BY sent_date ASC LIMIT 10";
    let result;
    try {
        result = await dbQuery.query(query,array);
    } catch (error) {
        console.log(error);
        return next(new HttpError(500, "Error while getting messages"));
    }
    res.json(result);
}


exports.login = login;
exports.getDiaries = getDiaries;
exports.getReadingMaterials = getReadingMaterials;
exports.getDiaryById = getDiaryById;
exports.setDiaries = setDiaries;
exports.editDiaries = editDiaries;
exports.deleteDiaries = deleteDiaries;
exports.getNearestClassTimeForAModule = getNearestClassTimeForAModule;
exports.sendMessage=sendMessage;
exports.getPersonalMessages = getPersonalMessages;
