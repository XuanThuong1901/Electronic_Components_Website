import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../apiRequest/axios";
import classes from "./OderDetail.module.css";
import formatCurrency from "../../Helper/convertUSD";
import ItemOrderDetail from "./ItemOrderDetail";

const OrderDetail = () => {
  const token = localStorage.getItem("token");
  const { idorder } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [infoOder, setInfoOder] = useState({});

  const getOrdersDetail = async () => {
    const res = await api.get(`/order/detail/${idorder}`, {
      headers: {
        access_token: token,
      },
    });
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
      api
        .get(`/order/canceled/${idorder}`, {
          headers: {
            access_token: token,
          },
        })
        .then(() => {
          toast.success("Hủy đơn thành công !", {
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
        });
      // navigate('/orders')
    } catch (error) {
      console.log(error);
      toast.success("Hủy đơn không thành công, vui lòng thử lại !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    <div className={classes.container}>
      <div className={classes["title"]}>
        <h1>Chi Tiết Đơn Hàng</h1>
      </div>
      {items !== null && (
        <div className="row">
          <div className="col-12 col-md-8">
            <div className={classes["list__items"]}>
              {items.detailOrders.map((item) => {
                return (
                  <ItemOrderDetail order = {item} status = {items.status.idstatus}/>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={classes["info__order"]}>
              <div className={classes["info__order-title"]}>
                Thông tin thanh toán
              </div>
              <div className={classes["info__user"]}>
                <div className={classes["info__user-item"]}>
                  <h1>Tên người dùng: </h1>
                  <p> {items.customer.name} </p>
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
                  <h1>Tiền đơn hàng: </h1>
                  <p>{formatCurrency(items.amount - items.shippingFee)}</p>
                </div>
                <div className={classes["info__user-pay"]}>
                  <h1>Phí vận chuyển: </h1>
                  <p> {formatCurrency(items.shippingFee)}</p>
                </div>
                <div className={classes["info__user-pay"]}>
                  <h1>Tổng đơn hàng: </h1>
                  <p> {formatCurrency(items.amount)}</p>
                </div>
                <div className={classes["info__user-deliveryfee"]}>
                  <h1>Trạng thái đơn hàng: </h1>
                  <p>
                    {" "}
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
  );
};

export default OrderDetail;
