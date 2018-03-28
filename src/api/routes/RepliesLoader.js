// Replies Route
module.exports =
    class RepliesLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:name/threads/:thread_id', (req, res) => {
				const q = 'SELECT p.id, username, date_created, content FROM Reply r, Post p WHERE thread=? AND r.id = p.id'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:name/threads/:thread_id', (req, res) => {
                const q = 'UPDATE Post SET content=? WHERE id=?'
				this.db.query(q, [req.params.text, req.params.comment_id], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })

            router.post('/subboards/:name/threads/:thread_id', (req, res) => {
				var q = 'INSERT INTO Post(username, content) VALUES (?, ?);'
				q += 'INSERT INTO Reply(id, thread) VALUES (LAST_INSERT_ID(), ?)'
				this.db.query(
				q,
				[req.body.username, req.body.text, req.body.thread_id],
				(err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })
        }
    }