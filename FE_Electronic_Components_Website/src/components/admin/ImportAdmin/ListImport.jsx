import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListImport.module.css";
import { useNavigate } from "react-router-dom";
import Import from "./Import";

const ListImport = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [imports, setImports] = useState([]);
  const [isCheckHandle, setIsCheckHandle] = useState(false);

  const getImports = async () => {
    const res = await api.get("/admin/import", {});
    return res;
  };
  useEffect(() => {
    getImports()
      .then((res) => {
        setImports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isCheckHandle === true) {
    getImports()
      .then((res) => {
        setImports(res.data);
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
            Danh sách phiếu nhập
          </h1>
        </div>
      </div>
      <div className={classes["add"]}>
        <button
          className={classes["add-button"]}
          onClick={() => {
            navigate("/admin/import/add");
          }}
        >
          Thêm phiếu nhập
        </button>
      </div>
      <div className={classes["container"]}>
        <div className={classes["container__orders"]}>
          <div className={classes["cart-item"]}>
            <div className={classes["main"]}>
              <p>Tên phiếu</p>
            </div>
            <div className={classes["main"]}>
              <p>Nhận viên nhập</p>
            </div>
            <div className={classes["main"]}>
              <p>Ngày nhập</p>
            </div>
            <div className={classes["main"]}>
              <p>Nhà cung cấp</p>
            </div>
            <div className={classes["main"]}>
              <p>Tổng giá</p>
            </div>
            <div className={classes["main"]}>
              <p>Trạng thái</p>
            </div>
          </div>
        </div>
        {imports.map((item) => (
          <Import imports={item} setIsCheckHandle={setIsCheckHandle} />
        ))}
      </div>
    </div>
  );
};

export default ListImport;
