const color = require('colors');
const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require("mongoose")

//Error Handing Imports======================
const ErrorClass = require("./util/ErrorClass");
const MainErrorHandler = require("./util/Main-Error-Handle")
//Error Handing Imports======================



dotEnv.config({path : "./config.env"});

//Connect Mongoose-----------------
const databaseConnectApp = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD); //Replace the password
mongoose.connect(databaseConnectApp, {
    'useNewUrlParser': true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    "useUnifiedTopology": true
}).then((data)=>{
    // console.log("data", data)
    console.log("Database Connected")
}).catch(error=>console.log("Error:", error))
//Connect Mongoose-----------------
const morgan = require('morgan');
const tourRouter = require('./Routes/TourRoutes');
const userRouter = require('./Routes/UserRoutes');



//Activate Express
const app = express();
//Middlewares
    app.use(express.json());//Simple Middleware<--- It parsing json obj.
    console.log(`You are in ${process.env.NODE_ENV} Mode`.blue)
//Dev or Pro
    if(process.env.NODE_ENV === "development"){
        app.use(morgan('dev'));
    }
// app.use(express.static(`${__dirname}/public`)) //<---------------------It activates the user accessibilities for all files in public folder

//Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Handling wrong url: if above router didn't work, it will use the below Middleware
app.use("*", (req, res, next)=>{
    next(new ErrorClass(`the orignal url is not found ${req.originalUrl}`, 404));
})

//Main Error handling
app.use(MainErrorHandler)


//Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Starting on ${PORT}`.grey)
})

