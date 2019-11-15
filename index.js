const express = require('express');
const dotEnv = require('dotenv');
dotEnv.config({path : "./config.env"});

const morgan = require('morgan');
const tourRouter = require('./Routes/TourRoutes');
const userRouter = require('./Routes/UserRoutes');
//Activate Express
const app = express();
//Middlewares
    app.use(express.json());//Simple Middleware<--- It parsing json obj.
    console.log(`You are in ${process.env.NODE_ENV} Mode`)
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
    console.log(`Server is Starting on ${PORT}`)
})
