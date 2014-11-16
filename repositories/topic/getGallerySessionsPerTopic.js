var db = require('if-data').db;
var Q = require('q');

function getGalleryTopics(params) {
    var sql = "SELECT \
				s.id, \
				s.name \
			FROM sessions s \
			JOIN topics t \
			WHERE t.deleted IS NULL \
			AND t.id = ? \
			ORDER BY t.name DESC";

    return Q.nfcall(db.query, sql, [params.topic_id]);
}

module.exports = getGalleryTopics;