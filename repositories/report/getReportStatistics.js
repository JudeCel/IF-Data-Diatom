"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

module.exports = function (params) {
    var sql = "SELECT e.user_id, \
        COUNT(e.user_id) AS count_user_id, \
        t.id AS topic_id, \
        t.name AS topic_name, \
        u.name_first \
        FROM events AS e INNER JOIN topics AS t ON \
        e.topic_id = t.id \
        INNER JOIN users AS u ON \
        e.user_id = u.id \
        WHERE e.deleted IS NULL AND t.deleted IS NULL AND e.cmd = 'chat' AND t.session_id = ? \
        GROUP BY e.user_id, e.topic_id \
        ORDER BY topic_order_id, e.topic_id, e.user_id";

    return Q.nfcall(db.query, sql, [params.session_id]);
}