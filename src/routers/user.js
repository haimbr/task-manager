const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router();

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
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
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();
        res.send(req.user);
    }catch(err){
        res.status(500).send(err);
    }
})

router.delete('/users/delete', auth, async (req, res) =>{
    
    try{
        await req.user.remove();
        sendCancelationEmail(req.user.email, req.user.name);
        res.send(req.user);
    }catch(err){
        res.status(500).send(err);
    }
})




const upload = multer({
    limits: 1_000_000,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(JPG|png)$/)){
            return cb(new Error('please upload jpg file'))
        }
        return cb(undefined, true)
    }
})



router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) =>{
    console.log('gggg')
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send()
},(error, req, res, next) => {
    res.status(400).send({error: error.message})
})


router.delete('/user/me/avatar', auth, async (req, res) =>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
})


router.get('/user/:id/avatar', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar);
    }catch(err){
        res.status(400).send
    }
})


module.exports = router;