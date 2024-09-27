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
import { createNewProduct, newProductError, resetNewProduct } from '../../features/products/newProductApi';
import { useNavigate } from 'react-router-dom';
function NewProduct() {
 const dispatch=useDispatch();
 const navigate=useNavigate();
  const {error, loading, success, product}=useSelector((state)=>state.newProduct);
  useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(newProductError());
  }

  if(success){
    toast.success("product listed successfully");

    dispatch(resetNewProduct());
    navigate("/admin/products");
  }

  },[dispatch, success, error]);
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

  const [name, setName]=useState("");
  const [price, setPrice]=useState();
  const [description, setDescription]=useState("");
  const [stock, setStock]=useState();
  const [images, setImages]=useState([]);
  const [imagePreview, setImagePreview]=useState([]);
  const [category, setCategory]=useState("");

  const imageChange=(e)=>{
    const files=Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
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
    if(loading===false){
    dispatch(createNewProduct({name, price, description, stock, category, images}));
   
  }
  }
  return (
    <>
    <title>Trendy Create Product</title>
    <div className='dashboard-main'>
   <div className='dashboard-sidebar'>
 
 <Sidebar/>

   </div>
   <div className='new-product-main'>
    <div className='new-product-heading'>
        <h1>List a New Product </h1>
    </div>
    <form onSubmit={handleForm} className='new-product-form'>

    <label className="input input-bordered Form-field flex items-center gap-1">
  <LocalMallIcon/>
  <input type="text" className="field" placeholder="Product Name*" value={name} onChange={(e)=>setName(e.target.value)} />
</label>


<label className="input input-bordered flex Form-field items-center gap-1">
  <CurrencyRupeeIcon/>
  <input type="number" className="field" placeholder="Product Price*" value={price} onChange={(e)=>setPrice(e.target.value)}/>
</label>


<label className="input input-bordered flex Form-field items-center gap-1">
  <DescriptionIcon/>
  <input type="text" className="field" placeholder="Description*" value={description} onChange={(e)=>setDescription(e.target.value)} />
</label>


<label className="input input-bordered flex Form-field items-center gap-1">
 <ShowChartIcon/>
  <input type="number" className="field" placeholder="Stock*" value={stock} onChange={(e)=>setStock(e.target.value)} />
</label>

<label  className="input input-bordered flex Form-field items-center gap-1">
 <CategoryIcon/>
 <select className="border-none outline-none w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">Select Category</option>
  {categories.map((item) => (
    <option key={item} value={item}>{item}</option>
  ))}
</select>

</label>

<input type="file" className="file-input file-field file-input-bordered " name='avatar' multiple onChange={imageChange} />

<div className='upload-preview'>
    {imagePreview.map((image, index)=>(
      <img src={image} key={index} alt="Product Image" />
    ))}
</div>
 <button  className='create-btn'>{loading?<span className="loading loading-spinner loading-md"></span>:"Create"}</button>
    </form>
    </div>
    </div>
    </>
  )
}

export default NewProduct