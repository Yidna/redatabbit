const Express = require("express");

const AuthenticationLoader = require("./auth/AuthenticationLoader");
const AccountsLoader = require("./routes/AccountsLoader");
const SubboardsLoader = require("./routes/SubboardsLoader");
const ThreadsLoader = require("./routes/ThreadsLoader");

module.exports = 
class APIRouter {
	constructor(expressServer, db) {
		this.router = new Express.Router();
		this.authLoader = new AuthenticationLoader(db, expressServer);
		this.accountsLoader = new AccountsLoader(db, this.authLoader);
		this.subboardsLoader = new SubboardsLoader(db, this.authLoader);
		this.threadsLoader = new ThreadsLoader(db, this.authLoader);
	}
	
	loadRoutes() {
		this.authLoader.loadRoutes(this.router);
		this.accountsLoader.loadRoutes(this.router);
		this.subboardsLoader.loadRoutes(this.router);
		this.threadsLoader.loadRoutes(this.router);
	}
	
	get() {
		return this.router;
	}
}