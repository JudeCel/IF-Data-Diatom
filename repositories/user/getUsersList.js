"use strict";
var db = require('if-data').db;
var Q = require('q');

function getUsersList(accountId) {
	var	sql = "SELECT  id, name_last, name_first, email, phone, mobile \
    FROM users \
    WHERE accountId = ? \
    AND deleted IS NULL";

	return Q.nfcall(db.query, sql, [accountId]);
}

module.exports = getUsersList;