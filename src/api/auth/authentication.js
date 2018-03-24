//Authentication Route
const sha512 = require("js-sha512");
const jwt = require("jsonwebtoken");

module.exports = {
	loadRoutes: function(expressServer, db, router) {
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
			db.query(q, [req.body.username, sha512(req.body.password)], (err, rows) => {
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
				var token = jwt.sign(payload, expressServer.get("serverSecret"));
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
}