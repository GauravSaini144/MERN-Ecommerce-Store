import React from 'react'
import "./Sidebar.css"
import {Link} from "react-router-dom"
function Sidebar() {
  return (
    <>
    <div className='sidebar-main'>
     <div className='sidebar-heading'>
        <p>Trendy</p>
     </div>
      <div className='sidebar-actions'>
      <Link to={"/admin/dashboard"}>
        <div>
           <p> Dashboard</p>
        </div></Link>
        
        <div className='dropdown dropdown-bottom'>
         <p tabIndex={0} role="button">
            Products</p>

     <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><Link to={"/admin/products"}>All</Link></li>
      <li><Link to={"/admin/product"}>Create</Link></li>
     </ul>
        </div>
        <div><Link to={"/admin/orders"}>
        <p>
            Orders</p>
            </Link>
        </div>
        <Link to={"/admin/users"}>
        <div>
        <p>
            Users</p>
        </div></Link>
        {/* <Link to={"/admin/reviews"}>
        <div>
          <p>
            Reviews</p></div></Link> */}
      </div>
    </div>
    </>
  )
}

export default Sidebar