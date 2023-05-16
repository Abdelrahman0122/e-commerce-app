import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import {Link} from 'react-router-dom';

export default function Navbar({userData,logOut}) {
  return <>
    
   <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="" />
      </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">

        
{/* m7tageen n5ly da userData !== null lma el api y4ta88l */}
        {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
        
        <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Cart">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Brands">Brands</Link>
          </li>

    
        </ul>:null}

      

        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className='fab mx-2 fa-facebook' ></i>
          <i className='fab mx-2 fa-twitter' ></i>
          <i className='fab mx-2 fa-instagram' ></i>
          <i className='fab mx-2 fa-tiktok' ></i>
          <i className='fab mx-2 fa-linkedin' ></i>
          <i className='fab mx-2 fa-youtube' ></i>

          </li>
        
         {userData ==null ?   <>
        <li className="nav-item">
            <Link className="nav-link" to="Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Register">Register</Link>
          </li>
          </> :<li className="nav-item">
            <span className="nav-link cursor-pointer" onClick={logOut} >Logout</span>
          </li>}
       
          

    
        </ul>
        
      </div>
     </div>
   </nav>
   
    
    </>
  
}
