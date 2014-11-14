var _ = require('lodash');
var Q = require('q');
var ifData = require('if-data');
var db = ifData.db;

function createLog(params) {
    return Q.nfcall(db.insert, "logs", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'updated')
    });
}

module.exports = createLog;