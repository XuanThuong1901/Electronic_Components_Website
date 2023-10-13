import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import classes from "./AddEmployee.module.css";
import api from "../../../apiRequest/axios";
import formatCurrency from "../../../Helper/convertUSD";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const token = localStorage.getItem("token");
  const { idemployee } = useParams();
  const [formData, setFormData] = useState(new FormData());

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(2);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState(true);
  const [identityCard, setIdentityCard] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [identityCardError, setIdentityCardError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleRole = (e) => {
    if (`${e}` === "2") {
      setRole(2);
    } else {
      setRole(3);
    }
  };
  const handleBirthdayChange = (e) => {
    const newDate = new Date(e.target.value);
    setBirthday(new Date(newDate).toISOString().split("T")[0]);
  };
  const handleGender = (e) => {
    if (e === "Nam") {
      setGender(true);
    } else {
      setGender(false);
    }
  };

  const avatarr = require("../../../assets/avatar/logo_avatar.jpg");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    setAvatar(URL.createObjectURL(file));
    formData.set("avatar", file);
  };

  const handleAdd = () => {
    const newUser = {
      name: name,
      email: email,
      role: role,
      birthday: birthday,
      gender: gender,
      identityCard: identityCard,
      telephone: telephone,
      address: address,
      password: "111111",
    };
    console.log(newUser);
    formData.append("user", JSON.stringify(newUser));

    api
      .post("/api/auth/register/employee", formData, {
        headers: {
          access_token: token,
        },
      })
      .then(() => {
        toast.success("Thêm nhân viên thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/admin/employee");
        }, 2000);
      })
      .catch((err) => {
        return toast.error("Thêm nhân viên thất bại vui lòng thử lại", {
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
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Thêm thông tin nhân viên
          </h1>
        </div>
      </div>
      <div className={classes["container"]}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className={classes["container-button"]}>
            <div className={classes["detail-button"]}>
              <Button type="submit" value={1}>
                Thêm
              </Button>
            </div>
          </div>
          <Form.Group controlId="imageProduct">
            <div className={classes["form-image"]} key={avatar}>
              <div>
                <div className={classes["form-image-detail"]}>
                  <img
                    src={avatar !== null ? avatar : avatarr}
                    alt={`Image_${avatar}`}
                    width="250px"
                    height="250px"
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="file-input"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label className={classes["form"]}>Tên nhân viên</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className={classes["form"]}>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label className={classes["form"]}>Chức vụ</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => handleRole(e.target.value)}
              required
            >
              <option value={2}>Quản lý</option>
              <option value={3}>Nhân viên</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="birthday">
            <Form.Label className={classes["form"]}>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={handleBirthdayChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label className={classes["form"]}>Giới tính</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Nam"
                value="Nam"
                checked={gender === true}
                onChange={(e) => handleGender(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                label="Nữ"
                value="Nữ"
                checked={gender === false}
                onChange={(e) => handleGender(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="identityCard">
            <Form.Label className={classes["form"]}>CCCD</Form.Label>
            <Form.Control
              type="number"
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="telephone">
            <Form.Label className={classes["form"]}>Số điện thoại</Form.Label>
            <Form.Control
              type="number"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label className={classes["form"]}>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
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
    </div>
  );
};
export default AddEmployee;
