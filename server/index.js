const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = 3001

app.get('/', async (req, res) => {
    try {
        const conn = await mysql.createConnection(config.db)
        res.status(200).send({ message: 'Connected to database' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Error connecting to database' })
    }
})

app.listen(port)