// Threads Route
module.exports =
    class ThreadsLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:subboard_name/threads', (req, res) => {
				const q = 'SELECT p.id, title, username, date_created FROM Thread t, Post p WHERE subboard=? AND t.id = p.id'
				this.db.query(q, [req.params.subboard_name], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.get('/subboards/:subboard_name/threads/:thread_id', (req, res) => {
				const q = 'SELECT * FROM Thread t, Post p WHERE p.id=? AND t.id = p.id'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:subboard_name/threads/:thread_id', (req, res) => {
				/*if (!req.headers.token) {
					return this.sendError(res, "potato");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "nope");
				}*/
				
				var q = 'UPDATE Post SET content=? WHERE id=?'
				this.db.query(
				q,
				[req.body.text, req.params.thread_id],
				(err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })

            router.post('/subboards/:subboard_name', (req, res) => {
				var q = 'INSERT INTO Post(username, content) VALUES (?, ?);'
				q += 'INSERT INTO Thread(id, subboard, title) VALUES (LAST_INSERT_ID(), ?, ?)'
				this.db.query(
				q,
				[req.body.username, req.body.text, req.params.subboard_name, req.body.title],
				(err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })
			
			router.delete('/subboards/:subboard_name/threads/:thread_id', (req, res) => {
				const q = 'DELETE FROM Thread WHERE id=?; DELETE FROM Post WHERE id=?'
				this.db.query(q, [req.body.thread_id], (err, rows) => {
				if (err) {
					return this.sendError(res, err)
				}
				return this.sendSuccess(res)
				})
			})
        }
    }