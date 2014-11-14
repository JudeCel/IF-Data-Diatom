"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function CreateUserVotes(params, cb) {
	return Q.nfcall(db.insert, "votes_by", params).then(function () {
		return _.omit(params, 'insertId', 'created', 'modified')
	});
}

module.exports = CreateUserVotes;
