import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListShippingUnit.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaTrash } from "react-icons/fa";

const ShippingUnit = ({ shippingUnit, setIsCheckHandle }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [address, setAddress] = useState("");
  const [shippingUnitName, setShippingUnitName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
 
  const toggleForm = () => {
    setShowFormUpdate((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    setAddress(shippingUnit.address);
    setEmail(shippingUnit.email);
    setShippingUnitName(shippingUnit.shippingUnitName);
    setTelephone(shippingUnit.telephone);
  }, [])

  const viewUpdateShipping = () => {
    // setAddress(supplier.address);
    return (
      <div className={classes["shipping-update"]}>
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={toggleForm}
        ></div>
        <div className={classes["shipping-update-detail"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="shippingUnitName"
              className={classes["shipping-form"]}
            >
              <Form.Label>Tên đơn vị vận chuyển</Form.Label>
              <Form.Control
                type="text"
                value={shippingUnit.shippingUnitName}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className={classes["shipping-form"]}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={shippingUnit.email}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="address"
              className={classes["shipping-form"]}
            >
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="telephone"
              className={classes["shipping-form"]}
            >
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                value={shippingUnit.telephone}
                required
              />
            </Form.Group>
            <div className={classes["shipping-form-button"]}>
              <button type="button" onClick={handleUpdateShipping}>
                Thay đổi
              </button>
              <button type="button" onClick={toggleForm}>
                Thoát
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleUpdateShipping = () => {
    if (
      address.trim() !== ""
    ) {
        api
          .post(`/shipping_unit/update/${shippingUnit.idshippingUnit}`,{ shippingUnitName, email, telephone, address }, {
            headers: {
              access_token: token,
            },
            })
        .then(() => {
          setIsCheckHandle(true);
          toast.success("Cập nhật đơn vị vận chuyển thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }).catch((err) => {
          return toast.error("Cập nhật thất bại !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
      
    }
  };
  const handleRemove = async () => {
    const res = await api
      .delete(`/shipping_unit/delete/${shippingUnit.idshippingUnit}`)
      .then((res) => {
        setIsCheckHandle(true);
        return toast.error("Xóa đơn vị vận chuyển thành công", {
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
        return toast.success("Đơn vị vận chuyển này không thể xóa !", {
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

  return (
    <div className={classes["container__orders"]}>
      {showFormUpdate&& viewUpdateShipping(handleUpdateShipping, toggleForm)}
      <div className={classes["cart-item"]} key={shippingUnit.idshippingUnit}>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{shippingUnit.shippingUnitName}</p>
        </div>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{shippingUnit.email}</p>
        </div>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{shippingUnit.address}</p>
        </div>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{shippingUnit.telephone}</p>
        </div>
        <div>
          <FaTrash
            className={classes["item-icon"]}
              onClick={handleRemove}
          />
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

export default ShippingUnit;
