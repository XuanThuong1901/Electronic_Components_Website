import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListCategory.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaTrash } from "react-icons/fa";

const CategoryAdmin = ({ shippingUnit, setIsCheckHandle }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRemove = async () => {
    const res = await api
      .delete(`/shipping_unit/delete/${shippingUnit.idshippingUnit}`)
      .then((res) => {
        setIsCheckHandle(true);
        return toast.error("Xóa đơn vị vận chuyển thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      })
      .catch((err) => {
        return toast.error("Không thể xóa đơn vị vận chuyển này", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className={classes["container__orders"]}>
      <div className={classes["cart-item"]} key={shippingUnit.idshippingUnit}>
        <div className={classes["item"]}>
          <p>{shippingUnit.shippingUnitName}</p>
        </div>
        <div className={classes["item"]}>
          <p>{shippingUnit.email}</p>
        </div>
        <div className={classes["item"]}>
          <p>{shippingUnit.address}</p>
        </div>
        <div className={classes["item"]}>
          <p>{shippingUnit.telephone}</p>
        </div>
        <div>
          <FaTrash
            className={classes["item-icon"]}
              onClick={handleRemove}
          />
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

export default CategoryAdmin;
