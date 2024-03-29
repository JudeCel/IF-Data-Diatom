"use strict";
var db = require('if-data').db;
var Q = require('q');

function getSessions(accountId) {
	var	sql = "SELECT \
        s.name, \
        DATE_FORMAT(s.start_time,'%d/%m/%Y') AS start_time, \
        DATE_FORMAT(s.end_time,'%d/%m/%Y') AS end_time, \
        s.updated as modified, \
        s.status_id, \
        u.name_last, \
        u.name_first, \
        s.id AS id, \
        CONCAT(u.name_first, ' ', u.name_last) as facilitator \
    FROM sessions s \
    LEFT JOIN users u ON u.id = s.facilitatorId \
    WHERE s.accountId = ? \
    AND s.deleted IS NULL";

	return Q.nfcall(db.query, sql, [accountId]);
}

module.exports = getSessions;