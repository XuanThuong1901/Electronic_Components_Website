import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import classes from "./Statistical.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const Sale = ({startDay, item}) => {
  
  return (
    <div className={classes["container__employees"]}>
      <div className={classes["cart-item"]} key={item.idemployer}>
        <div className={classes["item"]}>
          <p>{startDay}</p>
        </div>
        <div className={classes["item"]} >
          <p>{item.time}</p>
        </div>
        <div className={classes["item"]}>
          <p>{formatCurrency(item.saleOrder)}</p>
        </div>
        <div className={classes["item"]}>
          <p>{formatCurrency(item.saleImport)}</p >
        </div>
        <div className={classes["item"]}>
        <p>{formatCurrency(item.saleOrder - item.saleImport)}</p >
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

export default Sale;
