import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListCustomer.module.css";
import Customer from "./Customer";

const ListCustomer = () => {
  const token = localStorage.getItem("token");

  const [customer, setCustomer] = useState(null);
  const [isCheckHandle, setIsCheckHandle] = useState(false);

  const getCustomer = async () => {
    const res = await api.get("/admin/customer", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  useEffect(() => {
    getCustomer()
      .then((res) => {
        setCustomer(res.data);        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isCheckHandle === true) {
    getCustomer()
      .then((res) => {
        setCustomer(res.data);
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
            Danh sách khách hàng
          </h1>
        </div>
      </div>
    <div className={classes["container"]}>
      <div className={classes["container__orders"]}>
        <div className={classes["cart-item"]}>
          <div className={classes["main"]}>
            <p>Tên khách hàng</p>
          </div>
          <div className={classes["main"]}>
            <p>Email</p>
          </div>
          <div className={classes["main"]}>
            <p>Số điện thoại</p>
          </div>
          <div className={classes["main"]}>
            <p>Địa chỉ</p>
          </div>
          <div className={classes["main"]}>
            <p>Trạng thái</p>
          </div>
        </div>
      </div>
      {customer !== null && customer.map((item) => 
        <Customer customer={item} setIsCheckHandle={setIsCheckHandle}/>
      )}
    </div>
    </div>
  );
};

export default ListCustomer;
