"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

module.exports.getFirstEvent = function (params) {
    var sql = "SELECT e.id, e.user_id \
        FROM events AS e \
        WHERE e.cmd = 'shareresource' AND e.topic_id = ? AND e.tag = 0 /*images only*/ \
        UNION \
        SELECT e.id, e.user_id \
        FROM events AS e \
        WHERE e.deleted IS NULL AND e.cmd = 'deleteall' AND e.topic_id = ? \
        ORDER BY id DESC \
        LIMIT 1";

    return Q.nfcall(db.queryOne, sql, [params.topic_id, params.topic_id]);
}

module.exports.getResult = function (params, firstEvent) {
    var sql = "SELECT e.*";
    if (firstEvent)
        sql += ", (SELECT u.name_first FROM users AS u WHERE u.id = " + firstEvent.user_id + ") AS name_first";

    sql += " FROM events AS e WHERE e.deleted IS NULL";

    if (firstEvent)
        sql += " AND e.id >= " + firstEvent.id;

    sql += " AND e.topic_id = ? AND e.cmd in ('object', 'shareresource', 'deleteall') AND e.tag IN (0, 16) ORDER BY e.id ASC";

    return Q.nfcall(db.query, sql, [params.topic_id]);
}