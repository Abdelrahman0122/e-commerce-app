 
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import About from "./Components/About/About";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import  toast,{Toaster}  from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";


function App() {
  //when refresh still in the pag not to logout again
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  //Problem here
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    
    setUserData(decodedToken);
    
  }

  // end of the problem     el user data m4 2rea el decodedToken
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "products",
          element: (
          <ProtectedRoute>
              <Products />
           </ProtectedRoute>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
          <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (   <CartContextProvider>
    <Toaster/>
       <RouterProvider router={routers}></RouterProvider>
              </CartContextProvider>
     
   
  );
}

export default App;
