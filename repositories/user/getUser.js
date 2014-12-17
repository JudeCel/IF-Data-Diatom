var db = require('if-data').db;
var Q = require('q');


function getUser(params) {
    var sql = "SELECT id, name_first, name_last, gender, email, \
     address, phone, mobile, state, country_id, city, code, company \
     FROM users WHERE id = ?";
    return Q.nfcall(db.queryOne, sql, [params.userId]);
}

module.exports = getUser;