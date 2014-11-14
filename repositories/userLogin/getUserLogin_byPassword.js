var db = require('if-data').db;
var Q = require('q');

function getUserLoginRS(params) {
    var sql = "SELECT \
        user_logins.username,user_logins.password,users.name_first,users.name_last,users.id,users.ifs_admin \
        FROM  users\
        INNER JOIN user_logins ON (users.id = user_logins.user_id)\
        WHERE user_logins.username=? AND user_logins.password=?";

    return Q.nfcall(db.queryOne, sql, [params.login, params.password]);
}

module.exports = getUserLoginRS;