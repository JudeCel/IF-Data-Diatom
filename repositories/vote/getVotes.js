"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function GetVotes(event_id) {
	var sql = "SELECT id, count \
		FROM votes \
		WHERE event_id = ?";
	return Q.nfcall(db.queryOne, sql, [event_id]);
}

module.exports = GetVotes;
