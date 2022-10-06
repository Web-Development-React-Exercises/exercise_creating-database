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
        const [result,] = await conn.execute('SELECT * FROM task')
        if (!result) result = [];
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

app.post('/new', async (req, res) => {
    try {
        const conn = await mysql.createConnection(config.db)
        const [result,] = await conn.execute('insert into task (description) values (?)',[req.body.description])
        res.status(200).json({id:result.insertId})

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

app.delete('/delete', async (req, res) => {
    try {
        const conn = await mysql.createConnection(config.db)
        await conn.execute('delete from task where id = ?', [req.query.id])
        res.status(200).json({id:req.query.id})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

app.listen(port)