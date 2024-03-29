var db = require('if-data').db;
var Q = require('q');

function getParticipants(params) {
    var	sql = "SELECT \
			p.user_id, \
		    u.user_login_id, \
		    ul.username as name, \
			ul.password, \
			coalesce(u.name_first, '') as fullName, \
			u.avatar_info, \
			pcl.colour, \
			'participant' as role \
			FROM participant_lists pl \
			JOIN participants p ON p.id = pl.participant_id \
			LEFT JOIN users u ON u.id = p.user_id \
			LEFT JOIN user_logins ul on ul.id = u.user_login_id \
			LEFT JOIN participant_colour_lookup pcl ON pcl.id = pl.participant_colour_lookup_id \
			WHERE pl.deleted IS NULL \
			AND pl.participant_reply_id = 1 \
			AND pl.session_id = ? \
			\
			UNION \
			\
			SELECT \
			ss.user_id, \
			u.user_login_id, \
			ul.username as name, \
			ul.password, \
			coalesce(u.name_first, '') as fullName, \
			u.avatar_info, \
			15014199 as colour, \
			lower(cut.name) as role \
			FROM session_staff ss \
			JOIN users u ON u.id = ss.user_id \
			JOIN user_logins ul on ul.user_id = u.id \
			LEFT JOIN client_user_types cut ON cut.id = ss.type_id \
			WHERE ss.deleted IS NULL AND ss.session_id = ? \
            \
            UNION \
            \
            SELECT \
            c.user_id, \
                u.user_login_id, \
                ul.username as name, \
                ul.password, \
                coalesce(u.name_first, '') as fullName, \
                u.avatar_info, \
                15014199 as colour, \
                'observer' as role \
            FROM client_users c \
            JOIN users u ON u.id = c.user_id \
            JOIN user_logins ul on ul.user_id = u.id \
            LEFT JOIN client_user_types cut ON cut.id = c.type_id \
            WHERE c.client_company_id = ? \
                                    \
            UNION \
            \
            SELECT \
            u.id, \
                u.user_login_id, \
                ul.username as name, \
                ul.password, \
                coalesce(u.name_first, '') as fullName, \
                u.avatar_info, \
                15014199 as colour, \
                'observer' as role \
            FROM users u \
            JOIN user_logins ul on ul.user_id = u.id \
            WHERE u.ifs_admin=1 ";

    return Q.nfcall(db.query, sql, [params.session_id, params.session_id, params.client_company_id]);
}

module.exports = getParticipants;
