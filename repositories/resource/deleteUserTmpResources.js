"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteUserTmpResources(params) {
    var sql = "DELETE FROM resources WHERE type_id = 99 AND user_id = ?";
    return Q.nfcall(db.query, sql, [params.user_id]);
}

module.exports = deleteUserTmpResources;