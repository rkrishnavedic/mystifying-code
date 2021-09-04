const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const amqp = require('amqplib');
const { SubmissionDetails } = require('./models/submissions');
require('dotenv').config();
const port = 4000 | process.env.PORT

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const conncetMongo = async ()=>{
    await mongoose.connect(process.env.MONGO_CLUSTER);
}
conncetMongo();
const db = mongoose.connection;
db.on("error", ()=>console.log("error DB Connection!"));
db.once("open", ()=>{
    console.log('MongoDB: Connected!');
})

app.get('/api/submissions', async (req, res)=>{
    try{
        SubmissionDetails.find({},(err,response)=>{
            if(err) res.send({"status":404,"err":err})
            else{
                res.send({"status":200,"data":response})
            }
        });
    }catch(err){
        res.send({"status":404,"err":err})
    }
});

app.post('/api/submit', async (req, res)=>{
    try{
        const submissionDetails = new SubmissionDetails(req.body);
        const rabbitConnection = await amqp.connect(process.env.RABBIT_CLUSTER);
        console.log('RabbitMQ: Connected!');
        const rabbitChannel = await rabbitConnection.createChannel();
        const result = await rabbitChannel.assertQueue("submissions");

        await rabbitChannel.sendToQueue("submissions", Buffer.from(JSON.stringify(submissionDetails)));
        console.log('RabbitMQ: Submission Success!');
        
        await submissionDetails.save();
        console.log('MONGODB: Saved');
        res.send({"status":200, "data":submissionDetails});
        rabbitConnection.close();

    }catch(err){
        res.send({"status":404,"err":err})
    }
});

app.listen(port, ()=>{
    // console.log(`Example running http://localhost:${port}`);
})