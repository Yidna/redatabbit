// Subboards Route
module.exports =
  class SubboardsLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
      router.get('/subboards', (req, res) => {
        const q = 'SELECT * FROM Subboard'
        this.db.query(q, (err, rows) => {
          if (err) {
            return this.sendError(res, err)
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.get('/subboards/:name', (req, res) => {
        const q = 'SELECT * FROM Subboard WHERE name=?'
        this.db.query(q, [req.params.name], (err, rows) => {
          if (err) {
            return this.sendError(res, err)
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.put('/subboards/:name', (req, res) => {
        const q = 'UPDATE Subboard SET  name=?, date_created=? WHERE name=?'
        this.db.query(q, [req.body.name, req.body.date_created, req.params.name], (err, rows) => {
          if (err) {
            return this.sendError(res, err)
          }
        })
        return this.sendSuccess(res)
      })

      router.post('/subboards', (req, res) => {
        var q = 'INSERT INTO Subboard (name) VALUES (?);'
        q += 'INSERT INTO Moderates (username, subboard) VALUES (?, ?)'
        if (!req.headers.token){
          return this.sendError(res, "token does not exist")
        }
        var uName = this.authenticate(req.headers.token)
        if (uName == ""){
          return this.sendError(res, "name does not exist")
        }
        this.db.query(q, [req.body.name, uName, req.body.name], (err, rows) =>{
			    if (err) {
            return this.sendError(res, err)
          }
          return this.sendSuccess(res)
        })
      })

      router.delete('/subboards/:name', (req, res) => {
        const q = 'DELETE FROM Subboard WHERE name=?'
        // TODO
        this.db.query(q, [req.params.name], (err, rows) => {
          if (err){
            return this.sendError(res, err)
          }
          return this.sendSuccess(res)
        })
      })
    }
  }

