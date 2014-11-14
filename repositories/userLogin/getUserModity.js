var db = require('if-data').db;
var Q = require('q');


function getUserModity(params) {
    var sql =
    "SELECT \
    session_staff.user_id,\
        client_users.client_company_id,\
        client_companies.start_date,\
        client_companies.end_date\
    FROM\
    user_logins\
    INNER JOIN users ON(user_logins.id = users.user_login_id)\
    INNER JOIN client_users ON(users.id = client_users.user_id)\
    INNER JOIN client_companies ON(client_users.client_company_id = client_companies.id)\
    INNER JOIN session_staff ON(users.id = session_staff.user_id)\
    WHERE\
    session_staff.active = 1\
    AND user_logins.username = ?\
    AND user_logins.password = ?\
    AND session_staff.type_id = '2'"
;
    return Q.nfcall(db.queryOne, sql, [params.login, params.password]);
}

module.exports = getUserModity;