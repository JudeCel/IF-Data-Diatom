var db = require("./db/dbSession.js");

module.exports.db = db;
module.exports.setup = db.connect;

module.exports.repositories = {
    createEvent: require("./repositories/event/createEvent.js"),
    getEvent: require("./repositories/event/getEvent.js"),
    getEventByReplyId: require("./repositories/event/getEventByReplyId.js"),
    getEventByUid: require("./repositories/event/getEventByUid.js"),
    getEventsForCollage: require("./repositories/event/getEventsForCollage.js"),
    getEventsForToggle: require("./repositories/event/getEventsForToggle.js"),
    updateEvent: require("./repositories/event/updateEvent.js"),
    deleteEvent: require("./repositories/event/deleteEvent.js"),
    deleteEvents: require("./repositories/event/deleteEvents.js"),
    deleteEventsShareResource: require("./repositories/event/deleteEventsShareResource.js"),

    getChats: require("./repositories/chat/getChats.js"),
    deleteChat: require("./repositories/chat/deleteChat.js"),
    getReplies: require("./repositories/chat/getReplies.js"),

    getOfflineTransactions: require("./repositories/offlineTransaction/getOfflineTransactions.js"),
    createOfflineTransaction: require("./repositories/offlineTransaction/createOfflineTransaction.js"),
    deleteOfflineTransactions: require("./repositories/offlineTransaction/deleteOfflineTransactions.js"),

    createResource: require("./repositories/resource/createResource.js"),
    getLastSharedResources: require("./repositories/resource/getLastSharedResources.js"),

    createSession: require("./repositories/session/createSession.js"),
    createSessionStaff: require("./repositories/session/createSessionStaff.js"),
    getSessionPreferences: require("./repositories/session/getSessionPreferences.js"),
    getSessionStaffUserIds: require("./repositories/session/getSessionStaffUserIds.js"),
    getSessionDataForGrid: require("./repositories/session/getSessionDataForGrid.js"),
    getSessionDataForGridByUser: require("./repositories/session/getSessionDataForGridByUser.js"),
    getSessionMod: require("./repositories/session/getSessionMod.js"),

    getAvatarInfo: require("./repositories/user/getAvatarInfo.js"),

    getBrandProjectInfo: require("./repositories/brandProject/getBrandProjectInfo.js"),
    getBrandProjectForGrid: require("./repositories/brandProject/getBrandProjectForGrid.js"),
    getBrandProject: require("./repositories/brandProject/getBrandProject.js"),
    getBrandProjectBySession: require("./repositories/brandProject/getBrandProjectBySession.js"),

    getParticipants: require("./repositories/participant/getParticipants.js"),

    getReport: require("./repositories/report/getReport.js"),
    getReportTopics: require("./repositories/report/getReportTopics.js"),
    getReportChatHistory: require("./repositories/report/getReportChatHistory.js"),
    getReportVoting: require("./repositories/report/getReportVoting.js"),
    getReportStatistics: require("./repositories/report/getReportStatistics.js"),
    getReportWhiteboard: require("./repositories/report/getReportWhiteboard.js"),

    getResource: require("./repositories/resource/getResource.js"),
    getResources: require("./repositories/resource/getResources.js"),
    getResourcesGeneric: require("./repositories/resource/getResourcesGeneric.js"),
    updateResources: require("./repositories/resource/updateResources.js"),
    deleteUserTmpResources: require("./repositories/resource/deleteUserTmpResources.js"),

	getTopic: require("./repositories/topic/getTopic.js"),
    getTopics: require("./repositories/topic/getTopics.js"),
	getGalleryTopics: require("./repositories/topic/getGalleryTopics.js"),
	updateTopic: require("./repositories/topic/updateTopic.js"),

    getUserLogin: require("./repositories/userLogin/getUserLogin.js"),
    getUserLogin_byPassword: require("./repositories/userLogin/getUserLogin_byPassword.js"),
    getUserAdminity: require("./repositories/userLogin/getUserAdminity.js"),
    getUserModity: require("./repositories/userLogin/getUserModity.js"),
    getUserObservity: require("./repositories/userLogin/getUserObservity.js"),
    getUserParticipity: require("./repositories/userLogin/getUserParticipity.js"),

    getClientCompanyLogo: require("./repositories/company/getClientCompanyLogo.js"),
    getClientCompanyInfo: require("./repositories/company/getClientCompanyInfo.js"),

    getUser: require("./repositories/user/getUser.js"),
    updateUser: require("./repositories/user/updateUser.js"),

    createLog: require("./repositories/log/createLog.js"),

    createVote: require("./repositories/vote/createVote.js"),
    getVotes: require("./repositories/vote/getVotes.js"),
    updateVote: require("./repositories/vote/updateVote.js"),

    createUserVotes: require("./repositories/vote/createUserVotes.js"),
    getUserVotes: require("./repositories/vote/getUserVotes.js")
};
