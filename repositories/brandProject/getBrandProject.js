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
    INNER JOIN client_companies ON (brand_projects.client_company_id = client_companies.id)";
    if((params.companyId!=-1)&&(params.companyId!=undefined))
        sql=sql.concat(" WHERE client_company_id = ?");
    
    if(params.sidx != undefined && params.sord != undefined)
        sql=sql.concat(" ORDER BY ",params.sidx," ",params.sord);
    if(params.start != undefined && params.limit != undefined)
        sql=sql.concat(" LIMIT ", params.start ,",", params.limit);

    return Q.nfcall(db.query, sql, [params.companyId]);
}

module.exports = GetEvent;
