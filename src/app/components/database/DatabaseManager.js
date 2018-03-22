const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('src/app/components/database/Netflix.db')

exports.buildDB = () => {
  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Netflix')
    db.run('CREATE TABLE Netflix (name TEXT, link TEXT)')
  })

  return db
}

exports.createREST = () => {
  // TODO: add check to see if database exists

  const express = require('express')
  const restAPI = express()

  // to see response, goto: http://localhost:9001/data
  restAPI.get('/api', (req, res) => {
    db.all('SELECT * FROM Netflix', (err, rows) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  })

  restAPI.listen(9001)
}
