const express=require('express');
const app=express();
const authroutes=require('./routes/auth');
const socket=require('socket.io');
const visitors=require('./routes/visitors');
const http = require('http');

// const server=http.createServer(app);


// const io=socket(server,{
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

















app.use(express.json());


app.use('/api',authroutes);

app.use('/',visitors);

module.exports.io=io;



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;