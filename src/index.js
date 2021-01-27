const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/task');
const taskRouter = require('./routers/user');


const app = express();
const port = process.env.PORT;


const multer = require('multer')

const upload = multer({
    dest: 'images',
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png)$/)){
            return cb(new Error('please upload jpg file'))
        }
        return cb(undefined, true)
    }
})


// const errorMiddleware = (req, res, next) => {
//     throw new Error('from error middleware')
// }

app.post('/upload', upload.single('upload'), (req, res) =>{
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('server connected on port ' + port);
})


