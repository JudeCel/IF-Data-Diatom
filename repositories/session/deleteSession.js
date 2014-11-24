"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteSession(params) {
  var sql = "UPDATE sessions SET deleted = NOW() WHERE id = ?";;
    return Q.nfcall(db.query, sql, [params.sessionId]);
}

module.exports = deleteSession;

