const {STATUS_CODES}=require('../utils/constants');
const errorHandler=(err,req,res,next)=>{
    console.error('Error',err.message);
    const status=err.status||STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message=err.message||'Something Went Wrong';
    res.status(status).json({
        success:false,
        message,
        data:process.env.NODE_ENV==='production'?null:err,
        timestamp:new Date().toISOString()
    });
};
module.exports=errorHandler;