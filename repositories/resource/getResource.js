"use strict";
var db = require('../..').db;
var Q = require('q');

function getResource(params) {
    var sql = "SELECT id, JSON FROM resources WHERE id = ?";
    return Q.nfcall(db.queryOne, sql, [params.id]);
}

module.exports = getResource;