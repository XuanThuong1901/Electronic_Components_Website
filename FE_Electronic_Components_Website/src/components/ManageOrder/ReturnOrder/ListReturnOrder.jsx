import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../apiRequest/axios";
import classes from "./ListReturnOrder.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";

const ListReturnOrder = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [returnOrders, setReturnOrders] = useState([]);

  const getReturnOrders = async () => {
    const res = await api.get("/return_order", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  useEffect(() => {
    getReturnOrders()
      .then((res) => {
        setReturnOrders(res.data.returnOrderList);
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
    if (order === "unconfirmed") {
      return <p className={classes["text-wait"]}>Chưa xác nhận</p>;
    }
    if (order === "confirmed") {
      return <p className={classes["text-confirm"]}>Đã xác nhận</p>;
    }
    if (order === "cancel") {
      return <p className={classes["text-cancel"]}>Từ chối</p>;
    }
    // if (order === 7) {
    //   return <p className={classes["text-cancel"]}>Đã Huỷ </p>;
    // } else {
    //   return <p className={classes["text-unconfirm"]}>Đã xác nhận </p>;
    // }
  }
  return (
    <div className={classes["container"]}>
        <div className={classes["container__orders"]}>
            <div
              className={classes["cart-item"]}>
              <div className={classes["price"]}>
                <p>Ngày tạo</p>
              </div>
              <div className={classes["price"]}>
                <p>
                 Sản phẩm đổi
                </p>
              </div>
              <div>
                
              </div>
              <div className={classes["price"]}>
                <p>Hình thứ</p>
              </div>
              <div className={classes["total-price"]}>
                <p>Trạng thái</p>
              </div>
            </div>
          </div>
      {returnOrders.map((returnOrder) => {
        return (
          <div className={classes["container__orders"]}>
            <div
              className={classes["cart-item"]}
              key={returnOrder.id}
              onClick={() => navigate(`/return_order/${returnOrder.id}`)}
            >
              <div className={classes["name-item"]}>
                <p>{formatTime(returnOrder.createdDate)}</p>
                <p>{formatDate(returnOrder.createdDate)}</p>
              </div>
              <div className={classes["image-item"]}>
            <img
              src={returnOrder.product.imageProducts[0].urlimg}
              alt="food image"
              width="90px"
              height="90px"
            ></img>
          </div>
          <div className={classes["name-item"]}>
            <p>{returnOrder.product.productName}</p>
          </div>
          {returnOrder.formality === "giveBack" ? <div className={classes["price"]}>
                <p>
                  Trả hàng
                </p>
              </div> : <div className={classes["price"]}>
                <p>
                  Đổi hàng
                </p>
              </div>}
              <div className={classes["total-price"]}>
                <Status value={returnOrder.status} />
              </div>
            </div>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default ListReturnOrder;
