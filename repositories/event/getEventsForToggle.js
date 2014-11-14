"use strict";
var db = require('../..').db;
var Q = require('q');

function getEventsForToggle(params) {
    var sql = "SELECT event \
        FROM events \
        WHERE id = (SELECT MAX(id) FROM events WHERE tag = 32 AND topic_id = ? AND deleted IS NULL)";

    return Q.nfcall(db.query, sql, [params.topicId]);
}

module.exports = getEventsForToggle;