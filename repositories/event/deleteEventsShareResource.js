"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteEventsShareResource(params) {
    var sql = "UPDATE events \
			SET deleted = NOW() \
			WHERE deleted IS NULL \
			AND (tag = 4 OR tag = 2) \
			AND cmd = 'shareresource' \
			AND topic_id = ?";

    return Q.nfcall(db.query, sql, [params.topic_id]);
}

module.exports = deleteEventsShareResource;
