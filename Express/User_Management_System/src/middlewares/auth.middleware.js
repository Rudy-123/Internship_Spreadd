const {STATUS_CODES}=require('../utils/constants')
const AuthMiddleware=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            success:false,
            message:'No token Provided',
            data:null
        });
    }
    if(token!=='valid-token-123'){
        return res.status(STATUS_CODES.FORBIDDEN).json({
            success:false,
            message:'Invalid Token',
            data:null,
        });
    }next();
};
module.exports=AuthMiddleware;