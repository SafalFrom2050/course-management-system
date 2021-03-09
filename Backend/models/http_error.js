class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.code = statusCode;
    }
}


module.exports = HttpError;