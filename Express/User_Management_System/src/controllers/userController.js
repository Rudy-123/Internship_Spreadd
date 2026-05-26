const {users}=require('../config/database');
const {validateUser}=require('../utils/validators');
const {responseformat,generateId}=require('../utils/helpers');
const {STATUS_CODES}=require('../utils/constants');

const getAllUsers=(req,res)=>{
    res.status(STATUS_CODES.OK).json(
        responseformat(true,'Users Fetched Successfully',users)
    );
};
const getUserbyId=(req,res)=>{
    const {id}=req.params;
    const user=users.find(u=>u.id===parseInt(id));//find the required id
    if(!user){
        return res.status(STATUS_CODES.NOT_FOUND).json(
            responseformat(false,'User Not Found',null)
        ); 
    }
    res.status(STATUS_CODES.OK).json(
        responseformat(true,'User Fetched Successfully',user)
    );
    };
    const createUser=(req,res)=>{
        const {name,email,age}=req.body;
        const errors=validateUser({name,email,age});
        if(errors.length>0){
            return res.status(STATUS_CODES.BAD_REQUEST).json(
                responseformat(false,'Validation Failed',{errors})
            );
        }
        const newUser={
            id:generateId(),name,email,age:age||null,createdAt:new Date().toISOString()
        };
        users.push(newUser);
        res.status(STATUS_CODES.CREATED).json(
            responseformat(true,'User Created Successfully',newUser)
        );
    };
    const UpdateUser=(req,res)=>{
        const {id}=req.params;
        const {name,email,age}=req.body;
        const user=users.find(u=>u.id===parseInt(id));
        if(!user){
            return res.status(STATUS_CODES.NOT_FOUND).json(
                responseformat(false,'User Not Found',null)
            );
        }
        const errors=validateUser({name,email,age});
        if(errors.length>0){
            return res.status(STATUS_CODES.BAD_REQUEST).json(
                responseformat(false,'Validation failed',{errors})
            );
        }
        user.name=name;
        user.email=email;
        user.age=age||user.age;
        user.updatedAt=new Date().toISOString();
        res.status(STATUS_CODES.OK).json(
            responseformat(true,'User Updated Successfully')
        );
    };
    const deleteUser=(req,res)=>{
        const {id}=req.params;
        const index=users.findIndex(u=>u.id===parseInt(id));
        if(index===-1){
            return res.status(STATUS_CODES.NOT_FOUND).json(
                responseformat(false,'User Not Found')
            );
        }
        const deletedUser=users.splice(index,1);//splice(startindex,deletecount)
        res.status(STATUS_CODES.OK).json(
            responseformat(true,'User Data Deleted Successfully',deletedUser[0])
        );
    };
    module.exports={deleteUser,UpdateUser,createUser,getUserbyId,getAllUsers};
