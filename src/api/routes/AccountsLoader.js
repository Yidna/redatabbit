// Accounts Route
module.exports =
  class AccountsLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
      router.get('/accounts', (req, res) => {
        const q = 'SELECT username, date_created FROM Account'
        this.db.query(q, (err, rows) => {
          if (err) {
            throw err
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.get('/accounts/:username', (req, res) => {
        const q = 'SELECT username, date_created FROM Account WHERE username=?'
        this.db.query(q, [req.params.username], (err, rows) => {
          if (err) {
            throw err
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.put('/accounts/:username', (req, res) => {
        const q = 'UPDATE Account SET username=?, password=?, is_moderator=? WHERE username=?'
        this.db.query(q, [req.body.username, req.body.password, req.body.is_moderator, req.params.username], (err, rows) => {
          if (err) {
            throw err
          }
          return this.sendSuccess(res)
        })
      })

      router.post('/accounts', (req, res) => {
        const q = 'INSERT INTO Account(username, password, is_moderator) VALUES (?, ?, ?)'
        this.db.query(
          q,
          [req.body.username, req.body.password, req.body.is_modetator],
          (err) => {
            if (err) {
              throw err
            }
            return this.sendSuccess(res)
          })
      })

      router.delete('/accounts', (req, res) => {
        const q = 'TRUNCATE Account'
        this.db.query(q, (err) => {
          if (err) {
            throw err
          }
          return this.sendSuccess(res)
        })
      })

      router.delete('/accounts/:username', (req, res) => {
        const q = 'DELETE FROM Account WHERE username=?'
        this.db.query(q, [req.params.username], (err) => {
          if (err) {
            throw err
          }
          return this.sendSuccess(res)
        })
      })
    }
  }
