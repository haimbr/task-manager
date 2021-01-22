const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        validate(description){
            if(description.length < 2)
                throw new Error('description is too short')
        }
    },
    
    completed: {
        type: Boolean,
        default: false,
    },
})


taskSchema.pre('save', async function (next){
    const task = this;

    if(task.isModified('password')){
        task.password = bcrypt.hash(task.password, 8);
    }

    next();
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task;