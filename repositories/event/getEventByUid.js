"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function getEventByUid(params) {
    var sql = "SELECT * FROM events WHERE uid = ?";
    return Q.nfcall(db.queryOne, sql, [params.uid]);
}

module.exports = getEventByUid;