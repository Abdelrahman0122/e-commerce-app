import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";

export default function Cart() {
  let { getLoggedUserCart } = useContext(cartContext);

  const [cartDetails, setcartDetails] = useState(null)
  async function getCart()
   {
    let response = await getLoggedUserCart();
    console.log(response);
    

    if (response?.data?.status === "success")
    {
      setcartDetails(response.data.data);
    }
  }

  useEffect(() => {
    getCart();
  },[]);

  return <>
  {
    cartDetails !== null?  <div className="bg-main-light p-4 my-4">
    <h3>Shop Cart:</h3>
    <h6 className="text-main">Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
    {cartDetails.products.map((product)=> <div className="row align-items-center border-bottom py-2">
      <div className="col-md-1">
       <img src={product.product.imageCover} className="w-100" alt=""/> 
      </div>
      <div className="col-md-11 d-flex justify-content-between">

        <div>
        <h6>{product.product.title}</h6>
         <h6 className="text-main"> Price: {product.price}</h6>
         <button className="btn m-0 p-0"><i className="fa-regular text-main fa-trash-can"></i> Remove</button>
        </div>

        <div>
         <button className="btn border-main btn-small">+</button>
         <span className="mx-2">{product.count}</span>
         <button className="btn border-main btn-small">-</button>
        </div>
      
      </div>
    </div>)}
  </div>:null
  }
<h2>Cart</h2>
  </>
}
