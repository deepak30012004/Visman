const express=require('express');

const app=express();

 

app.use(express.json());

const ratelimiter=require('express-rate-limit');


const limiter=ratelimiter({
    windowMs:5*60*1000,
    max:20,
    msg:'Too many requests from this IP, please try again later.'
});


const mysql=require('mysql2/promise');

const pool=mysql.createPool({
    host:'localhost',
    database:'visitor',
   user:'root',
   password:'1234'
});



const redis=require('redis');

const redisclient=redis.createClient();

redisclient.conntect().then(() => {
    console.log('Connected to Redis');
}).catch(err => {
    console.error('Redis connection error:', err);
});


const nodemailer=require('nodemailer');



const transporter=nodemailer.createTransport({
   auth: {  
         user:'deppa',
         pass:'1234'     

   },
   services:'gmail'
});



const http = require('http');

const server=http.createServer(app);
const socket=require('socket.io');

const io=socker(server,{
    origin:'*',
    methods:['GET','POST']
}); 



io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});



function  otp(){
    const a='';
for(const i=0;i<6;i++){
    a=a+Math.floor(Math.random()*10);
}
    return a;

};














app.post()




app.get('/user',async (req, res) => {
    const cache=redisclient.get('user');
    if(cache){
        return res.status(200).json(JSON.parse(cache));
    }

    try{
cosnt [rows]=await pool.query('select * from user');
    await transporter.sendMail({
        from: 'deepakk30012004@gmial.com',
        to: 'deepsingh30012004@gmail.com',
        subject: 'User Data Retrieved',
        text: 'User data has been successfully retrieved: ${JSON.stringify(rows)}'

    });


    socket.emit('getusers', rows);
    await redisclient.setEx('user',(JSON.stringify(rows)),60);
    return res.status(200).json(rows);

    }
    catch(err){
        return res.status(500).json({message:'Internal server error'});
    }







});