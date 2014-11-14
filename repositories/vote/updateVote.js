"use strict";
var ifData = require('../..'), db = ifData.db;
var Q = require('q');

function UpdateVote(params, cb) {
	return Q.nfcall(db.updateById, 'votes', params.id, params);
}

module.exports = UpdateVote;
