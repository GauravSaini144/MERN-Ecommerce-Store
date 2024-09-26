
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import asyncError from "../middleware/asyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary"

// admin only
export const createProduct=asyncError(async(req,res,next)=>{
   
    const images=[];

    if(typeof req.body.images==="string"){
    images.push(req.body.images);
    }else{
        images.push(...req.body.images);

    }

    const imagesLink=[];
    for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:"products",
        });

        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url,
        });
    }

    req.body.images=imagesLink;
    
   req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(200).json({
        success:true,
        product,
    });
});
 
// get all products admin  
export const getProducts=asyncError(async(req,res,next)=>{

    const products=await Product.find();

    res.status(200).json({
        success:true,
        products
    });
})

export const getAllProduct=asyncError(async(req,res,next)=>{
    const productPerPage=15;
 const countProduct= await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(), req.query).search().filter().pagination(productPerPage);
     let products=await apiFeature.query;
     let filteredProductCount=products.length;
    res.status(200).json({success:true,products,countProduct, productPerPage, filteredProductCount});
    });
// admin only 
export const updateProduct=asyncError(async(req,res,next)=>{
    
    let product= await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({success:false,message:"Product not found"});
    }

    
    const images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images);
        }else{
            images.push(...req.body.images);
    
        }
         if(images!==undefined && req.body.images.length>0){
        
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            
        }
    

   const imagesLink=[];
    for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:"products",
        });

        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url,
        });
    }
req.body.images=imagesLink;

}else {
    req.body.images=product.images;
}
        
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
});



// admin only 
export const deleteProduct=asyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    const images=[...product.images];
    for (let i = 0; i < images.length; i++) {
        await cloudinary.v2.uploader.destroy(images[i].public_id);
        
    }
   await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({success:true,message:"product deleted successfully"});

}
);
export const productDetail=asyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found ",404));
    }
    res.status(200).json({success:true,product});

    

    
});


// create new review and update thr review

export const createProductReview=asyncError(async(req,res,next)=>{
    const {rating, comment, productId}=req.body;
    const review={
     user:req.user._id,
     name:req.user.name,
     rating:Number(rating),
     comment,
    };

    const product=await Product.findById(productId);
    
    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    if(isReviewed){
      
     product.reviews.forEach((rev)=>{
        if(rev.user.toString()===req.user._id.toString()){
        (rev.rating=rating), (rev.comment=comment)}
    });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let avg=0;
 product.reviews.forEach(
        rev=> {avg+=rev.rating
})

 product.ratings=avg/product.reviews.length;
  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true,
  });
})

// get all previews of the product

export const getProductReviews=asyncError(async(req,res,next)=>{

     const product=await Product.findById(req.query.id);

     if(!product){
        return next(new ErrorHandler("Product not found",404));
     }
     res.status(200).json({
        success:true,
        reviews:product.reviews,
     });
});

// Delete review
export const deleteReview=asyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",404));

    }

    const reviews = product.reviews.filter(
    (rev)=>rev._id.toString()!==req.query.id.toString()
    );

    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating ;
    });
    let ratings=avg/reviews.length;
    const numOfReviews=reviews.length;
    if(reviews.length==0){
     ratings=0;
    }
        
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
});