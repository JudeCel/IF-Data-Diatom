"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function GetEvent(params) {
	var sql = "SELECT\
    client_companies.client_company_logo_thumbnail_url,\
        client_companies.client_company_logo_url\
    FROM\
    client_companies\
    WHERE\
    client_companies.id = ?\
    ";
	return Q.nfcall(db.queryOne, sql, [params.id]);
}

module.exports = GetEvent;