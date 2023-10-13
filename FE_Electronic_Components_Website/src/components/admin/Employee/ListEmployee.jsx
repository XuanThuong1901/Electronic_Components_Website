import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../apiRequest/axios";
import classes from "./ListEmployee.module.css";
import Employee from "./Employee";

const ListEmployee = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isCheckHandle, setIsCheckHandle] = useState(false);

  const getEmloyee = async () => {
    const res = await api.get("/admin/employee", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  useEffect(() => {
    getEmloyee()
      .then((res) => {
        setEmployee(res.data);        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isCheckHandle === true) {
    getEmloyee()
      .then((res) => {
        setEmployee(res.data);
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
            Danh sách nhân viên
          </h1>
        </div>
      </div>
      <div className={classes["add"]}>
            <button className={classes["add-button"]} onClick={()=>{ navigate("/admin/employee/add")}}>Tạo nhân viên</button>
        </div>
    <div className={classes["container"]}>
      <div className={classes["container__employees"]}>
        <div className={classes["cart-item"]}>
        <div className={classes["main"]}>
            <p>Avatar</p>
          </div>
          <div className={classes["main"]}>
            <p>Tên Nhân viên</p>
          </div>
          <div className={classes["main"]}>
            <p>Email</p>
          </div>
          <div className={classes["main"]}>
            <p>Số điện thoại</p>
          </div>
          <div className={classes["main"]}>
            <p>Chức vụ</p>
          </div>
          <div className={classes["main"]}>
            <p>Trạng thái</p>
          </div>
        </div>
      </div>
      {employee !== null && employee.map((item) => 
        <Employee employee={item} setIsCheckHandle={setIsCheckHandle}/>
      )}
    </div>
    </div>
  );
};

export default ListEmployee;
