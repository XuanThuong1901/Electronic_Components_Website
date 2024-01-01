import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../apiRequest/axios";
import classes from "./ManageOrder.module.css";
import formatCurrency from "../../Helper/convertUSD";
import { formatDate, formatTime } from "../../Helper/convertDate";
import ListOders from "./ListOrders/ListOrder";
import Register from "../../pages/Register";
import ListReturnOrder from "./ReturnOrder/ListReturnOrder";

const ManageOrder = () => {

    const [value, setValue] = useState(1);

    const toggleTab = (index) => {
        setValue(index);
      };
  return (
    <div className={classes["container"]}>
      <div className={classes["title"]}>
        <h1>Danh Sách Đơn Hàng</h1>
      </div>
      <div className={classes["detail-product"]}>
          <div className={classes["button-review"]}>
            <button
              className={value === 1 ? classes["button-active"] : classes[""]}
              onClick={() => toggleTab(1)}
            >
              Đơn đặt hàng
            </button>
            <button
              className={value === 2 ? classes["button-active"] : classes[""]}
              onClick={() => toggleTab(2)}
            >
              Đơn đổi, trả
            </button>
          </div>
          <div className={
              value === 1 ? classes["content-active"] : classes["content-none"]
            }>

          </div>
          {value === 1 ?  <div
            className={
              value === 1 ? classes["content-active"] : classes["content-none"]
            }
          >
            <ListOders/>
          </div> : <div
            className={
              value === 2 ? classes["content-active"] : classes["content-none"]
            }
          >
            <ListReturnOrder/>
          </div>}
          {/* <div
            className={
              value === 1 ? classes["content-active"] : classes["content-none"]
            }
          >
            <ListOders/>
          </div>
          <div
            className={
              value === 2 ? classes["content-active"] : classes["content-none"]
            }
          >
            <Register/>
          </div> */}
        </div>
    </div>
  );
};

export default ManageOrder;
