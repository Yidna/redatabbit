//Threads Route
module.exports = 
class ThreadsLoader extends require("./AuthableLoader") {
	loadRoutes(router) {
		router.get("/subboards/:name/threads", (req, res) => {
			res.send([{ "id": 0, "subboard": "allBoards", "title": "titleforallthreads", "username": "someuser", "date_created": "somedate", "content": "blablabla" }]);
		});
		
		router.get("/subboards/:name/threads/:id", (req, res) => {
			res.send([{ "id": 1, "subboard": "singleBoard", "title": "singleThread", "username": "someuser", "date_created": "somedate", "content": "huahuahua" }]);
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