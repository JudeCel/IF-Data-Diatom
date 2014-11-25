"use strict";
var db = require('if-data').db;
var Q = require('q');

function getSessions(accountId) {
	var	sql = "SELECT \
        s.name, \
        DATE_FORMAT(s.start_time,'%d/%m/%Y') AS start_time, \
        DATE_FORMAT(s.end_time,'%d/%m/%Y') AS end_time, \
        s.status_id, \
        u.name_last, \
        u.name_first, \
        s.id AS id, \
        CONCAT(u.name_first, ' ', u.name_last) as facilitator \
    FROM sessions s \
    INNER JOIN session_staff ss ON s.id = ss.session_id \
    INNER JOIN users u ON ss.user_id = u.id \
    WHERE s.accountId = ? \
    AND ss.type_id = 2 \
    AND s.deleted IS NULL";
 
	return Q.nfcall(db.query, sql, [accountId]);
}

module.exports = getSessions;