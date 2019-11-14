const express = require('express');
const fs = require('fs');

//Get json file
const tourContent = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//Activate Express
const app = express();
app.use(express.json())//Simple Middleware<--- It parsing json obj

//GET
app.get('/api/v1/tours', (req, res)=>{
    res.status(200).json(
        {
            status: "success",
            length: tourContent.length,
            data: tourContent
        }
    );
})

//GET Single Pack
app.get('/api/v1/tours/:id', (req, res)=>{
    const ans = tourContent.find(element=> element.id === JSON.parse(req.params.id));
    if(ans === undefined){
        res.status(404).send({
            status: 'failed',
            message: 'NOT FOUND'
        });
    }else{
        res.status(200).json(
            {
                status: 'success',
                data: ans
            }
        );
    }
})

//POST
app.post('/api/v1/tours', (req, res)=>{
    const incomingID =  tourContent[tourContent.length-1].id + 1;
    const newPack = Object.assign({id: incomingID}, req.body);
    tourContent.push(newPack);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourContent), (err)=>{
        console.log(err)
    })
    //SEND JSON version
    res.status(201).json(
        {
            status: 'success',
            length: tourContent.length,
            data: tourContent
        }
        );
    //res.send('Your Information Has Saved');
})
//UPDATE (PUT, PATCH)
app.patch(`/api/v1/tours/:id`, (req, res)=>{
    const currentPack = tourContent.find(element=>JSON.parse(req.params.id)===element.id);
    
    if(currentPack !== undefined){
        const inputData = req.body;
        const newCurrentPack = Object.assign(currentPack, inputData);

        tourContent[tourContent.indexOf(currentPack)] = newCurrentPack;

        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourContent), (err)=>{
            console.log(`patch error : ${err}`)
        })

        res.status(200).json({
            status: 'success',
            length: tourContent.length,
            data: tourContent
        })
    }
    else{
        res.status(404).json({
            status: 'failed',
            message: 'NOT FOUND ITEM'
        })
    }

})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Starting on ${PORT}`)
})
