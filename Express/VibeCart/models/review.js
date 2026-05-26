const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    comment:{
        type:String,
        required:true, 
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
},{timestamps:true});
module.exports=mongoose.model('Review',reviewSchema); 