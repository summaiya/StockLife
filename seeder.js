const seeder = (connectionString, fileDirectory, iOrd, dataModel)=>{
    //============================
    const fs = require("fs");
    const mongoose = require("mongoose");
    //============================

    //Connect to DB
    const connectDB = async ()=>{ 
        try{
            const conn = await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`.bgGrey);
        }catch(err){
            console.error(`MONGODB NOT CONNECTED ${err}`.red);
        }
    };
   connectDB();

    //Import into DB
    const insertData = async ()=>{
        //Read JSON Files
        const data = JSON.parse(fs.readFileSync(fileDirectory, "utf-8"))
        try{
            await dataModel.create(data)
            console.log("Data Imported....".blue.inverse);
            process.exit();
        }catch(error){
            console.log(error)
        }
    }
    const deleteData = async ()=>{
        try{
            await dataModel.deleteMany()
            console.log("Data Deleted....".red.inverse);
            process.exit();
        }catch(error){
            console.log(error)
        }
    }
    if(iOrd === "i"){
        insertData()
    }else if (iOrd === "d"){
        deleteData()
    }
}

//Outside================================
const color = require('colors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});//<-example (Path that connects to your own config)
const dataModel = require("./Model/reviewModeling")//<-example (insert your own data model)
//Outside================================
const databaseConnectApp = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD); //Replace the password
seeder(databaseConnectApp, `${__dirname}/_data/bootcamps.json`, "d", dataModel)
/**
 * Arg 1: Connection URL
 * Arg 2: File Path
 * Arg 3: "d" for delete "i" for insert
 * Arg 4: Data model
 */