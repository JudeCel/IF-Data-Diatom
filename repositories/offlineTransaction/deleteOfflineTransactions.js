"use strict";
var db = require('../..').db;
var Q = require('q');

function deleteOfflineTransactions(params){
    var	sql = "DELETE FROM offline_transactions WHERE topic_id = ? AND reply_user_id = ?";
    return Q.nfcall(db.query, sql, [params.topicId, params.replyUserId]);
}

module.exports = deleteOfflineTransactions;