"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function GetEvent(params) {
	var sql = "SELECT \
    sessions.start_time,\
        sessions.end_time,\
        sessions.name AS `Session_Name`,\
    sessions.colours_used,\
        brand_projects.id,\
        brand_projects.name,\
        brand_projects.logo_url,\
        brand_projects.chatroom_logo_url,\
        brand_projects.client_company_id,\
        brand_projects.name AS `brand_project_name`,\
    sessions.incentive_details,\
        sessions.status_id,\
        session_staff.user_id,\
        client_companies.name AS `client_company_name`,\
    client_companies.enable_chatroom_logo AS `enable_chatroom_logo`,\
    client_companies.id AS `client_company_id`			  \
				FROM\
    sessions\
    INNER JOIN brand_projects ON (sessions.brand_project_id = brand_projects.id)\
    INNER JOIN session_staff ON (sessions.id = session_staff.session_id)\
    INNER JOIN client_companies ON(brand_projects.client_company_id = client_companies.id)\
    WHERE\
    sessions.id = ?";
    return Q.nfcall(db.query, sql, [params.session_id]);
}

module.exports = GetEvent;