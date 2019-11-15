const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./Routes/TourRoutes');
const userRouter = require('./Routes/UserRoutes');
//Activate Express
const app = express();
//Middlewares
app.use(express.json());//Simple Middleware<--- It parsing json obj
app.use(morgan('dev'));


//Router
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
//Listener
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Starting on ${PORT}`)
})
