"use strict";
var ifData = require('../..'), db = ifData.db;

function EmailExists(params, cb) {
	if (!params.email) return cb(null, false);

	var sql = "SELECT \
			COUNT(u.id) > 0 inUse \
		FROM users u \
		WHERE u.email = ?";

	db.queryOne(sql, params.email, function(err, res) {
		if(err) return cb(err);
		if(!res || !res.inUse) return cb(err, false);
		return cb(null, true);
	});
}
module.exports = EmailExists;
