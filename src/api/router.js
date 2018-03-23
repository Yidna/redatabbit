const Express = require("express");

const Accounts = require("./routes/accounts");
const Subboards = require("./routes/subboards");
const Threads = require("./routes/threads");

module.exports = {
	createRouter: function(db) {
		var router = Express.Router();
		
		Accounts.loadRoutes(db, router);
		Subboards.loadRoutes(db, router);
		Threads.loadRoutes(db, router);
		
		return router;
	}
}