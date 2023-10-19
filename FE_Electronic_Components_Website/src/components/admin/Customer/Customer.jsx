import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListCustomer.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const Customer = ({ customer, setIsCheckHandle }) => {
  const token = localStorage.getItem("token");
  const [showSubtable, setShowSubtable] = useState(false);
  //console.log(orders)
  function Status(e) {
    const quantity = e.value;
    if (quantity === 1) {
      return <p className={classes["text-confirm"]}>Hoạt động</p>;
    } else {
      return <p className={classes["text-cancel"]}>Khóa </p>;
    }
  }

  const HandleStatus = (status) => {
    setShowSubtable(false);
    api
      .get(`/admin/user/status/${customer.idcustomer}/${status}`, {
        headers: {
          access_token: token,
        },
      })
      .then((res) => {
        console.log(res);
        setIsCheckHandle(true);
        return toast.success("UPDATE_STATUS_USER_SUCCESS", {
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
        return toast.error("UPDATE_STATUS_USER_ERROR001", {
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
        <div className={classes["status-text"]} onClick={() => HandleStatus(1)}>
          <Link className={classes["status-color"]}>Hoạt động</Link>
        </div>
        <div className={classes["status-text"]} onClick={() => HandleStatus(2)}>
          <Link className={classes["status-text"]}>Khóa</Link>
        </div>
      </div>
    );
  };

  return (
    <div className={classes["container__orders"]}>
      <div className={classes["cart-item"]} key={customer.idcustomer}>
        <div className={classes["item"]}>
          <p>{customer.name}</p>
        </div>
        <div className={classes["item"]}>
          <p>{customer.account.email}</p>
        </div>
        <div className={classes["item"]}>
          <p>{customer.telephone}</p>
        </div>
        <div className={classes["item"]}>
          <p>{customer.address}</p>
        </div>
        {/* <div className={classes["item"]}>
          <Status value={customer.account.status.idstatus} />
        </div> */}
        <div className={classes["item-status"]}>
          <Status value={customer.account.status.idstatus} />
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

export default Customer;
