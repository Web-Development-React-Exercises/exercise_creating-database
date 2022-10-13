const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const todoRouter = require('./routes/todo.js')

const port = 3001

app.use('/', todoRouter)

app.use((err,req,res,next)=>{
    const statusCode = res.statusCode || 500
    console.error(err.message,err.stack)
    res.status(statusCode).json({error:err.message})
})

app.listen(port)