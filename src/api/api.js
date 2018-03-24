const Express = require('express');
const MySQL = require('mysql');
const BodyParser = require("body-parser");

const Config = require("./config");
const Router = require("./router");

const apiServer = Express();

const db = MySQL.createConnection({
	host	: Config.host,
	user	: Config.user,
	password: Config.password,
	database: Config.database
});
db.connect();

apiServer.set("serverSecret", Config.secret);

apiServer.use(BodyParser.json());
apiServer.use(BodyParser.urlencoded({ extended: true }));

const router = Router.createRouter(db);
apiServer.use("/api", router);

apiServer.listen(9001)