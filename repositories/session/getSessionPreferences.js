"use strict";
var db = require('if-data').db;
var Q = require('q');

function getSessionPreferences(params) {
    var	sql = "SELECT * FROM brand_project_preferences WHERE session_id = ?";
    return Q.nfcall(db.queryOne, sql, [params.session_id]);
}

module.exports = getSessionPreferences;