"use strict";
var db = require('../..').db;
var Q = require('q');
var _ = require('lodash');

function createAccount(params){
    return Q.nfcall(db.insert, "account", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'modified')
    });
}

module.exports = createAccount;