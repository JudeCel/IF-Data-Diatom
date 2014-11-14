"use strict";
var mtypes = require('if-common').mtypes;
var db = require('../..').db;
var Q = require('q');

function getResources(params) {
    var sql = "SELECT r.id";

    switch (params.resource_type) {
        case mtypes.resourceType.image:
        case mtypes.resourceType.audio:
        case mtypes.resourceType.video:
        case mtypes.resourceType.vote:
        case mtypes.resourceType.report:
        case mtypes.resourceType.help: //???
            sql += ", r.JSON AS jSON";
            break;
    }

    sql += " FROM \
				resources r \
				JOIN resource_types rt ON rt.id = r.type_id \
				WHERE r.deleted IS NULL \
				AND	rt.id = ? \
				AND r.topic_id = ? \
				AND	r.user_id = ?";

    return Q.nfcall(db.query, sql, [params.resource_type, params.topic_id, params.user_id]);
}

module.exports = getResources;