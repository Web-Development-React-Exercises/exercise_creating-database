const mysql = require('mysql2/promise')
const config = require('../config')

async function query(sql, params) {
    const conn = await mysql.createConnection(config.db)
    const [result,] = await conn.execute(sql, params)

    return result
}

module.exports = { query }