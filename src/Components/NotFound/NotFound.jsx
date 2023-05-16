import React from 'react'
import styles from './NotFound.module.css'
export default function NotFound() {
  
  return <>
      <div className="d-flex justify-content-center align-items-center m-5" >
      <div>
        <h1 className="text-center mb-4">Page Not Found</h1>
        <img src={require('../../assets/images/error.svg').default} alt="Error" className="img-fluid" />
      </div>
    </div>
    
    </>
  
}
