import { React, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import api from "../apiRequest/axios";
import { useNavigate } from "react-router-dom";
//import CloseIcon from "@mui/icons-material/Close";
//import { NavLink } from "react-router-dom";
//import { Fragment } from "react";
import LabledInput from "../components/UI/Input/LabledInput";
import Button from "../components/UI/Button/SmallButton";

const validateLogin = (values) => {
  const errors = {};

  if (!values.email || values.email.trim().length === 0) {
    errors.email = "Xin hãy nhập email !";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hợp lệ !";
  }

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "Xin hãy nhập mật khẩu !";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
    errors.password = "Mật khẩu không hợp lệ !";
  }
  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Xin hãy nhập tên của bạn !";
  } else if (!/[,#-\/\s\!\@\$.....]/.test(values.name)) {
    errors.name = "Tên không hợp lệ !";
  }
  if (!values.phone || values.telephone.trim().length === 0) {
    errors.phone = "Xin hãy nhập số điện thoại của bạn !";
  } else if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      values.phone
    )
  ) {
    errors.phone = "số điện thoại không hợp lệ !";
  }
  if (!values.address || values.address.trim().length === 0) {
    errors.address = "Xin hãy nhập địa chỉ của bạn !";
  } else if (!/[,#-\/\s\!\@\$.....]/.test(values.address)) {
    errors.address = "địa chỉ không hợp lệ !";
  }
  // if (values.checkpassword != values.password) {
  //   errors.checkpassword = "Mật khẩu không trùng khớp !";
  // }

  return errors;
};

const Register = () => {
  const navigate = useNavigate();

  const handlesubmit = (values) => {
    api
      .post(`/api/auth/register/customer`, values)
      .then(function (res) {
        console.log(res);
        alert("Đăng Ký Thành công");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Thao tác thất bại", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (err === "Email already in use.") {
          formikRegister.errors.email = "Email đã tồn tại !";
        }
      });
       formikRegister.handleSubmit();
  };
  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      telephone: "",
      address: "",
    },
    validate: validateLogin,
    onSubmit: (values) => {
      handlesubmit(values);
      console.log(values);
    },
  });
  //console.log(username);
  return (
    <div>
      <div className="container " style={{ marginTop: "100px" }}>
        <div>
          <h1 className="display-6 mark text-center">Đăng ký tài khoản</h1>
        </div>
        <form  onSubmit={(e) => { e.preventDefault(); handlesubmit(formikRegister.values); }}>
          <LabledInput
            name="email"
            label="Email"
            placeholder="Nhập Email"
            required={true}
            value={formikRegister.values.email}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.email && formikRegister.errors.email
                ? formikRegister.errors.email
                : null
            }
          />
          <LabledInput
            name="password"
            label="Mật khẩu"
            placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
            required={true}
            type="password"
            value={formikRegister.values.password}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.password && formikRegister.errors.password
                ? formikRegister.errors.password
                : null
            }
          />
          {/* <LabledInput
        name="checkpassword"
        label="Nhập lại Mật khẩu"
        placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
        required={true}
        type="password"
        //value={formikRegister.values.checkpassword}
        //onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.checkpassword && formikRegister.errors.checkpassword
            ? formikRegister.errors.checkpassword
            : null
        }
      />  */}
          <LabledInput
            name="name"
            label="Họ tên của bạn"
            placeholder="Nhập họ tên của bạn"
            required={false}
            value={formikRegister.values.name}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.name && formikRegister.errors.name
                ? formikRegister.errors.name
                : null
            }
          />
          <LabledInput
            name="telephone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại của bạn"
            required={true}
            value={formikRegister.values.telephone}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.telephone &&
              formikRegister.errors.telephone
                ? formikRegister.errors.telephone
                : null
            }
          />
          <LabledInput
            name="address"
            label="địa chỉ"
            placeholder="Nhập địa chỉ của bạn"
            required={true}
            value={formikRegister.values.address}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.address && formikRegister.errors.address
                ? formikRegister.errors.address
                : null
            }
          />
          <Button type="submit">
            Đăng Ký
          </Button>
        </form>
        
      </div>
    </div>
  );
};

export default Register;
