const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, 'haimyonabrandesdorfer')
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});

        if(!user){
            throw new Error();
        }
        req.user = user;
        console.log(user)
        console.log(req.user)
        req.token = token;
        next();
        
    }catch(err){
        res.status(401).send({error: 'please authenticate'})
    }
}


module.exports = auth;