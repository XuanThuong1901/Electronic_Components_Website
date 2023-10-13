import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListOrder.module.css";
import Order from "./Order";

const ListOders = () => {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(null);
  const [isCheckHandle, setIsCheckHandle] = useState(false);

  const getOrders = async () => {
    const res = await api.get("/admin/order", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  const getStatus = async () => {
    const res = await api.get("/status/order");
    return res;
  };
  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

  if(isCheckHandle === true)
  {
    getOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsCheckHandle(false);
  }

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
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Danh sách đơn hàng
          </h1>
        </div>
      </div>
    <div className={classes["container"]}>
      <div className={classes["container__orders"]}>
        <div className={classes["cart-item"]}>
          <div className={classes["main"]}>
            <p>Khách hàng</p>
          </div>
          <div className={classes["main"]}>
            <p>Ngày</p>
          </div>
          <div className={classes["main"]}>
            <p>Tổng giá đơn</p>
          </div>
          <div className={classes["main"]}>
            <p>Địa chỉ</p>
          </div>
          <div className={classes["main"]}>
            <p>Trạng thái</p>
          </div>
        </div>
      </div>
      {orders.map((order) =>
        <Order order={order} setIsCheckHandle={setIsCheckHandle}/>
      )}
    </div>
    </div>

  );
};

export default ListOders;
