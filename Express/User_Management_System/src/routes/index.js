//all routes at 1 place
const express=require('express')
const router=express.Router()
const userroutes=require('./user.routes')

router.use('/users',userroutes)

router.get('/check',(req,res)=>{
    res.json({
        success:true,
        message:'API Running',
        timestamp:new Date().toISOString()
    });
});
module.exports=router;