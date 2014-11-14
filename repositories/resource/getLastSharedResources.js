"use strict";
var db = require('../..').db;
var Q = require('q');

function getLastSharedResources(params) {
    var sql = "SELECT e1.* \
            FROM events e1 LEFT JOIN events e2 \
            ON (e1.cmd = e2.cmd AND e1.tag = e2.tag AND e1.topic_id = e2.topic_id AND e1.id < e2.id ) \
            WHERE e2.id IS NULL AND \
            e1.deleted IS NULL AND \
            e1.tag != 0 AND /*NOT interested IN images, buildChatHistory.js will take care of them*/ \
            e1.cmd = 'shareresource' AND \
            e1.topic_id = ? \
            order by updated";

    return Q.nfcall(db.query, sql, [params.topicId]);
}

module.exports = getLastSharedResources;
