const express = require('express');
const mysql = require('mysql');
const HttpError = require('./models/http_error');
const studentsRoute = require('./routes/student_route');
const staffRoute = require('./routes/staff_route');
const adminRoute = require('./routes/admin_route');
const commonRoute = require('./routes/common_route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "groupdb",
    password: ""
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use("/student", studentsRoute);
app.use("/staff", staffRoute);
app.use("/admin", adminRoute);
app.use("/common", commonRoute);

app.use((req, res, next) => {
    next(new HttpError(404, "Invalid Route"));
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Something went wrong" });
});

con.connect(err => {
    if (!err) {
        console.log("Database connection established");
        app.listen(5000, () => {
            console.log("Server started");
        })
    } else {
        console.log("Connection Error");
    }
});

exports.con = con;
exports.app = app;