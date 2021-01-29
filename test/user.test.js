const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'haim',
    email: 'asd5828@gmail.com',
    password: 'fjejtjee9',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


beforeEach( async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

afterAll(async () => { 
    await mongoose.disconnect();
})



// test('should signup a new user', async () => {
//     const response = await request(app).post('/users/signup').send({
//         name: 'haim1',
//         email: 'haimbr97@gmail.com',
//         password: 'asdf9583!fj@'
//     }).expect(201)

//     const user = await User.findById(response.body.user._id)
//     expect(user).not.toBeNull();

//     expect(response.body).toMatchObject({
//         user:{
//             name: 'haim1',
//             email: 'haimbr97@gmail.com',
//         }
//     })

//     expect(user.password).not.toBe('asdf9583!fj@')
// })


// test('should login', async () => {
//     const response = await request(app).post('/users/login').send({
//         email: userOne.email,
//         password: userOne.password
//     }).expect(200)

//     const user = await User.findById(response.body.user._id);
//     expect(user.tokens.length).toBe(2);
// })


// test('wrong email should not login', async () => {
//     await request(app).post('/users/login').send({
//         email: 'dkfkfkak',
//         password: userOne.password
//     }).expect(400)
// })


// test('should get user', async () => {
//     await request(app).get('/users/me')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200)
// })

// test('should not get user for unAuthorization user', async () => {
//     await request(app).get('/users/me')
//     .send()
//     .expect(401)
// })


// test('should delete user', async () => {
//     await request(app).delete('/users/delete')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200)

//     const user = await User.findById(userOneId);
//     expect(user).toBeNull();
// })

// test('should not delete user unAuthorization user', async () => {
//     await request(app).delete('/users/delete')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}123`)
//     .send()
//     .expect(401)
// })



test('should upload avatar image', async () => {
    await request(app)
    .post('/user/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/aa.JPG')
    .expect(200)
})