const Review=require('../models/review')
const Product=require('../models/product');

exports.createReview=async (erq,res)=>{
    try{
        const{rating,comment,productId,userName}=req.body;
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found',
            });
        }
        const review=new Review({
           rating,
           comment,
           product:productId,
           userName,
        });
        const savedReview=await review.save();
        res.status(201).json({
            success:true,
            message:'Review created Successfully',
            data:savedReview,
        });
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        });
    }
};
exports.getReviewsByProduct=async (req,res)=>{
    try{
        const reviews=await Review.find({
            product:req.paras.productId,
        }).populate('product');
        res.status(200).json({
            success:true,
            count:reviews.length,
            data:reviews,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }   
};
exports.updateReview=async(req,res)=>{
    try{
        const review=await Review.findByIdandUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,
            }
        );
        if(!review){
            return res.status(404).json({
                success:false,
                message:'Review Not found',
            });
        }
        res.status(200).json({
            sucess:true,
            message:'Review Updated Successfully',
            data:review,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
exports.deleteReview=async (req,res)=>{
    try {
      const review=await Review.findByIdAndDelete(req.params.id);
      if(!review){
        return res.status(404).json({
          success:false,
          message:'Review not found',
        });
      }
      res.status(200).json({
        success:true,
        message:'Review deleted successfully',
        data:review,
      });
    } catch(error) {
      res.status(500).json({
        success:false,
        message:error.message,
      });
    }
};