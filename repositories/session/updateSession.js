"use strict";
var db = require('../..').db;
var Q = require('q');

function updateSession(params) {
    return Q.nfcall(db.updateById, "sessions", params.id, params);
}

module.exports = updateSession;