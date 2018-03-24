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
		router.post("/authenticate", (req, res) => {
			var q = "SELECT * FROM Account WHERE username=? AND password=?";
			if (!(req.body && req.body.username && req.body.password)) {
				res.send({ 
					"success": false,
					"message": "Missing username and/or password",
					"data": []
				});
				return;
			}
			this.db.query(q, [req.body.username, sha512(req.body.password)], (err, rows) => {
				if (err) {
					res.send({
						"success": false,
						"message": err,
						"data": []
					});
					return;
				}
				if (rows.length != 1) {
					res.send({
						"success": false,
						"message": "Invalid username or password",
						"data": []
					});
					return;
				}
				var payload = {
					"username": req.body.username
				};
				var token = jwt.sign(payload, this.expressServer.get("serverSecret"), { expiresIn: 3600 });
				res.send({
					"success": true,
					"message": "",
					"data": [{
						"token": token
					}]
				});
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