import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../apiRequest/axios";
import classes from "./OrderDetail.module.css";

const OrderDetailAdmin = () => {
  const token = localStorage.getItem("token");
  const { idorder } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [infoOder, setInfoOder] = useState({});

  const getOrdersDetail = async () => {
    const res = await api.get(`/admin/order/${idorder}`, {
      headers: {
        access_token: token,
      },
    });
    console.log(res)
    return res;
  };
  useEffect(() => {
    getOrdersDetail()
      .then((res) => {
        setItems(res.data);
        // setInfoOder(res.data.info)
        console.log("detailorder: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(infoOder)

  const hanleCancelOrder = () => {
    try {
      api.get(`/orders/cancel/${idorder}`, {
        headers: {
          access_token: token,
        },
      });
      toast.success("Đã Huỷ Đơn Hàng", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
      // navigate('/orders')
    } catch (error) {
      console.log(error);
    }
  };

  function Status(e) {
    const order = e.value;
    //console.log(order)
    if (order === 3) {
      return (
        <div className={classes["status-wait"]}>
          <p className={classes["text-wait"]}>Chưa xác nhận </p>
          <button
            className={classes["cancle-button"]}
            onClick={hanleCancelOrder}
          >
            Huỷ đơn hàng
          </button>
        </div>
      );
    }
    if (order === 4) {
      return (
        <div>
          <p className={classes["text-confirm"]}>Đã xác nhận </p>
          <p className={classes["text-wait"]}>Chờ vận chuyển</p>
        </div>
      );
    }
    if (order === 5) {
      return (
        <div>
          <p className={classes["text-confirm"]}>Đã xác nhận </p>
          <p className={classes["text-wait"]}>Đang giao hàng</p>
        </div>
      );
    }
    if (order === 6) {
      return (
        <div>
          <p className={classes["text-confirm"]}>Đã xác nhận </p>
          <p className={classes["text-confirm"]}>Đơn hàng hoàn thành</p>
        </div>
      );
    } else {
      return <p className={classes["text-cancel"]}>Đã huỷ</p>;
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
            Thông tin đơn hàng
          </h1>
        </div>
      </div>
    <div className={classes.container}>
      {items !== null && (
        <div className="row">
          <div className="col-12 col-md-8">
            <div className={classes["list__items"]}>
              {items.detailOrders.map((item) => {
                return (
                  <div>
                    <div className={classes["cart-item"]} key={item.id_item}>
                      <div className={classes["image-item"]}>
                        <img
                          src={item.product.imageProducts[0].urlimg}
                          alt="food image"
                          width="90px"
                          height="90px"
                        ></img>
                      </div>
                      <div className={classes["name-item"]}>
                        <p>{item.product.productName}</p>
                      </div>
                      <div className={classes["price"]}>
                        <p>Đơn Giá : {item.product.priceLists[0].price}</p>
                      </div>
                      <div className={classes["input-quantity"]}>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                      <div className={classes["input-quantity"]}>
                        <p>Thuế: {item.product.tax.type} : {item.product.tax.taxPercentage}%</p>
                      </div>
                      <div className={classes["total-price"]}>
                        <p>
                          Tổng Giá :{" "}
                          {item.product.priceLists[0].price * item.quantity + item.product.priceLists[0].price*item.product.tax.taxPercentage/100 * item.quantity}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={classes["info__order"]}>
              <div className={classes["info__order-title"]}>
                Thông tin đơn hàng
              </div>
              <div className={classes["info__user"]}>
                <div className={classes["info__user-item"]}>
                  <h1>Khách hàng:</h1>
                  <p>{items.customer.name} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Địa chỉ giao: </h1>
                  <p>{items.customer.address} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Số điện thoại: </h1>
                  <p> {items.customer.telephone} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Phương thức thanh toán: </h1>
                  <p> {items.payment.paymentName} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Đơn vị vận chuyển: </h1>
                  <p> {items.shippingUnit.shippingUnitName}</p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Ghi chú: </h1>
                  <p> {items.note} </p>
                </div>
                <div className={classes["info__user-pay"]}>
                  <h1>Tiền hoá đơn: </h1>
                  <p>{items.amount - items.shippingFee} đ</p>
                </div>
                <div className={classes["info__user-pay"]}>
                  <h1>Phí vận chuyển: </h1>
                  <p> {items.shippingFee} đ</p>
                </div>
                <div className={classes["info__user-pay"]}>
                  <h1>Tổng hoá đơn: </h1>
                  <p> {items.amount} đ</p>
                </div>
                <div className={classes["info__user-deliveryfee"]}>
                  <h1>Trạng thái đơn hàng: </h1>
                  <p>
                    <Status value={items.status.idstatus} />{" "}
                  </p>
                </div>
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
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderDetailAdmin;
