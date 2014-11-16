var db = require('if-data').db;
var Q = require('q');

function getGalleryTopics(params) {
    var sql = "SELECT \
				t.id, \
				t.name \
			FROM topics t \
			WHERE t.deleted IS NULL \
			ORDER BY t.name DESC";

    return Q.nfcall(db.query, sql);
}

module.exports = getGalleryTopics;