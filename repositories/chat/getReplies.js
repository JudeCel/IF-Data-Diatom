"use strict";
var db = require('../..').db;
var Q = require('q');

function getReplies(params) {
    var sql = "SELECT id, topic_id FROM events WHERE reply_id = ?";
    return Q.nfcall(db.query, sql, [params.eventId]);
}

module.exports = getReplies;