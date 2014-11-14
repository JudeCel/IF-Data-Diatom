"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteChat(params) {
    var sql = "UPDATE events SET deleted = NOW() WHERE reply_id = ? || id = ?";
    return Q.nfcall(db.query, sql, [params.event_id, params.event_id]);
}

module.exports = deleteChat;
