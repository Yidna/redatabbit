// Subboards Route
module.exports =
  class SpecialLoader extends require('./AuthableLoader') {
    loadRoutes(router) {
        router.get('/special/accounts/wacky', (req, res) => {
          const q = `SELECT username
                      FROM (SELECT DISTINCT p.username, t.subboard
                            FROM Post p, Thread t, Reply r
                            WHERE p.id=t.id OR (p.id=r.id AND r.thread=t.id)) AS t
                    WHERE subboard IN (SELECT name AS subboard FROM Subboard)
                    GROUP BY username Having COUNT(*)=(SELECT COUNT(*) FROM Subboard)`
          this.db.query(q, (err, rows) => {
            if (err) {
              return this.sendError(res, "ERROR! TRY AGAIN!")
            }
            return this.sendSuccessData(res, rows)
          })
        })

        router.get('/special/accounts/boards/:username', (req, res) => {
			const q =
				`SELECT c.subboard,
					    COUNT(*) as postCount
				 FROM (SELECT DISTINCT p.id, 
									   t.subboard, 
									   p.username
					   FROM Post p, 
							Thread t, 
							Reply r 
					   WHERE ((p.id = t.id) OR
							 (p.id = r.id AND r.thread = t.id))) as c
				 WHERE c.username=?
				 GROUP BY c.subboard HAVING COUNT(*) > 0;`;

			this.db.query(q, [req.params.username], (err, rows) => {
				  if (err) {
					return this.sendError(res, "ERROR! TRY AGAIN!")
				  }
				  return this.sendSuccessData(res, rows)
			});
        })

        router.get('/special/boards/top', (req, res) => {
          let q =`CREATE VIEW Temp AS SELECT a.subboard, AVG(a.count) as average FROM
                    (SELECT c.subboard, c.username, COUNT(*) as count FROM
                      (SELECT DISTINCT p.id, t.subboard, p.username FROM Post p, Thread t, Reply r WHERE
                      ((p.id = t.id) OR
                      (p.id = r.id AND r.thread = t.id))) as c
                    GROUP BY c.subboard, c.username) as a
                    GROUP BY a.subboard;
                      SELECT Temp.subboard, Temp.average as postCount
                      FROM  Temp
                      WHERE Temp.average = (SELECT MAX(Temp.average)
                                        FROM Temp);
                    DROP VIEW Temp;`
          this.db.query(q, (err, rows) => {
            if (err) {
              return this.sendError(res, "ERROR! TRY AGAIN!")
            }
            return this.sendSuccessData(res, rows[1])
          })
        })

        router.get('/special/boards/bottom', (req, res) => {
          let q =`CREATE VIEW Temp AS SELECT a.subboard, AVG(a.count) as average FROM
                    (SELECT c.subboard, c.username, COUNT(*) as count FROM
                      (SELECT DISTINCT p.id, t.subboard, p.username FROM Post p, Thread t, Reply r WHERE
                      ((p.id = t.id) OR
                      (p.id = r.id AND r.thread = t.id))) as c
                    GROUP BY c.subboard, c.username) as a
                    GROUP BY a.subboard;
                      SELECT Temp.subboard, Temp.average as postCount
                      FROM  Temp
                      WHERE Temp.average = (SELECT MIN(Temp.average)
                                        FROM Temp);
                    DROP VIEW Temp;`
          this.db.query(q, (err, rows) => {
            if (err) {
              return this.sendError(res, "ERROR! TRY AGAIN!")
            }
            return this.sendSuccessData(res, rows[1])
          })
        })
    }
  }
