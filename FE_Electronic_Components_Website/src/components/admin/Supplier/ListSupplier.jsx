import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListSupplier.module.css";
import Supplier from "./Supplier";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

const ListSupplier = () => {
  const token = localStorage.getItem("token");

  const [supplier, setSupplier] = useState([]);
  const [isCheckHandle, setIsCheckHandle] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(true);
  const [supplierAdd, setSupplierAdd] = useState({});
  const [supplierName, setSupplierName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");

  const getSuppliers = async () => {
    const res = await api.get("/supplier", {});
    return res;
  };
  useEffect(() => {
    getSuppliers()
      .then((res) => {
        setSupplier(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const reducer = () =>{
    getSuppliers()
    .then((res) => {
      setSupplier(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  if (isCheckHandle === true) {
    getSuppliers()
      .then((res) => {
        setSupplier(res.data);
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
      supplierName.trim() !== "" &&
      email.trim() !== "" &&
      address.trim() !== "" &&
      telephone.trim() !== ""
    ) {
        api
          .post(`/supplier/add`,{ supplierName, email, telephone, address }, {
            headers: {
              access_token: token,
            },
            })
        .then(() => {
        setShowFormAdd(true);
        reducer();
        setSupplierName("");
        setEmail("");
        setAddress("");
        setTelephone("");
        toast.success("Thêm nhà cung cấp thành công", {
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
          return toast.error("Thêm nhà cung cấp thất bại", {
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
  const viewAddSupplier = () => {
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
              <Form.Label>Tên nhà cung cấp</Form.Label>
              <Form.Control
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
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
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Danh sách nhà cung cấp
          </h1>
        </div>
      </div>
      <div className={classes["add"]}>
        <button className={classes["add-button"]} onClick={toggleForm}>
          Thêm nhà cung cấp
        </button>
      </div>
      {!showFormAdd && viewAddSupplier(handleAddSupplier, toggleForm)}
      <div className={classes["container"]}>
        <div className={classes["container__orders"]}>
          <div className={classes["cart-item"]}>
            <div className={classes["main"]}>
              <p>Nhà cung cấp</p>
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
        {supplier.map((item) => (
          <Supplier supplier={item} setIsCheckHandle={setIsCheckHandle} />
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

export default ListSupplier;
