const color = require('colors');
const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require("mongoose")
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
    if(process.env.NODE_ENV === "development"){
        app.use(morgan('dev'));
    }
    // app.use(express.static(`${__dirname}/public`)) //<---------------------It activates the user accessibilities for all files in public folder

//Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Starting on ${PORT}`.grey)
})

