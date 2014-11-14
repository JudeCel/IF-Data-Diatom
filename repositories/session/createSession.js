var _ = require('lodash');
var db = require('if-data').db;
var Q = require('q');

function createSession(params) {
    return Q.nfcall(db.insert, "sessions", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'updated')
    });
}

module.exports = createSession;