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
        throw new HttpError(422, "Invalid input passed");
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
                const token = jwt.sign({ student_id: result[0].student_id, email: result[0].email }, "try_and_hack_me_noobs", { expiresIn: '1h' });
                let resObj = { student_id: result[0].student_id, email: result[0].email, name: result[0].name, token: token, userType };
                if (userType === "staff") {
                    resObj = { staff_id: result[0].staff_id, email: result[0].email, name: result[0].name, module_id: result[0].module_id, token: token, userType };
                }
                res.json(resObj);
            } else {
                return next(new HttpError(401, "Password didn't match"));
            }
        });
}

exports.login = login;