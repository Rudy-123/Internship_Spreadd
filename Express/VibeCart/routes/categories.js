//API Endpoints for categories
const express=require('express')
const router=express.Router();
const categoryController=require('../controllers/category.controller');

router.post('/',categoryController.createCategory);
router.get('/',categoryController.getallcategories);
router.get('/:id',categoryController.getCategorybyId);
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);

module.exports=router;