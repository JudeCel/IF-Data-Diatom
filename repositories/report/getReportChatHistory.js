"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

module.exports = function (params) {

    /*var sql = "SELECT e.id, e.user_id, u.name_first, e.topic_id, e.reply_id, e.cmd, e.tag, e.event \
    FROM EVENTS AS e INNER JOIN users u ON \
    e.user_id = u.id \
    INNER JOIN topics t ON \
    e.topic_id = t.id \
    INNER JOIN sessions s ON \
    t.session_id = s.id \
    INNER JOIN (SELECT sub_e.id, sub_e.reply_id, sub_e.created, IF(sub_e.reply_id IS NULL, sub_e.id, sub_e.reply_id) AS t FROM EVENTS sub_e GROUP BY t, sub_e.id) grp \
    ON e.id = grp.id \
    WHERE t.id = ? \
    AND e.deleted IS NULL \
    AND e.cmd = 'chat'";
    */
    var sql = "SELECT id, user_id, name_first, topic_id, reply_id, cmd, tag, n.event from \
        \
    (SELECT e.id, e.user_id, u.name_first, e.topic_id, e.reply_id, e.cmd, e.tag, e.event, grp.t as grp_t, grp.id as grp_id \
        FROM events AS e INNER JOIN users u ON \
    e.user_id = u.id \
    INNER JOIN topics t ON \
    e.topic_id = t.id \
    INNER JOIN sessions s ON \
    t.session_id = s.id \
    INNER JOIN (SELECT sub_e.id, sub_e.reply_id, sub_e.created, IF(sub_e.reply_id IS NULL, sub_e.id, sub_e.reply_id) AS t \
    FROM events sub_e GROUP BY t, sub_e.id) grp \
    ON e.id = grp.id \
    WHERE t.id = ? \
    AND e.deleted IS NULL \
    AND e.cmd = 'chat'";

    if (params.starsOnly)
        sql += " AND e.tag = 1 ";
    if (params.sessionStaffTypeToExclude)
        sql += " AND u.id NOT IN (SELECT DISTINCT user_id FROM session_staff WHERE deleted IS NULL AND type_id = " + params.sessionStaffTypeToExclude + ")";

    //sql += " ORDER BY grp.t, grp.id ASC";
    sql += "\
    UNION \
    \
    SELECT 0 as id, 0 as user_id, 'Description' as name_first, t.id as topic_id, null as reply_id, 'chat' as cmd, 0 as tag, t.description as event, grp.t as grp_t, grp.id as grp_id \
    FROM topics t INNER JOIN (SELECT 0 as t, 0 as id ) grp ON grp.id=0 \
    where t.id = ? \
    )	n \
    \
    ORDER BY grp_t, grp_id ASC";


    return Q.nfcall(db.query, sql, [params.topic_id, params.topic_id]);
}
