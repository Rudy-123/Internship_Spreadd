const express=require('express');
const router=express.Router();
const reviewController=require('../controllers/review.controller');

router.post('/',reviewController.createReview);
router.post('/product/:productId',reviewController.getReviewsByProduct);
router.put('/:id',reviewController.updateReview);
router.delete('/:id',reviewController.deleteReview);

module.exports=router;