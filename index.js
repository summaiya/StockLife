const express = require('express');
const fs = require('fs');

//Get json file
const tourContent = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const app = express();
app.use(express.json())//Simple Middleware

//GET
app.get('/api/v1/tours', (req, res)=>{
    res.status(200).json(
        {
            status: "success",
            dataLength: tourContent.length,
            data: {
                tourContent
            }
        }
    );
})
//POST
app.post('/api/v1/tours', (req, res)=>{
    console.log(req.body);  
    res.send('Your Information Has Saved');
})


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Starting on ${PORT}`)
})

