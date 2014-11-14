"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function GetEvent(params) {
	var sql = "SELECT\
    client_companies.name,\
        client_companies.URL,\
        client_companies.ABN,\
        client_companies.number_of_brands,\
        client_companies.self_moderated,\
        client_companies.comments,\
        client_companies.start_date,\
        client_companies.end_date,\
        addresses.street,\
        addresses.suburb,\
        addresses.state,\
        addresses.post_code,\
        client_companies.client_company_type,\
        client_company_contacts.name_first,\
        client_company_contacts.name_last,\
        client_company_contacts.phone,\
        client_company_contacts.mobile,\
        client_company_contacts.email,\
        client_company_contacts.client_company_id\
    FROM\
    client_companies\
    INNER JOIN addresses ON (client_companies.address_id = addresses.id)\
    LEFT JOIN client_company_contacts ON (client_companies.id = client_company_contacts.client_company_id)\
    WHERE\
    client_company_contacts.contact_type_id=2";
    if(params.companyId!=-1)
        sql=sql.concat(" and client_company_contacts.client_company_id = ",params.companyId);

    if(params.sidx != undefined && params.sord != undefined)
        sql=sql.concat(" ORDER BY ",params.sidx," ",params.sord);
    if(params.start != undefined && params.limit != undefined)
        sql=sql.concat(" LIMIT ", params.start ,",", params.limit);

        //sql=sql.concat(" ORDER BY ",params.sidx," ",params.sord, " LIMIT ", params.start ,",", params.limit);
    return Q.nfcall(db.query, sql, []);
}

module.exports = GetEvent;
