"use strict";
var db = require('../..').db;
var Q = require('q');

function getEventsForCollage(params) {
    var sql = "SELECT id, user_id, event  \
                FROM events  \
                WHERE cmd = 'collage' AND topic_id = ? AND deleted IS NULL AND id IN \
                    (SELECT MAX(id)  \
                    FROM events  \
                    WHERE cmd = 'collage' AND topic_id = ? AND deleted IS NULL  \
                    GROUP BY user_id)";

    return Q.nfcall(db.query, sql, [params.topicId, params.topicId]);
}

module.exports = getEventsForCollage;