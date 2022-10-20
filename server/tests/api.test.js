const request = require("supertest")

const URL = 'http://localhost:3001'

const newTask = {
    description: "My test task"
}

describe('GET /', ()=>{
    let task = null

    beforeAll(async ()=>{
        const response = await request(URL).post('/new').send(newTask)
        task = response.body
    })

    afterAll(async()=>{
        await request(URL).delete(`/delete?id=${task.id}`)
    })

    test('Return 200', async()=>{
        const response = await request(URL).get('/')
        expect(response.statusCode).toBe(200)
    })

    test('Should return todos', async()=>{
        const response = await request(URL).get('/')
        expect(response.body.length >= 1).toBe(true)
    })
})

