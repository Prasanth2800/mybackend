const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express());
const postRoute = require('./routes/post');
app.use('/app',postRoute);
const RegRoute = require('./routes/Register');
app.use('/users',RegRoute);
const studentsignroute = require('./routes/Studentlogin');
app.use('/students',studentsignroute);
const newRoute = require('./routes/Registerform');
app.use('/info',newRoute);
const studentdetailroute = require('./routes/Studentsroute');
app.use('/Details',studentdetailroute);

//connect to db

const mongoUri="mongodb+srv://prasanth:strainger@cluster0.1komd.mongodb.net/prasanth?retryWrites=true&w=majority"
mongoose.connect(mongoUri,{ useNewUrlParser: true },()=>{
    console.log("connected to db");
});

//connect to server

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("listening to 5000");
});