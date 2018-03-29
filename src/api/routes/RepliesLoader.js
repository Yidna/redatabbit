// Replies Route
module.exports =
    class RepliesLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:subboard_name/threads/:thread_id/replies', (req, res) => {
				const q = 'SELECT p.id, username, date_created, content FROM Reply r, Post p WHERE thread=? AND r.id = p.id'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccessData(res, rows)
				})
            })
			
			router.get('/subboards/:subboard_name/threads/:thread_id/replies/comment_id', (req, res) => {
				const q = 'SELECT p.id, username, date_created, content FROM Reply r, Post p WHERE p.id=? AND r.id = p.id'
				this.db.query(q, [req.params.comment_id], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:subboard_name/threads/:thread_id/replies/:comment_id', (req, res) => {
				if (!req.headers.token) {
					return this.sendError(res, "No token");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "No user in token");
				}
				
				var q = 'SET @sb := (SELECT DISTINCT subboard FROM Moderates WHERE username=? AND subboard=?);'
				q += 'SET @id := (SELECT DISTINCT p.id FROM Post p, Thread t, Reply r WHERE p.id=? AND (p.username=? OR (p.id=r.id AND r.thread=t.id AND t.subboard=@sb)));'
				q += 'UPDATE Post SET content=? WHERE id=@id'
				this.db.query(q, [auth, req.params.subboard_name, req.params.comment_id, auth, req.body.text], (err, rows) => {
				if (err) {
					return this.sendError(res, err)
				}
				return this.sendSuccess(res)
				})
            })

            router.post('/subboards/:name/threads/:thread_id/replies', (req, res) => {
				if (!req.headers.token) {
					return this.sendError(res, "No token");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "No user in token");
				}
				
				var q = 'INSERT INTO Post(username, content) VALUES (?, ?);'
				q += 'INSERT INTO Reply(id, thread) VALUES (LAST_INSERT_ID(), ?)'
				this.db.query(
				q,
				[auth, req.body.text, req.params.thread_id],
				(err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })
        }
    }