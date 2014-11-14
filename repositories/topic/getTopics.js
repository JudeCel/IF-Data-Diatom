var db = require('if-data').db;
var Q = require('q');

function getTopics(params) {
    var sql = "SELECT \
				t.id, \
				t.name, \
				s.name AS session_name, \
				sl.name AS status, \
				IF (t.id = s.active_topic_id, 'true', 'false') AS active_topic, \
				DATE_FORMAT (s.start_time, '%Y-%m-%d %H:%i:%s') AS start_time, \
				DATE_FORMAT (s.end_time, '%Y-%m-%d %H:%i:%s') AS end_time, \
				UNIX_TIMESTAMP(s.start_time) AS start_time_timestamp, \
				UNIX_TIMESTAMP(s.end_time) AS end_time_timestamp \
			FROM topics t \
			JOIN sessions s ON s.id = t.session_id \
			JOIN status_lookup sl ON sl.id = t.topic_status_id \
			WHERE t.deleted IS NULL AND t.session_id = ? \
			ORDER BY t.topic_order_id";

    return Q.nfcall(db.query, sql, [params.session_id]);
}

module.exports = getTopics;