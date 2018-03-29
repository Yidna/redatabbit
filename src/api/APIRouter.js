const Express = require("express");

const AuthenticationLoader = require("./auth/AuthenticationLoader");
const AccountsLoader = require("./routes/AccountsLoader");
const SubboardsLoader = require("./routes/SubboardsLoader");
const ThreadsLoader = require("./routes/ThreadsLoader");
<<<<<<< HEAD
const RepliesLoader = require("./routes/RepliesLoader");
=======
const MessageLoader = require("./routes/MessageLoader");
const SpecialLoader = require("./routes/SpecialLoader");
>>>>>>> 29ff6548fe357026bdc63a5dae20587068ab2487

module.exports =
class APIRouter {
	constructor(expressServer, db) {
		this.router = new Express.Router();
		this.authLoader = new AuthenticationLoader(db, expressServer);
		this.accountsLoader = new AccountsLoader(db, this.authLoader);
		this.subboardsLoader = new SubboardsLoader(db, this.authLoader);
		this.threadsLoader = new ThreadsLoader(db, this.authLoader);
<<<<<<< HEAD
		this.repliesLoader = new RepliesLoader(db, this.authLoader);
=======
		this.messageLoader = new MessageLoader(db, this.authLoader);
		this.specialLoader = new SpecialLoader(db, this.authLoader);
>>>>>>> 29ff6548fe357026bdc63a5dae20587068ab2487
	}

	loadRoutes() {
		this.authLoader.loadRoutes(this.router);
		this.accountsLoader.loadRoutes(this.router);
		this.subboardsLoader.loadRoutes(this.router);
		this.threadsLoader.loadRoutes(this.router);
<<<<<<< HEAD
		this.repliesLoader.loadRoutes(this.router);
=======
		this.messageLoader.loadRoutes(this.router);
		this.specialLoader.loadRoutes(this.router);
>>>>>>> 29ff6548fe357026bdc63a5dae20587068ab2487
	}

	get() {
		return this.router;
	}
}