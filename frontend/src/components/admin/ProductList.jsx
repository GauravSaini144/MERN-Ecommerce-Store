import React, { useEffect } from 'react'
import { getAdminProducts, adminProductsError } from '../../features/products/adminProductApi'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import "./ProductList.css";
import { Link } from 'react-router-dom';
import { removeProduct, removeProductError, resetRemoveProduct } from '../../features/products/removeProductApi';
function ProductList() {
 const dispatch=useDispatch();
 const {loading, error, products}=useSelector((state)=>state.adminProducts);
 const {loading:removeLoading, error:removeError, success, message}=useSelector((state)=>state.removeProduct);
     useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(adminProductsError());
        }
        if(removeError){
          toast.error(removeError);
          dispatch(removeProductError());
      }
      if(success){
        toast.success(message);
        dispatch(resetRemoveProduct());
      }

        dispatch(getAdminProducts());
    },[dispatch, error, removeError, success, message]);

    const removeBtn=(id)=>{
      dispatch(removeProduct(id));
    }
  return (
    <>
    <title>Listed Products</title>
    <div className='dashboard-main'>
   <div className='dashboard-sidebar'>
 
 <Sidebar/>

   </div>
   <div className='all-products'>
    <div className='all-products-heading'>
        <h1>All Products</h1>
    </div>
   <div className="overflow-x-auto Table-main">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Product</th>
        <th>Product Id</th>
        <th>Stock</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { products && products.map((product)=>(
      <tr key={product._id}>
    
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" pro-img h-16 w-16">
                <img 
                  src={product.images[0].url}
                  alt="Product Image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{product.name}</div>
              {/* <div className="text-sm opacity-50">United States</div> */}
            </div>
          </div>
        </td>
        <td>
          {product._id}
        </td>
        <td>{product.stock}</td>
        <td>{product.price}</td>

        <th>
          <button className="btn btn-ghost btn-xs"><Link to={`/admin/product/${product._id}`}> Edit</Link></button>
          <button className="btn btn-ghost btn-xs" onClick={()=>removeBtn(product._id)} >Remove</button>
        </th>
      </tr>
    )) 
    }
   
     </tbody>
    {/* foot */}
   
    
  </table>
  {
        products.length===0?<><div className='no-products'><p>No Products</p></div></>:<></>
    }
</div>
   </div>
   </div>
   </>
  )
}

export default ProductList