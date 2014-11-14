var db = require('if-data').db;
var Q = require('q');

function getReportTopics(params) {
    var	sql = "SELECT \
				t.id AS topic_id, \
				t.name, \
				s.name AS session_name, \
				bp.id AS brand_project_id, \
				bp.name AS brand_project_name, \
				ss.user_id AS facilitator_id \
				FROM sessions s \
				JOIN topics t ON t.session_id = s.id \
				LEFT JOIN brand_projects bp ON bp.id = s.brand_project_id \
				LEFT JOIN session_staff ss ON ss.session_id = s.id AND ss.type_id = '2' \
				WHERE s.id = ? \
				ORDER BY t.topic_order_id";

    return Q.nfcall(db.query, sql, [params.session_id]);
}

module.exports = getReportTopics;