import { useEffect, useState, useContext } from "react";
import classes from "./MainNavigationAdmin.module.css";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";
import Logo from "../UI/Elements/Logo";

const MainNavigationAdmin = () => {
  const {token, setToken} = useContext(TokenContext);

  useEffect(() => {
    localStorage.setItem('token',token);
  }, [token]);
  return (
    <div className={classes.menu}>
      {/* Render modal */}
      <Container className={classes["main-menu"]}>
        <div className={classes["menu-wrapper"]}>
          <NavLink to="/admin" className={classes.linker}>
            <Logo />
          </NavLink>
          <nav className={classes["navigator"]}>
            <ul className=" align-items-center h-100">
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/customer"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Khách hàng
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/employee"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Nhân viên
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/supplier"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Nhà cung cấp
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/shippingUnit"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Đơn vị vận chuyển
                </NavLink>
              </li>
              {/* <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/category"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Danh mục
                </NavLink>
              </li> */}
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/product"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Sản phẩm
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/import"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Phiếu nhập
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/order"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Đơn đặt hàng
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/return_order"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Đơn đổi, trả
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/statistical"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Thống kê
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/admin/user"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Tài khoản
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default MainNavigationAdmin;
