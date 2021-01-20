const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/task');
const taskRouter = require('./routers/user');

// const User = require('./models/user');
// const Task = require('./models/task');



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// app.post('/users', async (req, res) => {
//     const user = new User(req.body)

//     try {
//         await user.save()
//         res.status(201).send(user);
//     }catch(err){
//         res.status(400).send(err);
//     }

// })


// app.get('/users/getAll', async (req, res) =>{

//     try{
//         const users = await User.find({});
//         res.status(201).send(users);
//     }catch(err){
//         res.status(400).send(err);
//     }

// })

// app.get('/users/:id', async (req, res) =>{
//     const _id = req.params.id;

//     try{
//         const user = await User.findById(_id);
//         if(!user)
//             return res.status(404).send()
//         res.send(user);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })


// app.patch('/users/:id', async (req, res) =>{
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'email', 'password', 'age'];
//     const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));

//     if(!isValidUpdates){
//         return res.status(400).send({error: 'invalid update!'})
//     }

//     try{
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         if(!user)
//             return res.status(404).send()
//         res.send(user);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// app.delete('/users/:id', async (req, res) =>{
    
//     try{
//         const user = await User.findByIdAndDelete(req.params.id);
//         if(!user)
//             return res.status(404).send()
//         res.send(user);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })


// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)

//     try{
//         await task.save();
//         res.status(201).send(task);
//     }catch(err){
//         res.status(400).send(err);
//     }
// })


// app.get('/tasks/getAll', async (req, res) =>{

//     try{
//         const tasks = await User.find({})
//         res.send(tasks);
//     }catch(err){
//         res.status(400).send(err);
//     }
// })


// app.get('/tasks/:id', async (req, res) =>{
//     const _id = req.params.id;

//     try{
//         const task = await Task.findById(_id)
//         if(!task)
//             return res.status(404).send()
//         res.send(task);
//     }catch(err){
//         res.status(500).send(err);
//     }

// })


// app.patch('/tasks/:id', async (req, res) =>{
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['description', 'completed'];
//     const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));

//     if(!isValidUpdates){
//         return res.status(400).send({error: 'invalid update!'})
//     }

//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         if(!task)
//             return res.status(404).send()
//         res.send(task);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })


// app.delete('/tasks/:id', async (req, res) =>{

//     try{
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if(!task)
//             return res.status(404).send()
//         res.send(task);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })



app.listen(port, () => {
    console.log('server connected on port ' + port);
})