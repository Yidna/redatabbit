// Threads Route
module.exports =
    class ThreadsLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:name/threads', (req, res) => {
				//const q = 'SELECT id, title, username, date_created FROM Thread WHERE subboard=? LEFT JOIN(Post) ON (Thread.id = Post.id)'
				const q = 'SELECT id, title, username, date_created FROM Thread t, Post p WHERE subboard=? AND t.id = p.id'
				this.db.query(q, [req.params.subboard_name], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.get('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'SELECT * FROM Thread t, Post p, WHERE id=?, t.id = p.id'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'UPDATE Thread SET title=?, content=? WHERE id=?'
				this.db.query(
				q,
				[req.body.title, req.body.text, req.body.thread_id],
				(err, rows) => {
					if (err) {
						throw err
					}
					return this.sendSuccess(res)
				})
            })

            router.post('/subboards/:name', (req, res) => {
				var q = 'INSERT INTO Post(username, content) VALUES (?, ?);'
				q += 'INSERT INTO Thread(id, subboard, title) VALUES (LAST_INSERT_ID(), ?, ?)'
				this.db.query(
				q,
				[req.body.username, req.body.text, req.body.subboard_name, req.body.title],
				(err, rows) => {
					if (err) {
						throw err
					}
					return this.sendSuccess(res)
				})
            })
			
			router.delete('/subboards/:name', (req, res) => {
				const q = 'DELTE FROM Thread WHERE id=?; DELETE FROM Post WHERE id=?'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
				if (err) {
					throw err
				}
				return this.sendSuccess(res)
				})
			})
        }
    }