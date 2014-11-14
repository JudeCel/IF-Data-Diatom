"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function getEventByReplyId(params) {
    var sql = "SELECT \
			e.user_id, \
			e.topic_id, \
			e.reply_id, \
			e.event, \
			u.name_first AS name \
		FROM events e \
		JOIN users u ON u.id = e.user_id \
		WHERE e.deleted IS NULL \
		AND e.cmd = 'vote' \
		AND e.reply_id = ?";
    return Q.nfcall(db.query, sql, [params.reply_id]);
}

module.exports = getEventByReplyId;