const Express = require("express");

const Authentication = require("./auth/authentication");
const Accounts = require("./routes/accounts");
const Subboards = require("./routes/subboards");
const Threads = require("./routes/threads");

module.exports = {
	createRouter: function(expressServer, db) {
		var router = Express.Router();
		
		Authentication.loadRoutes(expressServer, db, router);
		Accounts.loadRoutes(db, router);
		Subboards.loadRoutes(db, router);
		Threads.loadRoutes(db, router);
		
		return router;
	}
}