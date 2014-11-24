"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteSessionTopics(params) {
  var sql = "UPDATE topics SET deleted = NOW() WHERE  session_id  = ?";
    return Q.nfcall(db.query, sql, [params.sessionId]);
}

module.exports = deleteSessionTopics;

