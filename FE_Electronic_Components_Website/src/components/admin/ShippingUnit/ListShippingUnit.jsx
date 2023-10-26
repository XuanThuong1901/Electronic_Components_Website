import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListShippingUnit.module.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";
import ShippingUnit from "./ShippingUnit";

const ListShippingUnit = () => {
  const token = localStorage.getItem("token");

  const [shippingUnit, setShippingUnit] = useState([]);
  const [isCheckHandle, setIsCheckHandle] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(true);
  const [supplierAdd, setSupplierAdd] = useState({});
  const [shippingUnitName, setShippingUnitName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [shippingUnitNameError, setShippingUnitNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");

  const getShippingUnit = async () => {
    const res = await api.get("/shipping_unit", {});
    return res;
  };
  useEffect(() => {
    getShippingUnit()
      .then((res) => {
        setShippingUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   const reducer = () =>{
  //     getShippingUnit()
  //     .then((res) => {
  //       setShippingUnit(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }

  if (isCheckHandle === true) {
    getShippingUnit()
      .then((res) => {
        setShippingUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsCheckHandle(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleForm = () => {
    setShowFormAdd((prevShowForm) => !prevShowForm);
  };
  const handleAddSupplier = () => {
    if (
      shippingUnitName.trim() === "" ||
      email.trim() === "" ||
      address.trim() === "" ||
      telephone.trim() === ""
    ) {
      if (shippingUnitName.trim() === "") {
        setShippingUnitNameError("Tên không được để trống !");
      } else {
        setShippingUnitNameError("");
      }

      if (email.trim() === "") {
        setEmailError("Email không được để trống !");
      } else {
        setEmailError("");
      }

      if (address.trim() === "") {
        setAddressError("Địa chỉ không được để trống !");
      } else {
        setAddressError("");
      }

      if (telephone.trim() === "") {
        setTelephoneError("Số điện thoại không được để chống");
      } else {
        setTelephoneError("");
      }

      return;
    }

    api
      .post(
        `/shipping_unit/add`,
        { shippingUnitName, email, telephone, address },
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then(() => {
        setShowFormAdd(true);
        setIsCheckHandle(true);
        setShippingUnitName("");
        setEmail("");
        setAddress("");
        setTelephone("");
        toast.success("Thêm đơn vị vận chuyển thành công", {
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
      .catch((err)=> {
        console.log(err)
        toast.error("Có thông tin trùng với đơn vị vận chuyển có trước đó !", {
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
  };
  const viewSupplier = () => {
    return (
      <div>
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
        <div className={classes["shipping"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="shippingUnitName"
              className={classes["shipping-form"]}
            >
              <Form.Label>Tên đơn vị vận chuyển</Form.Label>
              <Form.Control
                type="text"
                value={shippingUnitName}
                onChange={(e) => setShippingUnitName(e.target.value)}
              />
              <p className={classes["error"]}>{shippingUnitNameError}</p>
            </Form.Group>
            <Form.Group controlId="email" className={classes["shipping-form"]}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={classes["error"]}>{emailError}</p>
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
              />
              <p className={classes["error"]}>{addressError}</p>
            </Form.Group>
            <Form.Group
              controlId="telephone"
              className={classes["shipping-form"]}
            >
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <p className={classes["error"]}>{telephoneError}</p>
            </Form.Group>
            <div className={classes["shipping-form-button"]}>
              <button type="button" onClick={handleAddSupplier}>
                Add
              </button>
              <button type="button" onClick={toggleForm}>
                Exit
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Danh sách đơn vị vận chuyển
          </h1>
        </div>
      </div>
      <div className={classes["add"]}>
        <button className={classes["add-button"]} onClick={toggleForm}>
          Thêm nhà đơn vị vận chuyển
        </button>
      </div>
      {!showFormAdd && viewSupplier(handleAddSupplier, toggleForm)}
      <div className={classes["container"]}>
        <div className={classes["container__orders"]}>
          <div className={classes["cart-item"]}>
            <div className={classes["main"]}>
              <p>Đơn vị vận chuyển</p>
            </div>
            <div className={classes["main"]}>
              <p>Email</p>
            </div>
            <div className={classes["main"]}>
              <p>Địa chỉ</p>
            </div>
            <div className={classes["main"]}>
              <p>Số điện thoại</p>
            </div>
            <div></div>
          </div>
        </div>
        {shippingUnit.map((item) => (
          <ShippingUnit
            shippingUnit={item}
            setIsCheckHandle={setIsCheckHandle}
          />
        ))}
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

export default ListShippingUnit;
