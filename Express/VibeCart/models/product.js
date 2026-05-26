const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,//stores 24 character mongodb id of category
        ref:'Category',//tells mongoose which model this ID belongs to
        required:true,
    },
    image:{
        type:String,
        default:'no-image.jpg',
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5,
    },
},{timestamps:true});
module.exports=mongoose.model('Product',productSchema);