import React from "react";
import classes from "./HomePageAdmin.module.css";

const HomePageAdmin = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["main-content"]}>
        <p>Trang chủ</p>
      </div>
      <div className={classes["button-main"]}>
        <button>Khách hàng</button>
        <button>Nhân viên</button>
        <button>Nhà cung cấp</button>
        <button>Đơn vị vận chuyển</button>
        <button>Sản phẩm</button>
        <button>Phiếu nhập</button>
        <button>Đơn đặt hàng</button>
        <button>Đơn đổi, trả</button>
        <button>Thống kê</button>
        <button>Tài khoản</button>
      </div>
    </div>
  );
};

export default HomePageAdmin;
