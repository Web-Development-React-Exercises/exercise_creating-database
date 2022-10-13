const db = require('./db.js')
const helper = require('../helper.js')

async function getAllTasks() {
    const rows = await db.query('select * from task')
    return helper.emptyOrRows(rows)
}

async function addTask(task) {
    const result = await db.query('insert into task (description) values (?)',[task])
    result.id = result.insertId
    return result
}

async function deleteTask(id) {
    await db.query('delete from task where id = ?', [id])
    return id
}

async function updateTask(task) {
    const result = await db.query('update task set description = ? where id = ?',[task.description,task.id])
    return result
}

module.exports = { 
    getAllTasks,
    addTask,
    deleteTask,
    updateTask
}