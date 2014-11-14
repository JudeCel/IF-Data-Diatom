var db = require('if-data').db;
var Q = require('q');


function getUserAdminity(params) {
    var sql = "SELECT \
    u.id AS `user_id`,\
    cu.client_company_id,\
        cc.start_date,\
        cc.end_date\
    FROM\
    user_logins ul\
    INNER JOIN users u ON ul.id = u.user_login_id\
    INNER JOIN client_users cu ON ul.user_id = cu.user_id\
    INNER JOIN client_companies cc ON cu.client_company_id = cc.id\
    WHERE\
    ul.username = ?\
    AND ul.password = ?\
    AND cu.active = 1\
    AND cu.type_id = '1'";
    return Q.nfcall(db.queryOne, sql, [params.login, params.password]);
}

module.exports = getUserAdminity;