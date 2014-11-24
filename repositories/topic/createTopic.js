var _ = require('lodash');
var db = require('if-data').db;
var Q = require('q');

function createTopic(params) {
    return Q.nfcall(db.insert, "topics", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'updated')
    });
}

module.exports = createTopic;