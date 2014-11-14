"use strict";
var db = require('../..').db;
var Q = require('q');

function updateUser(params) {
    return Q.nfcall(db.updateById, "users", params.id, params);
}

module.exports = updateUser;