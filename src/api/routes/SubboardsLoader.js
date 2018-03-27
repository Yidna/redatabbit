// Subboards Route
module.exports =
  class SubboardsLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
      router.get('/subboards', (req, res) => {
        const q = 'SELECT * FROM Subboard'
        this.db.query(q, (err, rows) => {
          if (err) {
            throw err
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.get('/subboards/:name', (req, res) => {
        const q = 'SELECT * FROM Subboard WHERE name=?'
        this.db.query(q, [req.params.name], (err, rows) => {
          if (err) {
            throw err
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.put('/subboards/:name', (req, res) => {
        const q = 'UPDATE Subboard SET  name=?, date_created=? WHERE name=?'
        this.db.query(q, [req.body.name, req.body.date_created, req.params.name], (err, rows) => {
          if (err) {
            throw err
          }
        })
        return this.sendSuccess(res)
      })

      router.post('/subboards', (req, res) => {
        const q = 'INSERT INTO Subboard(name, date_created) VALUE (?, ?)'
        this.db.query(q, [req.body.name, req.body.date_created], (err, rows) =>{
			    if (err) {
			  	throw err
          }
          return this.sendSuccess(res)
        })
      })

      router.delete('/subboards/:name', (req, res) => {
        const q = 'DELETE FROM Subboard WHERE name=?'
        this.db.query(q, [req.params.name], (err, rows) => {
          if (err){
            throw err
          }
          return this.sendSuccess(res)
        })
      })
    }
  }
