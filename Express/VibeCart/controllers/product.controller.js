//CRUD for the category 
const Product=require('../models/product')

exports.createProduct=async (erq,res)=>{
    try{
        const{name,description,price,stock,category,image}=req.body;
        const product=new Product({
            name,
            description,
            price,
            stock,
            category,
            image,
        });
        const savedProduct=await product.save();
        res.status(201).json({
            success:true,
            message:'Prouct created Successfully',
            data:savedProduct,
        });
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        });
    }
};
exports.getallProducts=async (req,res)=>{
    try{
        //populate()->full details for the product not only id all the category details also displayed 
        const products=await Product.find().populate('category');
        res.status(200).json({
            success:true,
            count:products.length,
            data:products,
        });
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message,
        }); 
    }
};
exports.getProductbyId=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate('category');
        if(!product)
            res.status(404).json({
                success:false,
                message:'Product Not Found',
            });
        res.status(200).json({
            success:true,
            data:product    ,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};  
exports.updateProduct=async (req,res)=>{
    try{
        const product=await findByIdAndUpdate(
            req.params.id,req.body,
            {
                new:true,
                runValidatos:true,
            }
        );
        if(!product){
            res.status(404).json({
                success:false,
                message:'Category Not Found',
            });
        }
        res.status(200).json({
            success:true,
            message:'Product Updated Successfully',
            data:product,
        }); 
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        }); 
    }
};
exports.deleteProduct=async (req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            res.status(404).json({
                success:false,
                message:'Product Not Found',
            });
            res.status(200).json({
                success:true,
                message:'Product Deleted Successfully',
                data:product,
            });
        }
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        });
    }
};
exports.getProductsByCategory=async (req,res)=>{
    try{
        const products=await Product.find({
            category:req.params.categoryId//find the products by the category
        }).populate('category');
        if(!products||products.length()===0){
            return res.status(404).json({
                success:false,
                message:'Product not found for this category',
            });
        }
        res.status(200).json({
            success:true,
            count:products.length,
            data:products,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};