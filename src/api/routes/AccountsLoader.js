// Accounts Route
const sha512 = require("js-sha512");

module.exports =
  class AccountsLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
      // get usernames and the numbers of posts for each user
      router.get('/accounts', (req, res) => {
        let q = 'SELECT Account.username, COUNT(Post.username)'
        q += 'FROM Account, Post WHERE Account.username=Post.username GROUP BY Post.username;'
        this.db.query(q, (err, rows) => {
          if (err) {
            return this.sendError(res, "ERROR! TRY AGAIN!")
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.get('/accounts/:username', (req, res) => {
        const q = 'SELECT username, date_created FROM Account WHERE username=?'
        this.db.query(q, [req.params.username], (err, rows) => {
          if (err) {
            return this.sendError(res, "ERROR! TRY AGAIN!")
          }
          return this.sendSuccessData(res, rows)
        })
      })

      router.put('/accounts/:username', (req, res) => {
        const q = 'UPDATE Account SET username=?, password=? WHERE username=? AND password=?'
		if (!req.headers.token) {
			return this.sendError(res, "Not logged in");
		}
		if (this.authenticate(req.headers.token) == "") {
			return this.sendError(res, "Invalid login");
		}
        this.db.query(q, [req.body.username, sha512(req.body.password), req.params.username, sha512(req.body.oldPassword)], (err, rows) => {
          if (err) {
            return this.sendError(res, "ERROR! TRY AGAIN!")
          }
          return this.sendSuccess(res)
        })
      })

      router.post('/accounts', (req, res) => {
        const q = 'INSERT INTO Account(username, password) VALUES (?, ?)'
        this.db.query(
          q,
          [req.body.username, sha512(req.body.password)],
          (err) => {
            if (err) {
              return this.sendError(res, "ERROR! TRY AGAIN!")
            }
            return this.sendSuccess(res)
          })
      })

      router.delete('/accounts', (req, res) => {
        const q = 'TRUNCATE Account'
        this.db.query(q, (err) => {
          if (err) {
            return this.sendError(res, "ERROR! TRY AGAIN!")
          }
          return this.sendSuccess(res)
        })
      })
// Only for those need login
// check if req.headers.token exists
//   if does, check token is expired by this.authenticate(req.headers.token)
//       if valid, check this.authenticate(req.headers.token) returns username or not
//       else throw an error
//   else this.sendError(res, "tomato")

      router.delete('/accounts/:username', (req, res) => {
        const q = 'DELETE FROM Account WHERE username=?'
        this.db.query(q, [req.params.username], (err) => {
          if (err) {
            return this.sendError(res, "ERROR! TRY AGAIN!")
          }
          return this.sendSuccess(res)
        })
      })
    }
  }

