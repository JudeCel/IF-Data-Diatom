"use strict";
var db = require('../..').db;
var Q = require('q');

function getAvatarInfo(params) {
    var sql = "SELECT \
            (SELECT id FROM participants WHERE user_id = ? ) AS current_participant_id, \
            (SELECT participant_colour_lookup_id FROM participant_lists WHERE participant_id = current_participant_id AND session_id =  ?) AS participant_colour_lookup_id, \
            (SELECT colour FROM participant_colour_lookup WHERE id = participant_colour_lookup_id) AS colour, \
            name_first, \
            gender, \
            avatar_info \
            FROM users \
            WHERE deleted IS NULL AND id = ?";
    return Q.nfcall(db.query, sql, [params.userId, params.sessionId, params.userId]);
}

module.exports = getAvatarInfo;