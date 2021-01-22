const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch(err){
        if(err.code === 11000 ){
           return res.status(400).send('the email is already exists') 
        }
        res.status(400).send(err);
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(err){
        res.status(400).send()
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save();
        res.send();
    }catch(err){
        res.status(500).send();
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send();
    }catch(err){
        res.status(500).send();
    }
})



router.get('/users/me', auth, async (req, res) =>{
    res.send(req.user);
})




router.patch('/users/update', auth, async (req, res) =>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdates){
        return res.status(400).send({error: 'invalid update!'})
    }

    try{

        const user = await User.findById(req.user._id);
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();

        if(!user)
            return res.status(404).send()
        res.send(user);
    }catch(err){
        res.status(500).send(err);
    }
})

router.delete('/users/delete', auth, async (req, res) =>{
    
    try{
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user)
        //     return res.status(404).send()
        await req.user.remove();
        res.send(req.user);
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;