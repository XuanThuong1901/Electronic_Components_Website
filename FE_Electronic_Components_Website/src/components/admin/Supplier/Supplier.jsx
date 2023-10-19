import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import api from "../../../apiRequest/axios";
import classes from "./ListSupplier.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaTrash } from "react-icons/fa";

const Supplier = ({ supplier, setIsCheckHandle }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [address, setAddress] = useState("");
  // const [supplierName, setSupplierName] = useState("");
  // const [email, setEmail] = useState("");
  // const [telephone, setTelephone] = useState("");

  const toggleForm = () => {
    setShowFormUpdate((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    setAddress(supplier.address);
  }, [])

  const viewUpdateSupplier = () => {
    // setAddress(supplier.address);
    return (
      <div className={classes["supplier-update"]}>
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
        <div className={classes["supplier-update-detail"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="supplierName"
              className={classes["supplier-form"]}
            >
              <Form.Label>Tên nhà cung cấp</Form.Label>
              <Form.Control
                type="text"
                value={supplier.supplierName}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className={classes["supplier-form"]}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={supplier.email}
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
                value={supplier.telephone}
                required
              />
            </Form.Group>
            <div className={classes["supplier-form-button"]}>
              <button type="button" onClick={handleUpdateSupplier}>
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
  const handleUpdateSupplier = () => {
    if (
      address.trim() !== ""
    ) {
        api
          .post(`/supplier/update/${supplier.idsupplier}`,{ address }, {
            headers: {
              access_token: token,
            },
            })
        .then(() => {
          setIsCheckHandle(true);
          toast.success("UPDATE_SUPPLIER_SUCCESS", {
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
          return toast.error("UPDATE_SUPPLIER_ERROR001", {
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
      .delete(`/supplier/delete/${supplier.idsupplier}`)
      .then((res) => {
        setIsCheckHandle(true);
        return toast.error("DELETE_SUPPLIER_SUCCESS", {
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
        return toast.error("DELETE_SUPPLIER_ERROR001", {
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
      {showFormUpdate&& viewUpdateSupplier(handleUpdateSupplier, toggleForm)}
      
      <div className={classes["cart-item"]} key={supplier.idsupplier}>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{supplier.supplierName}</p>
        </div>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{supplier.email}</p>
        </div>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{supplier.address}</p>
        </div>
        <div className={classes["item"]} onClick={toggleForm}>
          <p>{supplier.telephone}</p>
        </div>
        <div>
          <FaTrash
            className={classes["item-icon"]}
              onClick={handleRemove}
          />
        </div>

      {/* {!showFormUpdate && viewUpdateSupplier(handleUpdateSupplier, toggleForm)} */}

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

export default Supplier;
