const express = require('express');
const mongoose = require('mongoose');
// const Task = require('./models/tasks');
// const taskRouter = require('./routes/tasks');
// const categoryRouter = require('./routes/categories');
const resturantRouter = require('./routes/resturants');
const super7Router = require('./routes/super');
const memeberRouter = require('./routes/newmembers');
const sweetRouter  = require('./routes/sweets');
const alcoholRouter = require('./routes/alcohol');
const auth = require('./routes/auth');
const userRouter = require('./routes/users');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const cors = require('cors');



mongoose.connect(process.env.DB,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true, useCreateIndex:true})
.then((db) =>
{
console.log("Sucessfully connected mongodb server");
},(err)=>console.log(err));

const app = express();
app.options('*',cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + "/public"));

app.use('/users',userRouter);
app.use('/upload', uploadRouter);
app.use('/Resturants',resturantRouter); 
app.use('/super7',super7Router); 
app.use('/members', memeberRouter)
app.use('/sweets', sweetRouter);
app.use('/alcohol', alcoholRouter);

// app.use(auth.verifyUser);

// app.use('/Tasks',taskRouter);
// app.use('/categories',categoryRouter);




(err,req,res,next) => {
    err.status = 500;
    err.json(err.message);
}
  
app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
})


