const HttpError = require("../models/http_error");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new HttpError(401, "Authentication failed");
        }
        const decodedToken = jwt.verify(token, "try_and_hack_me_noobs");
        req.userData = { student_id: decodedToken.student_id };
        next();
    } catch (err) {
        err = new HttpError(401, 'Authentication failed');
        return next(err);
    }
}