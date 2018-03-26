// Comments Route
module.exports =
    class CommentsLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'SELECT comment_id, username, text, date_created FROM Comment WHERE thread_id=?'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:name/threads/:thread_id/:comment_id', (req, res) => {
                const q = 'UPDATE Comment SET text=? WHERE comment_id=?'
				this.db.query(q, [req.params.text, req.params.comment_id], (err, rows) => {
					if (err) {
					  throw err
					}
					return this.sendSuccess(res)
				})
            })

			// TODO: id, timestamp
            router.post('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'INSERT INTO Comment(comment_id, username, text, date_created) VALUES (?, ?, ?, ?)'
				this.db.query(
				q,
				[req.body.thread_id, req.body.subboard_name, req.body.title, req.body.username, req.body.text, req.body.date_created],
				(err, rows) => {
					if (err) {
						throw err
					}
					return this.sendSuccess(res)
				})
            })
        }
    }