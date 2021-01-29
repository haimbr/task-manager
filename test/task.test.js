const request = require('supertest');
const mongoose = require('mongoose');
const Task = require('../src/models/task');
const app = require('../src/app');
const {
    userOneId,
    userOne,
    taskOne,
    taskTow,
    taskThree,
    userTowId,
    userTow,
    setUpDataBase,
} = require('./fixtures/db')

beforeEach(setUpDataBase);


afterAll(async () => { 
    await mongoose.disconnect();
})


test('should create task for user' ,async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'new test task'
    })
    .expect(201)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
})


test('should get userOne tasks' ,async () => {
    const response = await request(app).get('/tasks/getAll')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toEqual(2)
    
})

test('should not get others user tasks' ,async () => {
    const response = await request(app).get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTow.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
    
})

