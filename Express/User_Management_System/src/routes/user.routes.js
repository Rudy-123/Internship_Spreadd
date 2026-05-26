const express=require('express')
const router=express.Router();
const userController =require('../controllers/userController')
const AuthMiddleware=require('../middlewares/auth.middleware')

router.get('/',userController.getAllUsers)
router.get('/:id',userController.getUserbyId)

router.post('/',AuthMiddleware,userController.createUser)
router.put('/:id',AuthMiddleware,userController.UpdateUser)
router.delete('/:id',AuthMiddleware,userController.deleteUser)

module.exports=router;