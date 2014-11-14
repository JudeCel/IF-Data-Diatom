"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

module.exports = function(params) {
    var sql = "SELECT DISTINCT id FROM session_staff WHERE deleted IS NULL";

    if (params.type_id)
        sql += " AND type_id = " + params.type_id;

    if (params.session_id)
        sql += " AND session_id = " + params.session_id;

    sql += " ORDER BY 1 ASC";

    return Q.nfcall(db.query, sql);
}