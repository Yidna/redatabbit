// Replies Route
module.exports =
    class RepliesLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'SELECT id, username, date_created, text, FROM Reply WHERE thread=?'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:name/threads/:thread_id/:comment_id', (req, res) => {
                const q = 'UPDATE Reply SET content=? WHERE id=?'
				this.db.query(q, [req.params.text, req.params.comment_id], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccess(res)
				})
            })

            router.post('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'INSERT INTO Reply(thread, username, content) VALUES (?, ?, ?)'
				this.db.query(
				q,
				[req.body.thread_id, req.body.username, req.body.text],
				(err, rows) => {
					if (err) {
						throw err
					}
					return this.sendSuccess(res)
				})
            })
        }
    }