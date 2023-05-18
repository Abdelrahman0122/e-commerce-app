import axios from "axios";
import { useState } from "react";
import { createContext, useEffect } from "react"; 
export let cartContext = createContext();

export function CartContextProvider(props) {

  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0)


async function getCart()
{
   let response = await getLoggedUserCart();
     if(response?.data?.status === 'success')
     {
      setnumOfCartItems(response.data.numOfCartItems);
      setcartId(response.data.data._id);
     }
   console.log(response);
}

useEffect(()=>{
  getCart();
}, []);


  let headers = { token: localStorage.getItem("userToken") };

  // add to cart method {Post}
   function addToCart(x) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: x,
      },
      {
        headers: headers
      }).then((response)=>response)
        .catch((error)=>error);
  }

  // get items in the cart {get}
  function getLoggedUserCart(x) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: headers
      }).then((response)=>response)
        .catch((error)=>error);
  }

  //Delete item from the cart 
  function removeItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: headers
         
      }).then((response)=>response)
        .catch((error)=>error);    
  }
  //update product count
  function updateProductCount(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      //fe eldatabase fe count hwa heb3at fe el count
      count:count
    },
      {
        headers: headers
         
      }).then((response)=>response)
        .catch((error)=>error);    
  }
  // Clear the cart
  function clearCart(x) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: headers
      }).then((response)=>response)
        .catch((error)=>error);
  }

  //Online payment
  function onlinePayment(cartId, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      //fe eldatabase fe count hwa heb3at fe el count
      shippingAddress:shippingAddress
    },
      {
        headers: headers
         
      }).then((response)=>response)
        .catch((error)=>error);    
  }


  return (
    // bn5leha globle 3l project kolo
    <cartContext.Provider value={{cartId,numOfCartItems,setnumOfCartItems, onlinePayment, addToCart, getLoggedUserCart, removeItem, updateProductCount, clearCart}}>
      {props.children}
      </cartContext.Provider>
  );
}
