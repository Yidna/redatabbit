// Threads Route
module.exports =
    class ThreadsLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:name/threads', (req, res) => {
				const q = 'SELECT id, title, username, date_created FROM Thread WHERE subboard=?'
				this.db.query(q, [req.params.subboard_name], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.get('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'SELECT title, username, date_created, content FROM Thread WHERE id=?'
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

            router.post('/subboards', (req, res) => {
				const q = 'INSERT INTO Thread(subboard, title, username, content) VALUES (?, ?, ?, ?)'
				this.db.query(
				q,
				[req.body.subboard_name, req.body.title, req.body.username, req.body.text],
				(err, rows) => {
					if (err) {
						throw err
					}
					return this.sendSuccess(res)
				})
            })
			
			router.delete('/subboards/:name', (req, res) => {
				const q = 'DELETE FROM Thread WHERE id=?'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
				if (err) {
					throw err
				}
				return this.sendSuccess(res)
				})
			})
        }
    }