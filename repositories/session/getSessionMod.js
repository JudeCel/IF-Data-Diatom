"use strict";
var db = require('if-data').db;
var Q = require('q');

function getSessionMod(params) {
    var	sql = "SELECT\
    session_staff.user_id,\
        session_staff.session_id,\
        users.name_first,\
        users.name_last,\
        users.mobile\
    FROM\
    session_staff\
    INNER JOIN users ON (session_staff.user_id = users.id)\
    WHERE\
    session_staff.session_id= ?\
    and session_staff.type_id = 2";
    return Q.nfcall(db.query, sql, [params.sessionId]);
}

module.exports = getSessionMod;