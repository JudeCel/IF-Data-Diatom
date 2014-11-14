"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

module.exports = function (params) {
    var sql = "SELECT e.id, e.user_id, u.name_first, e.topic_id, e.reply_id, e.cmd, e.tag, e.event, e.created \
        FROM events AS e INNER JOIN users u ON \
        e.user_id = u.id \
        WHERE e.topic_id = ? AND e.deleted IS NULL AND e.cmd = 'vote'";

    if (params.sessionStaffTypeToExclude)
        sql += " AND u.id NOT IN (SELECT DISTINCT user_id \
                    FROM session_staff WHERE deleted IS NULL \
                    AND type_id = " + params.sessionStaffTypeToExclude + ")";

    sql += " ORDER BY e.reply_id, e.created ASC";

    return Q.nfcall(db.query, sql, [params.topic_id]);
}