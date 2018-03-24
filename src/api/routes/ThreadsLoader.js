//Threads Route
module.exports = 
class ThreadsLoader extends require("./AuthableLoader") {
	loadRoutes(router) {
		router.get("/subboards/:name/threads", (req, res) => {
			return this.sendSuccessData(res, [{ "id": 0, "subboard": "allBoards", "title": "titleforallthreads", "username": "someuser", "date_created": "somedate", "content": "blablabla" }]);
		});
		
		router.get("/subboards/:name/threads/:id", (req, res) => {
			return this.sendSuccessData(res, [{ "id": 1, "subboard": "singleBoard", "title": "singleThread", "username": "someuser", "date_created": "somedate", "content": "huahuahua" }]);
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