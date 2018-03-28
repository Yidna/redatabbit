// Replies Route
module.exports =
    class RepliesLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:name/threads/:thread_id/replies', (req, res) => {
				const q = 'SELECT p.id, username, date_created, content FROM Reply r, Post p WHERE thread=? AND r.id = p.id'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
					  return this.sendError(res, err)
					}
					return this.sendSuccessData(res, rows)
				})
            })

            router.put('/subboards/:name/threads/:thread_id/replies/:comment_id', (req, res) => {
				if (!req.headers.token) {
					return this.sendError(res, "No token");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "No user in token");
				}
				
				// get reply
				var q = 'SELECT * FROM Post WHERE id=?'
				this.db.query(q, [req.params.comment_id], (err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					
					if (rows.length != 1) {
						return this.sendError(res, "Didn't get exactly 1 Reply with that ID")
					}
					
					// if user is not OP, check if mod
					if (rows[0].username !== auth) {
						// get moderates
						q = 'SELECT * FROM Moderates WHERE username=?'
						this.db.query(q, [auth], (err2, rows2) => {
							if (err2) {
								return this.sendError(res, err2)
							}
						
							// check if user is mod for this board
							var isMod = false;
							for (var i = 0; i < rows2.length; i++) {
								if (rows2[i].subboard === req.params.subboard_name) {
									isMod = true;
									break;
								}
							}
							if (isMod == false) {
								return this.sendError(res, "Not a mod for this board")
							}
						})
					}
				})
				
                q = 'UPDATE Post SET content=? WHERE id=?'
				this.db.query(q, [req.body.text, req.params.comment_id], (err3, rows3) => {
					if (err3) {
					  return this.sendError(res, err3)
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
				[req.body.username, req.body.text, req.params.thread_id],
				(err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })
        }
    }