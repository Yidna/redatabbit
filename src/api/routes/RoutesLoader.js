//Base Route Loading Class

module.exports = 
class RoutesLoader {
	constructor(db) {
		this.db = db;
	}
	
	loadRoutes(router) {
		
	}
	
	sendError(res, message) {
		return res.send({
			"success": false,
			"message": message,
			"data": []
		});
	}
	
	sendErrorData(res, message, data) {
		return res.send({
			"success": false,
			"message": message,
			"data": data
		});
	}
	
	sendSuccess(res) {
		return res.send({
			"success": true,
			"message": "",
			"data": []
		});
	}
	
	sendSuccessData(res, data) {
		return res.send({
			"success": true,
			"message": "",
			"data": data
		});
	}
}