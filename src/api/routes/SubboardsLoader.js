//Subboards Route
module.exports = 
class SubboardsLoader extends require("./RoutesLoader") {
	loadRoutes(router) {
		router.get("/subboards", (req, res) => {
			res.send([{ "name": "allBoards", "date_created": "howtoformatdate" }]);
		});
		
		router.get("/subboards/:name", (req, res) => {
			res.send([{ "name": "singleBoard", "date_created": "howtoformatdate" }]);
		});
				
		router.put("/subboards/:name", (req, res) => {
			res.send([{ "result": true} ]);
		});
		
		router.post("/subboards", (req, res) => {
			res.send([{ "result": true} ]);
		});
		
		router.delete("/subboards/:name", (req, res) => {
			res.send([{ "result": true} ]);
		});
	}
}