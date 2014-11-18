"use strict";
var _ = require('lodash');
var async = require('async');
var ifCommon = require('if-common');
var mtypes = ifCommon.mtypes;
var ifData = require('../..'), db = ifData.db;

function AddUsers(params, mainCb) {
	var users = params.users;

	if (!users || users.length === 0)
		return mainCb(null, []);

	// clean input
	users = _.map(users, function(user) {
		if(!user.email || user.email.length == 0)
			user.email = null;

//		if (user.password)
//			user.passwordExpiration = ifCommon.utils.dateHelper.getPasswordExpirationDate();

		return user;
	});

	// pull out passwords and set them aside for update after inserts
	var emailPasswordMap = {};
	_.each(users, function (user) {
		if (user.password)
			emailPasswordMap[user.email] = user.password;
	});

	_.each(users, function(user) {
		delete user.password;
	});

	var passwordUpdates = [];

	db.insert('users', users, function (err, insertRes) {
		if (err) return mainCb(err);

		if (_.keys(emailPasswordMap).length === 0)
			return mainCb(null, insertRes);

		//var emailUsername;

		_.each(insertRes, function (user) {
			user = _.omit(user, "insertId");

			if (emailPasswordMap[user.email]) {
				user.passwordCrypt = ifCommon.utils.encryptPassword({
					userId: user.id,
					password: emailPasswordMap[user.email]
				});

				passwordUpdates.push(user);
			}
		});

		async.parallel([
			function(sCb) {
				if (passwordUpdates.length === 0) return sCb();

				db.insert('users', passwordUpdates, sCb, {
					upsert: true,
					insertMode: db.insertModes.custom
				});
			},
			function(sCb) {
				sCb();
			}
		], function(err) {
			if(err) return mainCb(err);
			mainCb(null, insertRes);
		})
	});
}
module.exports = AddUsers;