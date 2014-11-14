"use strict";
var db = require('../..').db;
var Q = require('q');

function getOfflineTransactions(params) {
    var	sql = "SELECT \
				topic_id, \
				message_id \
				FROM offline_transactions \
				WHERE \
				session_id = ? \
				AND reply_user_id = ?";

    return Q.nfcall(db.query, sql, [params.session_id, params.reply_user_id]);
}

module.exports = getOfflineTransactions;