// Threads Route
module.exports =
    class MessageLoader extends require('./AuthableLoader') {
        loadRoutes(router) {
            // just get all the messages why not no privacy
            router.get('/messagesAll', (req, res) => {
                const q = 'SELECT * FROM Personal_Message'
                if (!req.headers.token){
                    return this.sendError(res, "Not logged in")
                }
                if(this.authenticate(req.headers.token=="")){
                    return this.sendError(res, "Invalid log in")
                }
                this.db.query(q, (err, rows) => {
                    if(err){
                        return this.sendError(res, "")
                    }
                    return this.sendSuccessData(res, rows)
                })
            })
            // get messages for inbox
            router.get('/messages/:to_account', (req, res) => {
                const q = 'SELECT * FROM Personal_Message WHERE to_account=?'
                if (!req.headers.token){
                    return this.sendError(res, "Not logged in")
                }
                if(this.authenticate(req.headers.token=="")){
                    return this.sendError(res, "Invalid log in")
                }
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
                if (!req.headers.token){
                    return this.sendError(res, "Not logged in")
                }
                if(this.authenticate(req.headers.token=="")){
                    return this.sendError(res, "Invalid log in")
                }
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
            // delete a message based on inputted name
            router.delete('/messages', (req, res) => {
                const q = 'DELETE FROM Personal_Message WHERE from_account=?'
                if (!req.headers.token){
                    return this.sendError(res, "Not logged in")
                }
                if(this.authenticate(req.headers.token=="")){
                    return this.sendError(res, "Invalid log in")
                }
                this.db.query(q, [req.body.id], (err) =>{
                    if (err) {
                        return this.sendError(res, err)
                    }
                    return this.sendSuccess(res)
                })
            })
        }
    }