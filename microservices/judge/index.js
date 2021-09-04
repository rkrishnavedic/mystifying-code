const amqp = require('amqplib');
const { sleep } = require('./utils');
require('dotenv').config()

async function processMessage(msg){
    console.log('Got:'+msg.content.toString());
    setTimeout(()=>{
        console.log("Done")
    },2000);
}

async function connect(){
    
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