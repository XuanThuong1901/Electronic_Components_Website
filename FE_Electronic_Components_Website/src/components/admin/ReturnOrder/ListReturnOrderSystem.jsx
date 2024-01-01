import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListReturnOrder.module.css";
import ReturnOrder from "./ReturnOrder";

const ListReturnOders = () => {
  const token = localStorage.getItem("token");

  const [returnOrders, setReturnOrders] = useState([]);
  const [status, setStatus] = useState(null);
  const [isCheckHandle, setIsCheckHandle] = useState(false);

  const getReturnOrders = async () => {
    const res = await api.get("/admin/return_order", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  // const getStatus = async () => {
  //   const res = await api.get("/status/order");
  //   return res;
  // };
  useEffect(() => {
    getReturnOrders()
      .then((res) => {
        console.log(res)
        setReturnOrders(res.data.returnOrderList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  if(isCheckHandle === true)
  {
    getReturnOrders()
      .then((res) => {
        setReturnOrders(res.data.returnOrderList);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsCheckHandle(false);
  }

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Danh sách đơn đổi, trả hàng
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
            <p>Địa chỉ</p>
          </div>
          <div className={classes["main"]}>
            <p>Sản phẩm</p>
          </div>
          <div className={classes["main"]}>
            <p>Hình thức</p>
          </div>
          <div className={classes["main"]}>
            <p>Trạng thái</p>
          </div>
        </div>
      </div>
      {returnOrders.map((returnOrder) =>
        <ReturnOrder returnOrder={returnOrder} setIsCheckHandle={setIsCheckHandle}/>
      )}
    </div>
    </div>

  );
};

export default ListReturnOders;
