"use strict";
var db = require('if-data').db;
var Q = require('q');

function getSessionDataForGrid(params) {
	var	sql = "SELECT \
        bp.name AS BPName, \
        s.name, \
        s.start_time, \
        s.end_time, \
        s.status_id, \
        s.id As session_id, \
        u.name_last, \
        u.name_first, \
        cc.name AS CompanyName \
    FROM sessions s \
    INNER JOIN brand_projects bp ON s.brand_project_id = bp.id \
    INNER JOIN session_staff ss ON s.id = ss.session_id \
    INNER JOIN users u ON ss.user_id = u.id \
    INNER JOIN client_users cu ON bp.client_company_id = cu.client_company_id \
    INNER JOIN client_companies cc ON cu.client_company_id = cc.id \
    WHERE ss.type_id = 2";

	if( params.companyId != -1 && params.companyId != undefined) {
		sql += " AND cu.client_company_id = ?";
	}

	sql += " GROUP BY s.id";
	
	if(params.limit != undefined)
		sql = sql.concat(params.limit);

	return Q.nfcall(db.query, sql, [params.companyId]);
}

module.exports = getSessionDataForGrid;
