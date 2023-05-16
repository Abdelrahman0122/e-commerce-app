import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup' ;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {

       


 // 3lshan ewade el user to the login page "programming routing"
 //dah 3ebra 3n hock mn el 'react router dom' 
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const [messageError, setmessageError] = useState('')

  async function handleLogin(values){
     setisLoading(true);
    // send the registeration data to the backend api
  let {data}  = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((errr)=>{
  setisLoading(false);
  setmessageError(`${ errr.response.data.errors.param} : ${ errr.response.data.errors.msg}`);

  })
       if(data.message === 'success')
       {
            console.log("we got the token")
             localStorage.setItem('userToken',data.token)
             saveUserData();
             setisLoading(false);
             navigate('/')
            console.log(data.token)
       }
   }


//Validation using Yup
 let validationSchema = Yup.object({
  email:Yup.string().required("email is required").email("email is invalid"),
  password:Yup.string().required("password is required").matches(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password is inValid"),
   
})



  

  let formik = useFormik({
    initialValues:{
   email:'',
   password:''
    } ,
   // validate,
    validationSchema,
    onSubmit:handleLogin

  })

  return <>
      
   <div className="w-75 mx-auto py-4">
   <h3>Login Now : </h3>
  
     {messageError.length > 0 ? <div className="alert alert-danger">
          {messageError}
          </div> :null}

   <form onSubmit={formik.handleSubmit}>
    
    
    <label htmlFor='email'>Email: </label> 
    <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'/>
    {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>:null}


    <label htmlFor='password'>password: </label> 
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'/>
    {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>:null}

    
    
     {isLoading?    <button className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:
    <button disabled={! (formik.isValid &&formik.dirty)} className='btn bg-main text-white' type='submit'>Login</button>}
    </form>       
   
   </div>

    
    </>
  
}
