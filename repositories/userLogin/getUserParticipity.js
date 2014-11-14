var db = require('if-data').db;
var Q = require('q');


function getUserParticipity(params) {
    var sql = "SELECT \
    brand_projects.client_company_id,\
        participants.user_id,\
        brand_projects.id,\
        user_logins.id AS `ul_id`,\
    users.user_login_id\
    FROM\
    brand_projects\
    INNER JOIN participants ON (brand_projects.id = participants.brand_project_id)\
    INNER JOIN users ON (participants.user_id = users.id)\
    INNER JOIN user_logins ON (user_logins.user_id = users.id)\
    WHERE\
    user_logins.username = ?\
    AND user_logins.password = ?";
    return Q.nfcall(db.queryOne, sql, [params.login, params.password]);
}

module.exports = getUserParticipity;