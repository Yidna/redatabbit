const Express = require("express");

const Accounts = require("./routes/accounts");

module.exports = {
	createRouter: function(db) {
		var router = Express.Router();
		
		Accounts.loadRoutes(db, router);
		
		return router;
	}
}