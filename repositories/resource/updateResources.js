"use strict";
var db = require('../..').db;
var Q = require('q');

function updateResources(params) {
    return Q.nfcall(db.updateById, 'resources', params.id, params);
}

module.exports = updateResources;