//Accounts Route

module.exports = 
class AccountsLoader extends require("./RoutesLoader") {
	loadRoutes(router) {
		router.get("/accounts", (req, res) => {
			var q = "SELECT * FROM Account";
			
			this.db.query(q, (err, rows) => {
				if (err) {
					throw err
				}
				res.send(rows)
			});
		});
		
		router.get("/accounts/:username", (req, res) => {
			var q = "SELECT * FROM Account WHERE username=?";
			
			this.db.query(q, [req.params.username], (err, rows) => {
				if (err) {
					throw err
				}
				res.send(rows)
			});
		});
		
		router.put("/accounts/:username", (req, res) => {
			var q = "UPDATE Account SET username=?, password=?, is_moderator=? WHERE username=?";
			
			//TODO: parameter filling
			this.db.query(q, [0, 0, 0, req.params.username], (err, rows) => {
				//TODO: result checking
				res.send([{ "result": true} ]);
			});
		});
		
		router.post("/accounts", (req, res) => {
			var q = "INSERT INTO Account(username, password, is_moderator) VALUES (?, ?, ?)";
			
			res.send([{ "result": true} ]);
			return;
			//TODO: parameter filling
			this.db.query(q, [0, 0, 0], (err, rows) => {
				//TODO: result checking
				res.send([{ "result": true} ]);
			});
		});
		
		router.delete("/accounts", (req, res) => {
			var q = "TRUNCATE Account";
			
			this.db.query(q, (err, rows) => {
				//TODO: result checking
				res.send([{ "result": true} ]);
			});
		});
		
		router.delete("/accounts/:username", (req, res) => {
			var q = "DELETE FROM Account WHERE username=?";
			
			this.db.query(q, [req.params.username], (err, rows) => {
				//TODO: result checking
				res.send([{ "result": true} ]);
			});
		});
	}
}