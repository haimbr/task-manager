const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb+srv://haim:vys4MT0CoMFwqux7@cluster0.tidnf.mongodb.net/task-manager-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});




// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(description){
//             if(description.length < 2)
//                 throw new Error('description is too short')
//         }
//     },
    
//     completed: {
//         type: Boolean,
//         default: false,
//     },

//     // email: {    
//     //     type: String,
//     //     validate(email){
//     //         if(!validator.isEmail(email))
//     //             throw new Error('email is invalid')
//     //     }
//     // },
// })





// const task = new Task({
//     description: 'learn mongoose library',
//     completed: true,
// })

// task.save().then((res) =>{
//     console.log(task)
// }).catch(err =>{
//     console.log('err!', err)
// })