import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import styles from './Layout.module.css'
export default function Layout({userData,setUserData}) {
let naigate = useNavigate();

  function logOut(){
    localStorage.removeItem("userToken")
    setUserData(null)
    naigate('/login')
  }

  return <>
    
<div className='pt-5'>
<Navbar userData={userData} logOut={logOut}/>
<div className="container">
<Outlet></Outlet>
</div>
<Footer/>
</div>
    
    </>
  
}
