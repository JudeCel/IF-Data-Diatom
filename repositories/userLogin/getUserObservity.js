var db = require('if-data').db;
var Q = require('q');


function getUserObservity(params) {
    var sql = "SELECT \
    session_staff.user_id,\
        client_users.client_company_id,\
        user_logins.id AS `ul_id`,\
    users.user_login_id\
    FROM\
    users\
    INNER JOIN user_logins ON (user_logins.id = users.user_login_id)\
    INNER JOIN client_users ON (client_users.user_id = users.id)\
    INNER JOIN session_staff ON (session_staff.user_id = users.id)\
    WHERE\
    session_staff.active = 1\
    AND user_logins.username = ?\
    AND user_logins.password = ?\
    AND session_staff.type_id = '4'";
    return Q.nfcall(db.queryOne, sql, [params.login, params.password]);
}

module.exports = getUserObservity;