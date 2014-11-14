var db = require('if-data').db;
var Q = require('q');

function getReport(params) {
    var sql = "SELECT \
				e.id, \
				e.reply_id, \
				e.tag, \
				e.user_id, \
				t.id AS topic_id, \
				t.name AS topic_name, \
				(SELECT name_first FROM users WHERE users.id = e.user_id),\
				e.created, \
				e.event \
			FROM events e \
			JOIN topics t ON t.id = e.topic_id \
			WHERE e.deleted IS NULL \
				AND t.deleted IS NULL \
				AND	t.session_id = ? \
				AND e.cmd = 'chat' \
			ORDER BY created ASC";

    return Q.nfcall(db.query, sql, [params.session_id]);
}

module.exports = getReport;