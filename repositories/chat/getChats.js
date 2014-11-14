var _ = require('lodash');
var Q = require('q');
var ifData = require('if-data');
var db = ifData.db;

function getChats(params)
{
    var sql = 'SELECT *, \
				( SELECT \
					count \
					FROM votes \
					WHERE event_id = events.id \
				) AS thumbs_up \
			FROM events \
			WHERE deleted IS NULL \
				AND cmd = "chat" \
				AND topic_id = ? \
			ORDER BY IF (reply_id, reply_id, id), created DESC';

    return Q.nfcall(db.query, sql, [params.topic_id]);
}

module.exports = getChats;