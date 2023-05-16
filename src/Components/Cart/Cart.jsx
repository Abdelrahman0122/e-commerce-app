import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function Cart() {

  // bn distract mn el carContext 
  let { getLoggedUserCart , removeItem, updateProductCount } = useContext(cartContext);

  const [cartDetails, setcartDetails] = useState(null)

  async function getCart()
   {
    let response = await getLoggedUserCart();
  //  console.log(response);
    

    if (response?.data?.status === "success")
    {
      setcartDetails(response.data.data);
    }
  }

  //function delete item will call the removeItem from CartContext
 async function deleteItem(productId)
  {
   let response = await  removeItem(productId);
   // will make he update realtime 
   //mn el 25er el usestate ele fo2 ht4t8l fa ha render mn 2wl we gded fa el update hekon realtime
   setcartDetails(response.data.data);
   toast('item removed succesfully')
 //  console.log(response);
  }

  async function updateProductQuantity(productId, count)
  {
   let response = await  updateProductCount(productId, count);
   setcartDetails(response.data.data);
   toast('product count Updated');
  }


  useEffect(() => {
    getCart();
  },[]);

  return <>
  {
    cartDetails !== null?  <div className="bg-main-light p-4 my-4">
    <h3>Shop Cart:</h3>
    <h6 className="text-main">Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
    {cartDetails.products.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2">
      <div className="col-md-1">
       <img src={product.product.imageCover} className="w-100" alt=""/> 
      </div>
      <div className="col-md-11 d-flex justify-content-between">

        <div>
        <h6>{product.product.title}</h6>
         <h6 className="text-main"> Price: {product.price}</h6>
         <button className="btn m-0 p-0" onClick={()=> deleteItem(product.product._id)}><i className="fa-regular text-main fa-trash-can"></i> Remove</button>
        </div>

        <div>
         <button onClick={()=> updateProductQuantity(product.product._id, product.count+1) } className="btn border-main btn-small">+</button>
         <span className="mx-2">{product.count}</span>
         <button onClick={()=> updateProductQuantity(product.product._id, product.count-1) }  className="btn border-main btn-small">-</button>
        </div>
      
      </div>
    </div>)}
  </div>:null
  }
  </>
}
