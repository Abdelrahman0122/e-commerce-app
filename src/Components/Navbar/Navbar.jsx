import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import {Link} from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';



export default function Navbar({userData,logOut}) {

  // hwa fe 7agat kteer fe el cart context fa ana b5tar ely 3ayezo maben el {}
let {numOfCartItems} = useContext(cartContext);

  return <>
    
   <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
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
            <Link className="nav-link" to="Products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Categories">Categories</Link>
          </li>

    
        </ul>:null}

      

        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item d-flex align-items-center m-1">
        <a href='https://www.facebook.com/profile.php?id=100003799342442'><i className='fab mx-2 fa-facebook' ></i></a>   
          <a href='https://www.instagram.com/abdelrahman_elsayed123/'><i className='fab mx-2 fa-instagram' ></i></a>   
          <a href='https://www.linkedin.com/in/abdelrahman-elsayed-828736234/'><i className='fab mx-2 fa-linkedin' ></i></a>   
      <a href='https://github.com/Abdelrahman0122'><i className='fab mx-2 fa-github' ></i></a>    
        
      </li>
        
         {userData ==null ?   <>
        <li className="nav-item">
            <Link className="nav-link" to="Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Register">Register</Link>
          </li>
          </> :<><li className="nav-item position-relative">
            <Link className="nav-link" to="Cart">
              <i className='fas fa-shopping-cart fa-lg'></i>
            <span className='badge position-absolute top-0 end-0 bg-main text-white'>{numOfCartItems}</span>
            </Link>
          </li><li className="nav-item">
            <span className="nav-link cursor-pointer" onClick={logOut} >Logout</span>
          </li></>}
       
          

    
        </ul>
        
      </div>
     </div>
   </nav>
   
    
    </>
  
}
