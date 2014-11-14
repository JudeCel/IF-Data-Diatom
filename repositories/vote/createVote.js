"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function CreateVote(params) {
	return Q.nfcall(db.insert, "votes", {event_id:params.event_id,count:params.count})
}

module.exports = CreateVote;