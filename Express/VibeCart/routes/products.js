const express=require('express')
const router=express.Router();
const productController=require('../controllers/product.controller');

router.post('/',productController.createProduct);
router.get('/',productController.getallProducts);
router.get('/:id',productController.getProductbyId);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

router.get('/category/:categoryId',productController.getProductsByCategory);

module.exports=router;