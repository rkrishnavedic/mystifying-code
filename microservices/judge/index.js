const amqp = require('amqplib');
const { sleep } = require('./utils');
const mongoose = require('mongoose');
const { SubmissionDetails } = require('./models/submissions');
require('dotenv').config()

const connectMongo = async ()=>{
    await mongoose.connect(process.env.MONGO_CLUSTER);
}
connectMongo();
const db = mongoose.connection;
db.on("error", ()=>console.log("error DB Connection!"));
db.once("open", ()=>{
    console.log('MongoDB: Connected!');
})

async function processMessage(msg){
    try{
        const jsonData = JSON.parse(msg.content);
        console.log(jsonData)
        
        let doc = await SubmissionDetails.findOneAndUpdate({"_id":jsonData["_id"]},{"verdict":"success", "stdout":"null"},{new: true, upsert: true});
        await sleep(2000);
        await doc.save();
        console.log(doc._id, " saved!")
        
    }catch(err){
        console.log(err);
    }
}

async function connect(){

    await sleep(2000);
    
    try{
        const rabbitConnection = await amqp.connect(process.env.RABBIT_CLUSTER);
        const rabbitChannel = await rabbitConnection.createChannel();
        const result = await rabbitChannel.assertQueue("submissions");

        console.log("Waiting for messages!");
        
        rabbitChannel.consume("submissions", processMessage);

    }catch(err){
        console.log(err);
    }
}

connect();