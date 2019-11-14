const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./Routes/TourRoutes');
//Activate Express
const app = express();
app.use(express.json());//Simple Middleware<--- It parsing json obj
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter)
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Starting on ${PORT}`)
})
