var db = require('if-data').db;
var Q = require('q');
var _ = require('lodash');

function getSession(params) {
    var sql = "SELECT * FROM sessions WHERE id = ?";
     return Q.nfcall(db.queryOne, sql, [params.sessionId]).then(function (data) {
        return _.omit(data, 'id', 'created', 'updated')
    });
}

module.exports = getSession;