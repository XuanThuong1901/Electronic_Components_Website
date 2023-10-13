import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListOrder.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const Order = ({ order, setIsCheckHandle}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [showSubtable, setShowSubtable] = useState(false);

  const getStatus = async () => {
    const res = await api.get("/status/order");
    return res;
  };
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

  const HandleStatus = (index) => {
    setShowSubtable(false)
    if (order.status.idstatus === 3 && (index === 5 || index === 6)) {
      return toast.error("Đơn hàng chưa được xác nhận", {
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
    if (order.status.idstatus === 4 && index === 7) {
      return toast.error("Đơn hàng đã được xác nhận không thể hủy", {
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
    if (order.status.idstatus === 4 && index === 6) {
      return toast.error("Đơn hàng chưa được giao đi", {
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
    if (order.status.idstatus === 5 && (index === 7 || index === 4)) {
      return toast.error("Đơn hàng đang giao không thể xác nhận hoặc hủy", {
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
    if (order.status.idstatus === 6) {
      return toast.error(
        "Đơn hàng đã hoàn thành, không thể thay đổi trạng thái",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else {
      try {
        if (index === 4) {
          api
            .get(`/admin/order/confirmed/${order.idorder}`, {
              headers: {
                access_token: token,
              },
            })
            .then((res) => {
              console.log(res);
              toast.success("Cập nhật trạng thái đơn hàng thành công", {
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
              console.log(err);
              toast.error(<div>{err.response.data.message}</div>, {
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
        }
        if (index === 5) {
          api
          .get(`/admin/order/delivery/${order.idorder}`, {
            headers: {
              access_token: token,
            },
            })
            .then((res) => {
              console.log(res);
              toast.success("Cập nhật trạng thái đơn hàng thành công", {
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
              console.log(err);
              toast.error(<div>{err.response.data.message}</div>, {
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
        }
        if (index === 6) {
          api
          .get(`/admin/order/delivered/${order.idorder}`, {
            headers: {
              access_token: token,
            },
            })
            .then((res) => {
              console.log(res);
              toast.success("Cập nhật trạng thái đơn hàng thành công", {
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
              console.log(err);
              toast.error(<div>{err.response.data.message}</div>, {
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
        }
        if (index === 7) {
          api
          .get(`/admin/order/canceled/${order.idorder}`, {
            headers: {
              access_token: token,
            },
            })
            .then((res) => {
              console.log(res);
              toast.success("Cập nhật trạng thái đơn hàng thành công", {
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
              console.log(err);
              toast.error(<div>{err.response.data.message}</div>, {
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
        }
        setIsCheckHandle(true);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const toggleSubtable = () => {
    setShowSubtable((prevShowSubtable) => !prevShowSubtable);
  };

  const handleStatusSelect = () => {
    setShowSubtable(false);
  };

  const viewStatus = (option) => {
    return (
      <div className={classes["status"]}>
        <div className={classes["status-text"]} onClick={() => HandleStatus(4)}>
          <Link className={classes["status-color"]}>Xác nhận</Link>
        </div>
        <div className={classes["status-text"]} onClick={() => HandleStatus(5)}>
          <Link className={classes["status-text"]}>Đang giao</Link>
        </div>
        <div className={classes["status-text"]} onClick={() => HandleStatus(6)}>
          <Link className={classes["status-text"]}>Hoàn thành</Link>
        </div>
        <div className={classes["status-text"]} onClick={() => HandleStatus(7)}>
          <Link className={classes["status-text"]}>Hủy đơn</Link>
        </div>
      </div>
    );
  };

  return (
    <div className={classes["container__orders"]}>
      <div className={classes["cart-item"]} key={order.idorder}>
        <div className={classes["item"]} onClick={() => navigate(`/admin/order/${order.idorder}`)}>
          <p >
            {order.customer.name}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/order/${order.idorder}`)}>
          <p>
            {formatTime(order.dateOrder)} {formatDate(order.dateOrder)}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/order/${order.idorder}`)}>
          <p>{formatCurrency(order.amount)}</p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/order/${order.idorder}`)}>
          <p>{order.address}</p>
        </div>

        {status !== null && (
          <div className={classes["item-status"]}>
            <Status value={order.status.idstatus} />
            <FaExclamationCircle
              className={classes["item-icon"]}
              onClick={toggleSubtable}
            />
            {showSubtable && viewStatus(handleStatusSelect)}
          </div>
        )}
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

export default Order;
