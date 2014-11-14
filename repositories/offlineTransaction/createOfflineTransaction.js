var _ = require('lodash');
var db = require('if-data').db;
var Q = require('q');

function createOfflineTransaction(params){
    return Q.nfcall(db.insert, "offline_transactions", params).then(function () {
        return _.omit(params, 'insertId', 'created', 'modified')
    });
}

module.exports = createOfflineTransaction;