"use strict";
var db = require('if-data').db;
var Q = require('q');

function getSessionDataForGridByUser(params) {
    var	sql = "SELECT\
    brand_projects.name AS BPName,\
        sessions.name,\
        sessions.start_time,\
        sessions.end_time,\
        sessions.status_id,\
        sessions.id As session_id,\
        users.name_last,\
        users.name_first,\
        client_companies.name AS CompanyName,\
        users.mobile,\
        session_staff.user_id,\
        client_companies.name AS CompanyName\
    FROM\
    sessions\
    INNER JOIN brand_projects ON (sessions.brand_project_id = brand_projects.id)\
    INNER JOIN session_staff ON (sessions.id = session_staff.session_id)\
    INNER JOIN users ON (session_staff.user_id = users.id)\
    INNER JOIN client_users ON (brand_projects.client_company_id = client_users.client_company_id)\
    INNER JOIN client_companies ON (client_users.client_company_id = client_companies.id)\
    WHERE\
    session_staff.type_id = "+params.type;
    if((params.companyId!=-1)&&(params.companyId!=undefined))
        sql+=" AND client_users.client_company_id = "+params.companyId.toString();
    sql+=" and session_staff.user_id =" +params.userId.toString()+
        " GROUP BY sessions.id";
    sql=sql.concat(" ORDER BY ",params.sidx," ",params.sord, " LIMIT ", params.start ,",", params.limit);
    return Q.nfcall(db.query, sql, []);
}

module.exports = getSessionDataForGridByUser;
