"use strict";
var db = require('../..').db;
var Q = require('q');
var _ = require('lodash');

function createResource(params){
    return Q.nfcall(db.insert, "resources", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'updated')
    });
}

module.exports = createResource;