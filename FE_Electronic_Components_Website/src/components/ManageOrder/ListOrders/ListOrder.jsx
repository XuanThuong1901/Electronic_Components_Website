import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../apiRequest/axios";
import classes from "./ListOrders.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";

const ListOders = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await api.get("/order", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //console.log(orders)
  function Status(e) {
    const order = e.value;
    //console.log(order)
    if (order === 3) {
      return <p className={classes["text-wait"]}>Chưa xác nhận</p>;
    }
    if (order === 5) {
      return <p className={classes["text-unconfirm"]}>Đang giao</p>;
    }
    if (order === 6) {
      return <p className={classes["text-confirm"]}>Hoàn thành</p>;
    }
    if (order === 7) {
      return <p className={classes["text-cancel"]}>Đã Huỷ </p>;
    } else {
      return <p className={classes["text-unconfirm"]}>Đã xác nhận </p>;
    }
  }
  return (
    <div className={classes["container"]}>
      {orders.map((order) => {
        return (
          <div className={classes["container__orders"]}>
            <div
              className={classes["cart-item"]}
              key={order.idorder}
              onClick={() => navigate(`/order/${order.idorder}`)}
            >
              <div className={classes["name-item"]}>
                <p>Ngày: {formatTime(order.dateOrder)}</p>
                <p>{formatDate(order.dateOrder)}</p>
              </div>
              <div className={classes["price"]}>
                <p>
                  Đơn Giá : {formatCurrency(order.amount - order.shippingFee)}
                </p>
              </div>
              <div className={classes["price"]}>
                <p>Phí ship : {formatCurrency(order.shippingFee)}</p>
              </div>
              <div className={classes["total-price"]}>
                <p>Tổng Giá : {formatCurrency(order.amount)}</p>
              </div>
              <div className={classes["total-price"]}>
                <Status value={order.status.idstatus} />
              </div>
            </div>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default ListOders;
