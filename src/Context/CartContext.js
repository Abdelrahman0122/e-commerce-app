import axios from "axios";
import { createContext } from "react"; 
export let cartContext = createContext();

export function CartContextProvider(props) {
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
  return (
    // bn5leha globle 3l project kolo
    <cartContext.Provider value={{addToCart, getLoggedUserCart, removeItem, updateProductCount}}>
      {props.children}
      </cartContext.Provider>
  );
}
