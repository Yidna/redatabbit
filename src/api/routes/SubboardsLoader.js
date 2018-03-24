//Subboards Route
module.exports = 
class SubboardsLoader extends require("./AuthableLoader") {
	loadRoutes(router) {
		router.get("/subboards", (req, res) => {
			return this.sendSuccessData(res, [{ "name": "allBoards", "date_created": "howtoformatdate" }]);
		});
		
		router.get("/subboards/:name", (req, res) => {
			return this.sendSuccessData(res, [{ "name": "singleBoard", "date_created": "howtoformatdate" }]);
		});
				
		router.put("/subboards/:name", (req, res) => {
			return this.sendSuccess(res);
		});
		
		router.post("/subboards", (req, res) => {
			return this.sendSuccess(res);
		});
		
		router.delete("/subboards/:name", (req, res) => {
			return this.sendSuccess(res);
		});
	}
}