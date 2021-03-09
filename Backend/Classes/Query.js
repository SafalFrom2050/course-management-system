const con = require('../server');

class Query {
    query(sql, args) {
        return new Promise((resolve, reject) => {
            con.con.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Query;