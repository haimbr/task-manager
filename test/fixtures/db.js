const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');


const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'haim',
    email: 'asd5828@gmail.com',
    password: 'fjejtjee9',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


const userTowId = new mongoose.Types.ObjectId();
const userTow = {
    _id: userTowId,
    name: 'tzipi',
    email: 'tz.s5310@gmail.com',
    password: 'frjejtjee9',
    tokens: [{
        token: jwt.sign({ _id: userTowId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first test task',
    owner: userOne._id
}

const taskTow = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second test task',
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third test task',
    owner: userTow._id
}

const setUpDataBase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTow).save();
    await new Task(taskOne).save();
    await new Task(taskTow).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    taskOne,
    taskTow,
    taskThree,
    userTowId,
    userTow,
    setUpDataBase,
}
