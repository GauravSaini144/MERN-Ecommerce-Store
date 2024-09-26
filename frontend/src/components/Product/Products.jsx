import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../features/products/productApi.js';
import Loader from '../Loader/Loader.jsx';
import ProductCard from '../ProductCard.jsx';
import "./Products.css"
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

import Skeleton from '../Loader/Skeleton.jsx';
const categories=[
  "laptop",
  "computer",
  "camera",
  "mobile",
  "shirt",
  "shoes",
  "tshirt",
  "bag"

]
function  Products() {
    const [currentPage, setCurrentPage]=useState(1);
    const [price, setPrice]=useState([0,150000]);
    const [category,setCategory]=useState("");

    const dispatch=useDispatch();
    
    const {loading, error, products, productsCount, productPerPage,filteredProductCount}=useSelector((state)=>state.Product);
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e);
    }
    const handlePrice=(e,newPrice)=>{
        setPrice(newPrice);
    }
    const {keyword}=useParams();
    const [searchParms]=useSearchParams();
    const productName=searchParms.get('name');



    useEffect(()=>{
      if(productName!=null){
        dispatch(getProduct(keyword,currentPage, price, productName));}
        else{
          dispatch(getProduct(keyword,currentPage, price));}

        
    },[dispatch, keyword, currentPage, productName]);


    const ApplyPriceFilter=()=>{
      dispatch(getProduct(keyword,currentPage, price,category));

    }

    let count=filteredProductCount;
    
    


  return ( 
   loading?(<><Skeleton/></>):(<> <title>Trendy Products</title> <div className='Products-heading'><h1>Products</h1> <hr className='h-4 color-black-900 w-full' /></div>
    <div className="dropdown filter-dropdown">
    <div tabIndex={0} role="button" className="filter-button">Filter</div>
    <div
      tabIndex={0}
      className="dropdown-content card card-normal text-white z-10 filter-card p-2 shadow">
      <div className="filterBox">
        <div className='price-filter text-black'>
            <Typography>Price</Typography>
            <Slider
        getAriaLabel={() => 'Temperature range'}
        value={price}
        onChange={handlePrice}
        valueLabelDisplay="on"
        // getAriaValueText={valuetext}
        min={0}
        max={110000}
      />
        </div>

        <div className='category-filter text-black'>
          <Typography>Category</Typography>
          <ul>
            {categories.map((category)=><li onClick={()=>setCategory(category)} className='category-link' key={category}>{category}</li>)}
          </ul>
        </div>
        <button className='btn'onClick={ApplyPriceFilter}>Apply</button>
      </div>
    </div>
  </div>
  <button className='nofilter-button'>No Filter</button>
  <div className='Products-Container'>
   
   <div className='Products'>
    
    {
        products&&products.map((product)=> <div key={product._id} className='products-block'> <ProductCard product={product} /></div>)
    }
   </div>
    </div><div className='bottom-div'></div>
    { (productPerPage===productsCount)?(<></>):(
    <div className="PaginationBox">
    <Pagination
    activePage={currentPage}
    itemsCountPerPage={productPerPage}
    totalItemsCount={productsCount}
    onChange={setCurrentPageNo}
    nextPageText=">"
    prevPageText="<"
    firstPageText="<<"
    lastPageText=">>"
    itemClass='page-item'
    linkClass='page-link'
    activeClass='pageItemActive'
    activeLinkClass="pageLinkActive"
    /></div>)}
   </>)

)
}

export default Products