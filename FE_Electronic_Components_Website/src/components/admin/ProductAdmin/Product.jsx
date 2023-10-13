import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListProduct.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const Product = ({ product, setIsCheckHandle}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [showSubtable, setShowSubtable] = useState(false);
  const imagePath = `${process.env.PUBLIC_URL}/assets/images/product/${product.imageProducts[0].urlimg}`;
  console.log(imagePath);
  const getStatus = async () => {
    const res = await api.get("/status/order");
    return res;
  };
  useEffect(() => {
    getStatus()
      .then((res) => {
        setStatus(res.data);
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //console.log(orders)
  function Status(e) {
    const quantity = e.value;
    if (quantity > 0) {
      return <p className={classes["text-confirm"]}>Còn hàng</p>;
    }
    else {
      return <p className={classes["text-cancel"]}>Hết hàng </p>;
    }
  }

  const toggleSubtable = () => {
    setShowSubtable((prevShowSubtable) => !prevShowSubtable);
  };

  const handleStatusSelect = () => {
    setShowSubtable(false);
  };

  return (
    <div className={classes["container__orders"]}>
      <div className={classes["cart-item"]} key={product.idproduct}>
        
        <div className={classes["item"]} onClick={() => navigate(`/admin/product/${product.idproduct}`)}>
          <img
            // src={`${process.env.PUBLIC_URL}/assets/images/product/logo_3.jpg`}
            src={product.imageProducts[0].urlimg}
            alt="food image"
            width="90px"
            height="90px"></img>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/product/${product.idproduct}`)}>
          <p >
            {product.productName}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/product/${product.idproduct}`)}>
          <p >
            {product.supplier.supplierName}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/product/${product.idproduct}`)}>
          <p >
            {product.quantity}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/product/${product.idproduct}`)}>
          <p>{formatCurrency(product.priceLists[0].price)}</p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/product/${product.idproduct}`)}>
          <Status value={product.quantity}/>
        </div>
      </div>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

    </div>
  );
};

export default Product;
