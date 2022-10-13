const express = require('express')
const router = express.Router()
const todo = require('../services/todo.js')

router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await todo.getAllTasks())
    } catch (err) {
        next(err)
    }
})

router.post('/new', async (req, res, next) => {
    try {
        const result = await todo.addTask(req.body.description)
        res.status(200).json({id:result.id})

    } catch (err) {
        next(err)
    }
})

router.delete('/delete', async (req, res, next) => {
    try {
        await todo.deleteTask(req.query.id)
        res.status(200).json({id:req.query.id})
    } catch (err) {
        next(err)
    }
})

router.put('/edit', async (req, res, next) => {
    try {
        res.status(200).json(await todo.updateTask(req.body))
    }
    catch (err) {
        next(err)
    }
})

module.exports = router