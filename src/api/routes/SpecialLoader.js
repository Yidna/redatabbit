// Subboards Route
module.exports =
  class SpecialLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
        router.get('/accounts/wacky', (req, res) => {
            const q = `SELECT username
                       FROM (SELECT DISTINCT p.username, t.subboard
                             FROM Post p, Thread t, Reply r
                             WHERE p.id=t.id OR (p.id=r.id AND r.thread=t.id)) AS t
                      WHERE subboard IN (SELECT name AS subboard FROM Subboard)
                      GROUP BY username Having COUNT(*)=(SELECT COUNT(*) FROM Subboard)`
            if (!req.headers.token){
              return this.sendError(res, "Not logged in")
            }
            if(this.authenticate(req.headers.token=="")){
                return this.sendError(res, "Invalid log in")
            }
            this.db.query(q, (err, rows) => {
              if (err) {
                return this.sendError(res, "ERROR! TRY AGAIN!")
              }
              return this.sendSuccessData(res, rows)
            })
        })
    }
  }

