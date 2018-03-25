//Authentication Route
const sha512 = require("js-sha512");
const jwt = require("jsonwebtoken");

module.exports = 
class AuthenticationLoader extends require("../routes/RoutesLoader") {
	constructor(db, expressServer) {
		super(db);
		this.expressServer = expressServer;
	}
	
	loadRoutes(router) {
		router.post("/authenticate/login", (req, res) => {
			var q = "SELECT username, password FROM Account WHERE username=? AND password=?";
			if (!(req.body && req.body.username && req.body.password)) {
				return this.sendError(res, "Missing username and/or password");
			}
			this.db.query(q, [req.body.username, sha512(req.body.password)], (err, rows) => {
				if (err) {
					return this.sendError(res, err);
				}
				if (rows.length != 1) {
					return this.sendError(res, "Invalid username or password");
				}
				var payload = {
					"username": req.body.username
				};
				var token = jwt.sign(payload, this.expressServer.get("serverSecret"), { expiresIn: 3600 });
				return this.sendSuccessData(res, [{ "token": token }]);
			});
		});
		
		router.post("/authenticate/renew", (req, res) => {
			if (!req.headers.token) {
				return this.sendError(res, "Nothing to renew");
			}
			var auth = this.authenticate(req.headers.token);
			if (!auth) {
				return this.sendError(res, "Invalid token");
			}
			var payload = {
				"username": auth
			};
			var token = jwt.sign(payload, this.expressServer.get("serverSecret"), { expiresIn: 3600 });
			return this.sendSuccessData(res, [{ "token": token }]);
		});
		
		router.post("/authenticate/verify", (req, res) => {
			var q = "SELECT username, password FROM Account WHERE username=? AND password=?";
			if (!(req.headers.token && req.body.password)) {
				return this.sendError(res, "Insufficient information");
			}
			var auth = this.authenticate(req.headers.token);
			if (!auth) {
				return this.sendError(res, "Invalid token");
			}
			this.db.query(q, [auth, sha512(req.body.password)], (err, rows) => {
				if (err) {
					return this.sendError(res, err);
				}
				if (rows.length != 1) {
					return this.sendError(res, "Invalid password");
				}
				return this.sendSuccess(res);
			});
		});
	}
	
	authenticate(token) {
		if (jwt.verify(token, this.expressServer.get("serverSecret"))) {
			return jwt.decode(token).username;
		}
		return "";
	}
}