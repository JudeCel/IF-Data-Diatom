"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

// test

function GetEvent(event_id) {
	var sql = "SELECT * FROM events WHERE id = ?";
	return Q.nfcall(db.queryOne, sql, [event_id]);
}

module.exports = GetEvent;