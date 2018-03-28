// Threads Route
module.exports =
    class MessageLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            // just get all the messages why not no privacy
            router.get('/messagesAll', (req, res) => {
                const q = 'SELECT * FROM Personal_Message'
                this.db.query(q, (err, rows) => {
                    if(err){
                        return this.sendError(res, err)
                    }
                    return this.sendSuccessData(res, rows)
                })
            })
            // get messages for inbox
            router.get('/messages/:to_account', (req, res) => {
                const q = 'SELECT * FROM Personal_Message WHERE to_account=?'
                this.db.query(q, [req.params.to_account], (err, rows) => {
                    if(err){
                        return this.sendError(res, err)
                    }
                    return this.sendSuccessData(res, rows)
                })
            })
            // send a message
            router.post('/messages/:from_account', (req, res) => {
                const q = 'INSERT INTO Personal_Message (from_account, to_account, content) VALUES (?, ?, ?)'
                this.db.query(
                    q,
                    [req.params.from_account, req.body.to_account, req.body.content],
                    (err) => {
                        if (err) {
                            return this.sendError(res, err)
                        }
                        return this.sendSuccess(res)
                })
            })
            // delete a message that id matches
            router.delete('/messages/:to_account/:id', (req, res) => {'DELETE FROM Subboard WHERE name=?'
                const q = 'DELETE FROM Personal_Message WHERE id=?'
                this.db.query(q, [req.params.id], (err) =>{
                    if (err) {
                        return this.sendError(res, err)
                    }
                    return this.sendSuccess(res)
                })
            })
        }
    }