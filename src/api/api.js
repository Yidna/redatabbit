const Express = require('express');
const MySQL = require('mysql');
const BodyParser = require("body-parser");

const Config = require("./config");
const APIRouter = require("./APIRouter");

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

const router = new APIRouter(apiServer, db);
router.loadRoutes();
apiServer.use("/api", router.get());

apiServer.listen(9001)