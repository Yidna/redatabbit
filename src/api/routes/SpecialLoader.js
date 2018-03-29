// Subboards Route
module.exports =
  class SpecialLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
        router.get('/special/accounts/wacky', (req, res) => {
            const q = `SELECT username
                       FROM (SELECT DISTINCT p.username, t.subboard
                             FROM Post p, Thread t, Reply r
                             WHERE p.id=t.id OR (p.id=r.id AND r.thread=t.id)) AS t
                      WHERE subboard IN (SELECT name AS subboard FROM Subboard)
                      GROUP BY username Having COUNT(*)=(SELECT COUNT(*) FROM Subboard)`
            this.db.query(q, (err, rows) => {
              if (err) {
                return this.sendError(res, "ERROR! TRY AGAIN!")
              }
              return this.sendSuccessData(res, rows)
            })
        });
		
		router.get('/special/accounts/boards/:username', (req, res) => {
			
		});
		
		router.get('/special/boards/top', (req, res) => {
			
		});
		
		router.get('/special/boards/bottom', (req, res) => {
			
		});
    }
  }

