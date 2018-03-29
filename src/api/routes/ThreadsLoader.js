// Threads Route
module.exports =
    class ThreadsLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            router.get('/subboards/:subboard_name/threads', (req, res) => {
				const q = 'SELECT p.id, p.content, title, username, date_created FROM Thread t, Post p WHERE subboard=? AND t.id = p.id'
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
				if (!req.headers.token) {
					return this.sendError(res, "No token");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "No user in token");
				}

				/*// get thread
				var q = 'SELECT * FROM Post WHERE id=?'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}

					if (rows.length != 1) {
						return this.sendError(res, "Didn't get exactly 1 Thread with that ID")
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
				})*/

				// finally update
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
				if (!req.headers.token) {
					return this.sendError(res, "No token");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "No user in token");
				}

				var q = 'INSERT INTO Post(username, content) VALUES (?, ?);'
				q += 'INSERT INTO Thread(id, subboard, title) VALUES (LAST_INSERT_ID(), ?, ?)'
				this.db.query(
				q,
				[auth, req.body.text, req.params.subboard_name, req.body.title],
				(err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}
					return this.sendSuccess(res)
				})
            })

			router.delete('/subboards/:subboard_name/threads/:thread_id', (req, res) => {
				if (!req.headers.token) {
					return this.sendError(res, "No token");
				}
				var auth = this.authenticate(req.headers.token);
				if (auth == "") {
					return this.sendError(res, "No user in token");
				}

				/*// get thread
				var q = 'SELECT * FROM Post WHERE id=?'
				this.db.query(q, [req.params.thread_id], (err, rows) => {
					if (err) {
						return this.sendError(res, err)
					}

					if (rows.length != 1) {
						return this.sendError(res, "Didn't get exactly 1 Thread with that ID")
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
				})*/

				// finally delete
				var q = 'DELETE FROM Thread WHERE id=?; DELETE FROM Post WHERE id=?'
				this.db.query(q, [req.params.thread_id, req.params.thread_id], (err, rows) => {
				if (err) {
					return this.sendError(res, err)
				}
				return this.sendSuccess(res)
				})
			})
        }
    }
