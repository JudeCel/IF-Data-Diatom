var db = require('if-data').db;
var Q = require('q');

function getTopic(params) {
	var sql = "SELECT * FROM topics WHERE id = ?";
	return Q.nfcall(db.queryOne, sql);
}

module.exports = getTopic;