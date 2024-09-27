import React, {useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "./NewProduct.css"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getproductDetails, clearAllErrors } from '../../features/products/productDetailApi';
import { updateMyProduct, updateProductReset, updateProductError } from '../../features/products/updateProductApi';
function UpdateProduct() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {error, product, loading}=useSelector((state)=>state.productDetails);
    const {error:updateError, loading:updateLoading, isUpdated}=useSelector((state)=>state.updateProduct);
     const {id}=useParams();
         const categories=[
       "laptop",
       "computer",
       "camera",
       "mobile",
       "shirt",
       "shoes",
       "tshirt",
       "bag",
       "Mens",
       "Womens",
     ];
   
     const [name, setName]=useState('');
     const [price, setPrice]=useState();
     const [description, setDescription]=useState('');
     const [stock, setStock]=useState();
     const [images, setImages]=useState([]);
     const [imagePreview, setImagePreview]=useState([]);
     const [oldImgPreview, setOldImgPreview]=useState([]);

     const [category, setCategory]=useState('');
   
     const imageChange=(e)=>{
       const files=Array.from(e.target.files);
       setImages([]);
       setImagePreview([]);
       setOldImgPreview([]);
       files.forEach((file)=>{
      const reader= new FileReader();
      reader.onload=()=>{
       if(reader.readyState===2){
         setImagePreview((image)=>[...image, reader.result]);
         setImages((image)=>[...image, reader.result]);
       }
      };
      reader.readAsDataURL(file);
       })
     }
   
     const handleForm=(e)=>{
       e.preventDefault();
       if(updateLoading===false){
       dispatch(updateMyProduct(id, {name, price, description, stock, category, images}));
      
     }
     }
   


     useEffect(()=>{
        if(error){
          toast.error(error);
          dispatch(clearAllErrors());
        }
        if(updateError){
            toast.error(updateError);
            console.log(updateError);
            dispatch(updateProductError());
        }
        if(isUpdated){
            toast.success("product updated");
            dispatch(updateProductReset());
            navigate("/admin/products");
        }
      if(product&&product._id!==id){
      dispatch(getproductDetails(id));}
      else{
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setDescription(product.description);
        setOldImgPreview(product.images);
        console.log(product);
        
       }
      }
        ,[dispatch, error, id, product, isUpdated, updateError]);
   
     return (
       <>
       <title>Trendy Update Product</title>
       { product&&
       <div className='dashboard-main'>
      <div className='dashboard-sidebar'>
    
    <Sidebar/>
   
      </div>
      <div className='new-product-main'>
       <div className='new-product-heading'>
           <h1>List a New Product </h1>
       </div>
       <form onSubmit={handleForm} className='new-product-form'>
   
       <label className="input input-bordered flex items-center gap-1">
     <LocalMallIcon/>
     <input type="text" className="field" placeholder="Product Name*" value={name} onChange={(e)=>setName(e.target.value)} />
   </label>
   
   
   <label className="input input-bordered flex items-center gap-1">
     <CurrencyRupeeIcon/>
     <input type="number" className="field" placeholder="Product Price*" value={price} onChange={(e)=>setPrice(e.target.value)}/>
   </label>
   
   
   <label className="input input-bordered flex items-center gap-1">
     <DescriptionIcon/>
     <input type="text" className="field" placeholder="Description*" value={description} onChange={(e)=>setDescription(e.target.value)} />
   </label>
   
   
   <label className="input input-bordered flex items-center gap-1">
    <ShowChartIcon/>
     <input type="number" className="field" placeholder="Stock*" value={stock} onChange={(e)=>setStock(e.target.value)} />
   </label>
   
   <label  className="input input-bordered flex items-center gap-1">
    <CategoryIcon/>
    <select className="border-none outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
     <option value="">Select Category</option>
     {categories.map((item) => (
       <option key={item} value={item}>{item}</option>
     ))}
   </select>
   
   </label>
   
   <input type="file" className="file-input file-input-bordered w-full max-w-xs file-field" name='avatar' multiple onChange={imageChange} />
   
   <div className='upload-preview'>
       {imagePreview.length!==0? imagePreview.map((image, index)=>(
         <img src={image} key={index} alt="Product Image" />
       ))
    :oldImgPreview&&oldImgPreview.map((image)=>(
        <img src={image.url} alt="Product Image" />
    ))
    }
   </div>
    <button  className='create-btn'>{updateLoading?<span className="loading loading-spinner loading-md"></span>:"Update"}</button>
       </form>
       </div>
       </div>

}
       </>
     )
   }

export default UpdateProduct