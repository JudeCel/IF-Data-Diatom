var db = require('if-data').db;
var Q = require('q');

function getUser(params) {
    var sql = "SELECT * FROM users WHERE id = ?";
    return Q.nfcall(db.queryOne, sql, [params.user_id]);
}

module.exports = getUser;