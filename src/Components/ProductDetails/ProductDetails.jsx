import React, { useContext,useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
export default function ProductDetails() {
  let { addToCart } = useContext(cartContext);
  let { id } = useParams();

  //addproduct to the cart
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success(response.data.message, { duration: 2000 });
    } else {
      toast.error("Error", { duration: 2000 });
    }
    console.log(response);
  }

  const [isLoading, setisLoading] = useState(false);
  const [ProductDetails, setProductDetails] = useState({});
  async function geProductDetails() {
    setisLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setisLoading(false);
  }
  useEffect(() => {
    geProductDetails();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container">
        <div className="row align-items-center justify-content-center py-3">
          {isLoading ? (
            <div className="text-center mt-5">
              {" "}
              <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
            </div>
          ) : (
            <>
              {" "}
              <div className="col-md-4 py-5">
                <Slider {...settings}>
                  {ProductDetails?.images?.map((img) => (
                    <div>
                      <img className="w-100" src={img} alt="" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div  className="col-md-8">
                <h1>{ProductDetails.title}</h1>
                <p>{ProductDetails.description}</p>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">{ProductDetails.price} EGP</span>
                  <span className="text-muted">
                    <i className="fas fa-star rating-color"></i>
                    {ProductDetails.ratingsAverage}
                  </span>
                </div>
                <button className="btn bg-main text-white w-100" onClick={()=>addProduct(id)}>+ Add</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
