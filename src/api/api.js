const Express = require('express');
const MySQL = require('mysql');
const BodyParser = require("body-parser");

const Router = require("./router");

const apiServer = Express();

const db = MySQL.createConnection({
	host	: "heatboxmc.busgasexplosion.com",
	user	: "ivangill",
	password: "P@$$w0rd1v4n",
	database: "cs304_message_board"
});
db.connect();

apiServer.use(BodyParser.json());
apiServer.use(BodyParser.urlencoded({ extended: true }));

const router = Router.createRouter(db);
apiServer.use("/api", router);

apiServer.listen(9001)