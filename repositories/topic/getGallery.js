var db = require('if-data').db;
var Q = require('q');

function getGallery(params) {

	// TBD: need to retrieve gallery from AWS S3
    var sql = "SELECT \
				t.id, \
				t.name \
			FROM topics t \
			WHERE t.deleted IS NULL \
			ORDER BY t.name DESC";

    return Q.nfcall(db.query, sql);
}

module.exports = getGallery;