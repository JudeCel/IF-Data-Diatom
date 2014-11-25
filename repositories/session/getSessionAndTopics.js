var db = require('if-data').db;
var Q = require('q');
var _ = require('lodash');

function getSessionAndTopics(params) {
  return Q.all([ 
    getSession(params), 
    getTopics(params) 
  ]).spread(function (session, topics) {
      return {session: session, topics: topics};
  });
}

function getSession(params) {
   return require('if-data').repositories.getSession(params);
}

function getTopics(params) {
    var sql = "SELECT name, type, URL, topic_status_id, topic_order_id, description \
      FROM topics \
      WHERE deleted IS NULL AND  session_id = ?";
    return Q.nfcall(db.query, sql, [params.sessionId]);
}

module.exports = getSessionAndTopics;