"use strict";
var db = require('../../').db;
var Q = require('q');

function updateTopic(params) {
    return Q.nfcall(db.updateById, 'topics', params.id, params);
}

module.exports = updateTopic;