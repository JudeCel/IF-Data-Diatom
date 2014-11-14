"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function GetUserVotes(user_id,topic_id,event_id) {
	var sql = "SELECT \
		vote_id \
		FROM votes_by \
		WHERE user_id = ? \
			AND topic_id = ? \
			AND event_id = ?";
	return Q.nfcall(db.query, sql, [user_id, topic_id,event_id]);
}

module.exports = GetUserVotes;
