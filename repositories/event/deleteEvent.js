"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteEvent(params) {
    var sql = "UPDATE events SET deleted = NOW() WHERE";

    if (params.event_id)
        sql += " id = " + params.event_id;

    if (params.uid)
        sql += " uid = '" + params.uid + "'";

    return Q.nfcall(db.query, sql);
}

module.exports = deleteEvent;