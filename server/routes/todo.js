const express = require('express')
const router = express.Router()
const todo = require('../services/todo.js')

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await todo.getAllTasks())
    } catch (err) {
        next(err)
    }
})

router.post('/new', async (req, res) => {
    try {
        const result = await todo.addTask(req.body.description)
        res.status(200).json({id:result.id})

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

router.delete('/delete', async (req, res) => {
    try {
        await todo.deleteTask(req.query.id)
        res.status(200).json({id:req.query.id})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router