import React, { useContext } from "react";
import styles from "./checkout.module.css";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { onlinePayment } = useContext(cartContext);

  async function handleSubmit(values) {
    let response = await onlinePayment("64641f92bb145b026b590457", values);
   
    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url;
    } else {
      console.log("failed");
    }
    console.log(response);
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="w-50 py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details mb-3">Details:</label>
          <input
            type="text"
            className="form-control"
            value={formik.values.details}
            onChange={formik.handleChange}
            name="details"
            id="details"
          ></input>
          <label htmlFor="phone mb-3">phone:</label>
          <input
            type="tel"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          ></input>
          <label htmlFor="city mb-3">city:</label>
          <input
            type="text"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            id="city"
          ></input>

          <button className="btn w-100 mt-2 border-main" type="submit">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
