import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup' ;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
 // 3lshan ewade el user to the login page "programming routing"
 //dah 3ebra 3n hock mn el 'react router dom' 
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const [messageError, setmessageError] = useState('')

  async function handleRegister(values){
     setisLoading(true);
    // send the registeration data to the backend api
  let {data}  = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((errr)=>{
  setisLoading(false);
  setmessageError(`${ errr.response.data.errors.param} : ${ errr.response.data.errors.msg}`);

  })
       if(data.message === 'success')
       {
             setisLoading(false);
              navigate('/login')
       }
   }


//Validation using Yup
 let validationSchema = Yup.object({
  name:Yup.string().required("name is required").min(3 , "name min length is 3").max(15, "name max length is 10"),
  email:Yup.string().required("email is required").email("email is invalid"),
  password:Yup.string().required("password is required").matches(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password is inValid"),
  rePassword:Yup.string().required("rePassword is required").oneOf([Yup.ref('password')],"password and repassword dosen't match"),
  phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, 'phone must be an egyptian number')
   
})



//Validation using react
//      function validate(values){
//     let errors ={};
//     if(!values.name){
//       errors.name = 'Name is Required'
//     } else if(values.name.length <3){
//       errors.name = 'minimum length is 3 '
//     }else if(values.name.length >15){
//       errors.name = 'Maximum length is 15 '
//     }

//     if(!values.email){
//       errors.email = 'email is Required'

//     } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
//       errors.email = 'email is inValid'
//     }

//     if(!values.password){
//       errors.password = 'password is Required'
      
//     } else if(!/^[A-Z] [a-z0-9] {5,10}$/.test(values.password)){
//       errors.password = 'password is inValid'
//     }

//     if(!values.rePassword){
//       errors.rePassword = 'password is Required'
      
//     } else if(values.password !== values.rePassword){
//       errors.rePassword = 'password and repassword dosent match'
//     }

//     if(!values.phone){
//       errors.phone = 'phone is Required'
      
//     } else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
//       errors.phone = 'phoone must be Egyptian one'
//     }
    


//  return errors;
//    }

  

  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    } ,
   // validate,
    validationSchema,
    onSubmit:handleRegister

  })

  return <>
      
   <div className="w-75 mx-auto py-4">
   <h3>Register Now : </h3>
  
     {messageError.length > 0 ? <div className="alert alert-danger">
          {messageError}
          </div> :null}

   <form onSubmit={formik.handleSubmit}>
    
    <label htmlFor='name'>Name: </label> 
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type='text' name='name' id='name'/>
    {formik.errors.name && formik.touched.name ?<div className="alert alert-danger">{formik.errors.name}</div>:null}

    <label htmlFor='email'>Email: </label> 
    <input className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'/>
    {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>:null}


    <label htmlFor='password'>password: </label> 
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'/>
    {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>:null}

    
    <label htmlFor='rePassword'>rePassword: </label> 
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type='password' name='rePassword' id='rePassword'/>
    {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}


    <label htmlFor='phone'>phone: </label> 
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type='tel' name='phone' id='phone'/>
    {formik.errors.phone && formik.touched.phone ?<div className="alert alert-danger">{formik.errors.phone}</div>:null}

     {isLoading?    <button className='btn bg-main text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:
    <button disabled={! (formik.isValid &&formik.dirty)} className='btn bg-main text-white' type='submit'>Register</button>}
    </form>       
   
   </div>

    
    </>
  
}
