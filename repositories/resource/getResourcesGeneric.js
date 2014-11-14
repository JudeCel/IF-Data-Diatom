"use strict";
var db = require('../..').db;
var Q = require('q');

module.exports = function(params) {
    var sql = "SELECT * FROM resources WHERE deleted IS NULL";
    if (params.id)
        sql += " AND id = " + params.id;

    if (params.type_id)
        sql += " AND type_id = " + params.type_id;

    if (params.topic_id)
        sql += " AND topic_id = " + params.topic_id;

    if (params.user_id)
        sql += " AND user_id = " + params.user_id;

    sql += " ORDER BY 1 ASC";

    return Q.nfcall(db.query, sql);
}