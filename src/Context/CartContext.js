import axios from "axios";
import { createContext } from "react"; 
export let cartContext = createContext();

export function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
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
  function getLoggedUserCart(x) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: headers
      }).then((response)=>response)
        .catch((error)=>error);
  }

  return (
    <cartContext.Provider value={{addToCart, getLoggedUserCart}}>
      {props.children}
      </cartContext.Provider>
  );
}
