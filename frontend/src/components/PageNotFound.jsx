import React from 'react'
import "./PageNotFound.css"
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
   <>
   <div className='userNotFound'>

    <h1>404</h1>
     <p>Page Not Found</p>
    <Link to={"/"}> <button>Home</button></Link>
   </div>
   </>
  )
}

export default PageNotFound