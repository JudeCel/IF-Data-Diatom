var _ = require('lodash');
var db = require('if-data').db;
var Q = require('q');

function createSessionStaff(params) {
    return Q.nfcall(db.insert, "session_staff", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'updated')
    });
}

module.exports = createSessionStaff;