import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListEmployee.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const Employee = ({ employee, setIsCheckHandle }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
  const avatar = require(`../../../assets/avatar/${employee.avatar}`);

  const HandleStatus = (status) => {
    setShowSubtable(false);
    api
      .get(`/admin/user/status/${employee.idemployer}/${status}`, {
        headers: {
          access_token: token,
        },
      })
      .then((res) => {
        console.log(res);
        setIsCheckHandle(true);
        return toast.success("Cập nhật trạng thái tài khoản thành công", {
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
        return toast.error(<div>Tài khoản hiện tại đang đăng nhập, không thể cập nhật trạng thái{err.response.data.message}</div>, {
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
    <div className={classes["container__employees"]}>
      <div className={classes["cart-item"]} key={employee.idemployer}>
      <div className={classes["item"]} onClick={() => navigate(`/admin/employee/${employee.idemployer}`)}>
      <img src={avatar} height="90xp" width="90px"/>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/employee/${employee.idemployer}`)}>
          <p>{employee.name}</p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/employee/${employee.idemployer}`)}>
          <p>{employee.account.email}</p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/employee/${employee.idemployer}`)}>
          <p>{employee.telephone}</p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/employee/${employee.idemployer}`)}>
          <p>{employee.account.role.role === "admin" ? "Quản lý" : "Nhân viên"}</p >
        </div>
        <div className={classes["item-status"]}>
          <Status value={employee.account.status.idstatus} />
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

export default Employee;
