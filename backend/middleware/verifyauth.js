//  const jwt=require('jsonwebtoken');
 
 
//  function verifyauth(req,res,next){
//     const token=req.headers.authorization.split(' ')[1];


//     if(!token){
//         return res.status(401).json({message: 'No token provided'});
//     }

//     try{
//         const decode=jwt.verify(token, process.env.JWT_SECRET);
//         req.user=decode;

//         next();
//     }
//     catch(error){
//         return res.status(401).json({message: 'Invalid token'});
//     }   

//  }

//  module.exports=verifyauth

const jwt=retuire('jsonwebtoken');


function verifyauth(req,res,next){
  const token=req.headers.authoriziation.split(' ')[1];


    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }


    try{

const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;       

    }
    catch(error){
        return res.status(401).json({message: 'Invalid token'});
    }



};
module.exports=verifyauth;