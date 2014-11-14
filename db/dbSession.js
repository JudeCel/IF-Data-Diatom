var _ = require('lodash');
var ifCommon = require('if-common');
var toCamelCase = ifCommon.utils.jsonFixer.toCamelCase;
var mysqlUtil = require('mysqlutil');

var mysqlSession = mysqlUtil.session;

module.exports.startTransaction = function (cb) {
	mysqlSession.startTransaction(cb);
};
module.exports.commit = function (cb) {
	mysqlSession.commit(cb);
};
module.exports.rollback = function (cb) {
	mysqlSession.rollback(cb);
};
module.exports.disableKeyChecks = function (cb) {
	mysqlSession.disableKeyChecks(cb);
};
module.exports.enableKeyChecks = function (cb) {
	mysqlSession.enableKeyChecks(cb);
};
module.exports.query = function (sql, queryParams, cb) {
	mysqlSession.query(sql, queryParams, fixResult(cb));
};
module.exports.getConnection = function (cb) {
	mysqlSession.getConnection(cb);
};
module.exports.queryOne = function (sql, queryParams, cb) {
	mysqlSession.queryOne(sql, queryParams, fixResult(cb));
};
module.exports.insert = function (tableName, items, cb, options) {
	mysqlSession.insert(tableName, items, fixResult(cb), options);
};
module.exports.update = function (tableName, items, cb, options) {
	mysqlSession.update(tableName, items, fixResult(cb), options);
};
module.exports.updateById = function (tableName, id, keyValuePairs, cb) {
	exports.update(tableName,
		_.extend(keyValuePairs, {$where: ['id = ?', id]}),
		cb);
};
module.exports.upsert = function (tableName, items, cb, options) {
	mysqlSession.upsert(tableName, items, fixResult(cb), options);
};
module.exports.setLogging = function (loggingOn) {
	mysqlSession.logging = loggingOn;
};

module.exports.reserveHiLoIds = function(amount, cb) {
	mysqlSession.reserveHiLoIds(amount,cb);
};

function fixResult(cb) {
	if (!cb) return null;
	return function (err, result) {
		cb(err, toCamelCase(result));
	};
}

module.exports.connected = false;

module.exports.connect = function (config, cb) {
	mysqlUtil(config, function (err, session) {
		if (err) return cb(err);
		if (!session) return cb(new Error("Unable to connect to the database."));
		mysqlSession = session;
		exports.connected = true;
		exports.setup();
		cb(err, mysqlSession);
	});
};

module.exports.setup = function () {
	mysqlSession.insertRules.push(function (items, tableName) {
		_.each(items, function(item) {
			if(!item.created)
				item.created = mysqlUtil.utils.utcNow();
			if(!item.updated)
				item.updated = mysqlUtil.utils.utcNow();
		});
	});

	mysqlSession.updateRules.push(function (item, tableName) {
		if(!item.updated)
			item.updated = mysqlUtil.utils.utcNow();
	});
};

module.exports.insertModes = mysqlUtil.insertModes;
module.exports.utcNow = mysqlUtil.utils.utcNow;
module.exports.formatDateForQuery = mysqlUtil.utils.formatDateForQuery;

module.exports.isEmptyResult = function (result) {
	return !result || (Array.isArray(result) && result.length == 0);
};

module.exports.disconnect = function (cb) {
	if (!mysqlSession) return;
	mysqlSession.disconnect(function () {
		mysqlSession = null;
		exports.connected = false;
		cb();
	});
};
