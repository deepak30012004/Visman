const express= require('express');
const router= express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); 
const verifyauth=require('../middleware/verifyauth');
const verifyrole = require('../middleware/verifyrole'); 



const redis=require('redis');

const redisclient=redis.createClient();

redisclient.connect().then(()=> console.log('redisconnected'));




router.post('/addvisitor', verifyauth,verifyrole('staff'),async (req, res) => {
        const { name,visitorsrpose,email,security } = req.body;
         const checkintime=new Date();
          const hours = checkintime.getHours();

          if(hours>9 || hours>17){
            return res.status(400).json({ message: 'Check-in is only allowed between 9 AM and 5 PM' });
          }
         const formatcheckintime = checkintime.toISOString().slice(0, 19).replace('T', ' ');
    

        try {
      
            await pool.query('INSERT INTO visitor (name, purpose, email, checkintime,security) VALUES (?, ?, ?, ?)', [name, purpose, email, formatcheckintime,security]);
    
             return res.status(201).json({ message: 'Visitor checked in successfully' });
        } catch (error) {
            console.error('Error checking in visitor:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }


    }
);





router.get('/getvisitor',async (req,res)=>{

    const key='vis';

    try{
        const cachedata=await redisclient.get(key);

        if(cachedata){
            return res.status(200).json(JSON.parse(cachedata));
        }



        const [rows]=await pool.query('select * from visitor');

        await redisclient.setEx(key,(JSON.stringify(rows)),60);

         return res.status(200).json(rows);
    }
    catch(err){
        return res.json({msg:'issue'});
    }

}
);









// Export the router        
module.exports = router;
















