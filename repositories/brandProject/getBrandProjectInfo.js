"use strict";
var db = require('../..').db;
var Q = require('q');

function getBrandProjectInfo(params) {
    var sql = "SELECT *, \
        (SELECT enable_chatroom_logo FROM client_companies WHERE client_companies.id=brand_projects.client_company_id) AS enable_chatroom_logo \
        FROM brand_projects \
        WHERE id IN \
        (SELECT brand_project_id \
        FROM sessions \
        WHERE deleted IS NULL AND id = ?)";

    return Q.nfcall(db.queryOne, sql, [params.sessionId]);
}

module.exports = getBrandProjectInfo;