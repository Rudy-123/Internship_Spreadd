const Order=require('../models/order')
const Product=require('../models/product')

exports.createOrder=async (req,res)=>{
    try{
        const {products,customerName,customerEmail}=req.body;
        if(!products||products.length===0){
            return res.status(400).json({
                success:false,
                message:'Provide atleast one product',
            });
        }
        let totalprice=0;
        let processedproducts=[];
        for(let item of products){
            const product=await Product.findById(item.productId);
            if(!product){
                return res.status(404).json({
                    success:false,
                    message:`Product not found:{item.productId}`,
                });
            }
            if(product.stock<item.quantity){
                return res.status(400).json({
                    success:false,
                    message:`Insufficient stock for the product: ${product.name}`,
                });
            }
            const itemTotal=(product.price)*(item.quantity);
            totalprice+=itemTotal;
            processedproducts.push({
                product:product._id,
                quantity:item.quantity,
                price:product.price,
            });
            product.stock-=item.quantity;
            await product.save();
        }
        const order=await Order.create({
            products:processedproducts,
            totalPrice:totalprice,
            customerName,
            customerEmail,
        });
        res.status(200).json({
            success:true,
            message:'Order created Successfully',
            data:order,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};  
