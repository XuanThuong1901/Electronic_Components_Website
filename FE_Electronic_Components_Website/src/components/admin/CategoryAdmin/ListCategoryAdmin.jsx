import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListCategory.module.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";
import CategoryAdmin from "./CategoryAdmin";

const ListCategoryAdmin = () => {
  const token = localStorage.getItem("token");

  const [shippingUnit, setShippingUnit] = useState([]);
  const [isCheckHandle, setIsCheckHandle] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(true);
  const [supplierAdd, setSupplierAdd] = useState({});
  const [shippingUnitName, setShippingUnitName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");

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
      shippingUnitName.trim() !== "" &&
      email.trim() !== "" &&
      address.trim() !== "" &&
      telephone.trim() !== ""
    ) {
        api
          .post(`/shipping_unit/add`,{ shippingUnitName, email, telephone, address }, {
            headers: {
              access_token: token,
            },
            })
        .then(() => {
        setShowFormAdd(true);
        setIsCheckHandle(true);
        setShippingUnitName("");
          setEmail("");
          setAddress("");
          setTelephone("");
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
        });
      
    }
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
        <div className={classes["supplier"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="supplierName"
              className={classes["supplier-form"]}
            >
              <Form.Label>Tên đơn vị vận chuyển</Form.Label>
              <Form.Control
                type="text"
                value={shippingUnitName}
                onChange={(e) => setShippingUnitName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className={classes["supplier-form"]}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="address"
              className={classes["supplier-form"]}
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
              className={classes["supplier-form"]}
            >
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </Form.Group>
            <div className={classes["supplier-form-button"]}>
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
      <div className={classes["add"]}>
        <button className={classes["add-button"]} onClick={toggleForm}>
          Thêm danh mục
        </button>
      </div>
      {!showFormAdd && viewSupplier(handleAddSupplier, toggleForm)}
      <div className={classes["container"]}>
        <div className={classes["container__orders"]}>
          <div className={classes["cart-item"]}>
            <div className={classes["main"]}>
              <p>Tên danh mục</p>
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
          <CategoryAdmin shippingUnit={item} setIsCheckHandle={setIsCheckHandle} />
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

export default ListCategoryAdmin;
