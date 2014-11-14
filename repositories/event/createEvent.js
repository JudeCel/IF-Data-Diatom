"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');
var _ = require('lodash');

function createEvent(params) {
    return Q.nfcall(db.insert, "events", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'modified')
    });
}

module.exports = createEvent;