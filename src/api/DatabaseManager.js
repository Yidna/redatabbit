const express = require('express')
const api = express()
const mysql = require('mysql')

const db = mysql.createConnection({
	host	: "heatboxmc.busgasexplosion.com",
	user	: "ivangill",
	password: "P@$$w0rd1v4n",
	database: "cs304_message_board"
});

db.connect();

// to see response, goto: http://localhost:9001/data
api.get('/api', (req, res) => {
	db.query('SELECT * FROM Account', (err, rows) => {
		  if (err) {
			throw err
		  }
		  res.send(rows)
	})
})

api.listen(9001)