const express = require('express');
const userRouter = express.Router();
const fs = require('fs');
const signup = require('./UserRoutesModules/sign-up');
const userData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`))
userRouter.use((req, res, next)=>{
    console.log("I am in userRoutes");
    next();
})


//ROUTE HANDLE ASSISTANCE----------------------------------------------------------------------------------------------------------------
const findItem = (items, itemFind)=>{
        return items.find(element=>element["_id"]===itemFind);
}
const successDataRes = {
    status: 'success',
    length: userData.length,
    data: userData
}
const notFoundRes = {
    status: 'failed',
    message: 'NOT FOUND'
}
const writeFileFunc = (HTTPMethods)=>{
    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(userData), (err)=>{
        if(err){
            console.log(`${HTTPMethods} is not successful. Error : ${err}`)
        }
    })
}

//ROUTE HANDLERS ---------------------------------------------------------------------------------------------------------------
const getAllUser = (req, res)=>{
    res.status(200).json(successDataRes);
}
const createUser = (req, res)=>{
    const newId =  userData[userData.length-1]["_id"] + 1;
    const newPack = Object.assign({"_id": newId}, req.body);
    userData.push(newPack);
    writeFileFunc('Create');
    res.status(201).json(successDataRes);    //SEND JSON version
}
const getUserInfo = (req, res)=>{
    const ans = findItem(userData, (req.params.id));
    if(ans === undefined){
        res.status(404).send(notFoundRes);
    }else{
        res.status(200).json(
            {
                status: 'success',
                data: ans
            }
        );
    }
}
const changeUserInfo = (req, res)=>{
    // console.log(req.params.id)
    // console.log(typeof req.params.id)
    const currentPack = findItem(userData, req.params.id);
    if(currentPack !== undefined){
        const inputData = req.body; //NEW Incoming Data
        const newCurrentPack = Object.assign(currentPack, inputData); // Update the Current Pack
        userData[userData.indexOf(currentPack)] = newCurrentPack; //Insert the Updated Current Pack to the tourContent
        writeFileFunc('PATCH'); 
        res.status(200).json(successDataRes)
    }
    else{
        res.status(404).json(notFoundRes)
    }
}

const deleteUserInfo = (req, res)=>{
    const deletePack = findItem(userData,(req.params.id));
   if(deletePack !== undefined){
        userData.splice(userData.indexOf(deletePack), 1);
        writeFileFunc('DELETE')
        res.status(200).json(successDataRes)
   }
   else{
    res.status(404).json(notFoundRes)
   }
}

//Router------------------------------------------------------------------------------------------
userRouter.route('/signup')
    .post(signup)
userRouter.route('/')
    .get(getAllUser)
    .post(createUser)
userRouter.route('/:id')
    .patch(changeUserInfo)
    .delete(deleteUserInfo)
    .get(getUserInfo)

module.exports = userRouter