const request = require("supertest")

const URL = 'http://localhost:3001'

const newTask = {
    description: "My test task"
}

describe('GET /', () => {
    let task = null

    beforeAll(async () => {
        const response = await request(URL).post('/new').send(newTask)
        task = response.body
    })

    afterAll(async () => {
        await request(URL).delete(`/delete?id=${task.id}`)
    })

    test('Return 200', async () => {
        const response = await request(URL).get('/')

    })

    test('Should return todos', async () => {
        const response = await request(URL).get('/')
        expect(response.statusCode).toBe(200)
        expect(response.body.length >= 1).toBe(true)
    })
})

describe('POST/', () => {
    let task = null

    afterAll(async () => {
        await request(URL).delete(`/delete?id=${task.id}`)
    })

    test('Add new task', async () => {
        const response = await request(URL).post('/new').send(newTask)
        task = response.body
        expect(response.statusCode).toBe(200)
        expect(task.id).not.toBe(null)
    })
})

describe('DELETE/', () => {
    let task = null

    beforeAll(async () => {
        const response = await request(URL).post('/new').send(newTask)
        task = response.body
    })

    test('Delete task', async () => {
        const response = await request(URL).delete(`/delete?id=${task.id}`)
        expect(response.statusCode).toBe(200)
        expect(Number(response.body.id)).toBe(Number(task.id))
    })
})

describe('PUT/', () => {
    let task = null

    beforeAll(async () => {
        const response = await request(URL).post('/new').send(newTask)
        task = response.body
    })

    afterAll(async () => {
        await request(URL).delete(`/delete?id=${task.id}`)
    })

    test('Edit a task', async () => {
        const editedTask = {
            id: task.id,
            description: 'My edited task'
        }

        const response = await request(URL).put('/edit').send(editedTask)
        expect(response.statusCode).toBe(200)
        expect(Number(response.body.affectedRows)).toBe(1)
    })
})