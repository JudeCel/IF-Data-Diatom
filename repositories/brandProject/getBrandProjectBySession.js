"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function GetEvent(params) {
	var sql = "SELECT\
    brand_projects.max_sessions,\
        brand_projects.name,\
        brand_projects.start_date,\
        brand_projects.end_date,\
        brand_projects.id as brand_project_id,\
        client_companies.name AS CompanyName,\
        brand_projects.created,\
        brand_projects.updated,\
        brand_projects.client_company_id\
    FROM\
    brand_projects\
    INNER JOIN client_companies ON (brand_projects.client_company_id = client_companies.id)\
        WHERE client_company_id = ?\
    AND brand_projects.id IN(" +
        "SELECT " +
        "bp.id " +
        "FROM " +
        "brand_projects AS `bp` " +
        "INNER JOIN sessions ON (bp.id = sessions.brand_project_id) " +
        "INNER JOIN session_staff AS `staff` ON (staff.session_id = sessions.id) " +
        "WHERE " +
        "bp.client_company_id = ?)";
    sql=sql.concat(" ORDER BY ",params.sidx," ",params.sord, " LIMIT ", params.start ,",", params.limit);
    return Q.nfcall(db.query, sql, [params.companyId,params.companyId]);
}

module.exports = GetEvent;