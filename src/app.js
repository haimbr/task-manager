const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/task');
const taskRouter = require('./routers/user');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;