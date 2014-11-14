"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteEvents(params) {
    var sql = "UPDATE events \
			SET deleted = NOW() \
			WHERE deleted IS NULL \
			AND (tag = 0 OR tag = 16) \
			AND cmd IN ('shareresource', 'object') \
			AND topic_id = ?";

    return Q.nfcall(db.query, sql, [params.topicId]);
}

module.exports = deleteEvents;