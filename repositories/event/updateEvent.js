"use strict";
var db = require('../..').db;
var Q = require('q');

function updateEvent(params) {
    return Q.nfcall(db.updateById, "events", params.id, params);
}

module.exports = updateEvent;