const jwt = require('jsonwebtoken');

const HttpError = require('../models/http_error');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            return next(new HttpError(403, 'Authentication failed!. Try again'));
        }
        const decodedToken = jwt.verify(token, 'try_and_hack_me_noobs');
        req.userData = { user_id: decodedToken.user_id };
        next();
    } catch (err) {
        return next(new HttpError(403, 'Authentication failed'));
    }
};
