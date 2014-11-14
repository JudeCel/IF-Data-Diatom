var db = require('if-data').db;
var Q = require('q');

function getUserLogin(params) {
    var sql = "SELECT u.*, ul.username \
			FROM users u  \
			JOIN user_logins ul ON ul.user_id = u.id \
			WHERE u.id = ? AND ( u.id IN ( \
				SELECT user_id FROM session_staff WHERE deleted IS NULL AND session_id = ? \
				UNION \
				SELECT user_id FROM participants WHERE deleted IS NULL AND brand_project_id = ?\
                		UNION \
                		SELECT user_id FROM client_users WHERE client_company_id = ? and type_id=1 ) \
                		OR u.ifs_admin=1 )";

    return Q.nfcall(db.queryOne, sql, [params.user_id, params.session_id, params.brand_project_id, params.client_company_id]);
}

module.exports = getUserLogin;
