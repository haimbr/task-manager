const mongoose = require('mongoose');





const Task = mongoose.model('Task', {
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

module.exports = Task;