import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListReturnOrder.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const ReturnOrder = ({ returnOrder, setIsCheckHandle }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showSubtable, setShowSubtable] = useState(false);

  function Status(e) {
    const status = e.value;
    if (status === "unconfirmed") {
      return <p className={classes["text-wait"]}>Chưa xác nhận</p>;
    }
    if (status === "confirmed") {
      return <p className={classes["text-confirm"]}>Xác nhận</p>;
    }
    if (status === "refuse") {
      return <p className={classes["text-cancel"]}>Từ chối</p>;
    }
  }

  const HandleStatus = (status) => {
    setShowSubtable(false);
    if (returnOrder.status === "confirmed" || returnOrder.status === "refuse") {
      return toast.error("Không thể cập nhật trạng thái đơn hàng !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        api
          .get(`/admin/return_order/confirmed/${returnOrder.id}/${status}`, {
            headers: {
              access_token: token,
            },
          })
          .then((res) => {
            console.log(res);
            toast.success("Cập nhật trạng thái thành công", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsCheckHandle(true);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Cập nhật trạng thái thất bại !", {
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
        <div
          className={classes["status-text"]}
          onClick={() => HandleStatus("confirmed")}
        >
          <Link className={classes["status-color"]}>Xác nhận</Link>
        </div>
        <div
          className={classes["status-text"]}
          onClick={() => HandleStatus("refuse")}
        >
          <Link className={classes["status-text"]}>Từ chối</Link>
        </div>
      </div>
    );
  };

  return (
    <div className={classes["container__orders"]}>
      <div className={classes["cart-item"]} key={returnOrder.id}>
        <div
          className={classes["item"]}
          onClick={() => navigate(`/admin/return_order/${returnOrder.id}`)}
        >
          <p>{returnOrder.name}</p>
        </div>
        <div
          className={classes["item"]}
          onClick={() => navigate(`/admin/return_order/${returnOrder.id}`)}
        >
          <p>
            {formatTime(returnOrder.createdDate)}{", "}
            {formatDate(returnOrder.createdDate)}
          </p>
        </div>
        <div
          className={classes["item"]}
          onClick={() => navigate(`/admin/return_order/${returnOrder.id}`)}
        >
          <p>{returnOrder.address}</p>
        </div>
        <div className={classes["image-item"]} onClick={() => navigate(`/admin/return_order/${returnOrder.id}`)}>
              <img
                src={returnOrder.product.imageProducts[0].urlimg}
                alt="food image"
                width="90px"
                height="90px"
              ></img>
            </div>
        <div
          className={classes["item"]}
          onClick={() => navigate(`/admin/return_order/${returnOrder.id}`)}
        >
          {returnOrder.formality === "giveBack" ? <p>Trả hàng</p> : <p>Đổi hàng</p>}
        </div>
        

        <div className={classes["item-status"]}>
          <Status value={returnOrder.status} />
          <FaExclamationCircle
            className={classes["item-icon"]}
            onClick={toggleSubtable}
          />
          {showSubtable && viewStatus(handleStatusSelect)}
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

export default ReturnOrder;
