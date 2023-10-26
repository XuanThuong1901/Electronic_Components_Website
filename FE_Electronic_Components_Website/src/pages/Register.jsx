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
    errors.email = "VALIDATION_EMAIL_ERROR001";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "VALIDATION_EMAIL_ERROR002";
  }

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "VALIDATION_PASSWORD_ERROR001";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
    errors.password = "VALIDATION_PASSWORD_ERROR002";
  }
  if (!values.name || values.name.trim().length === 0) {
    errors.name = "VALIDATION_NAME_ERROR001";
  } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(values.name)) {
    errors.name = "VALIDATION_NAME_ERROR002";
  }
  if (!values.phone || values.telephone.trim().length === 0)  {
    errors.phone = "VALIDATION_PHONENUMBER_ERROR001";
  } 
  else if (!/^0\d{9}$/.test(values.phone)) {
    errors.phone = "VALIDATION_PHONENUMBER_ERROR002";
  }
  if (!values.address || values.address.trim().length === 0) {
    errors.address = "VALIDATION_ADDRESS_ERROR001";
  } else if (!/[,#-\/\s\!\@\$.....]/.test(values.address)) {
    errors.address = "VALIDATION_ADDRESS_ERROR002";
  }
  // if (values.checkpassword != values.password) {
  //   errors.checkpassword = "Mật khẩu không trùng khớp !";
  // }

  return errors;
};

const Register = () => {
  const navigate = useNavigate();

  const handlesubmit = (values) => {
    api.post(`/api/auth/register/customer`, values)
    .then(function (res) {
        
        console.log(res)

        alert("REGISTER_SUCCESS");
        navigate("/");
      })
      .catch((err) => {

        console.log(err.response.data);
        let data = "";
        data = err.response.data;
        console.log(data);
        if (data.toString() === "VALIDATION_EMAIL_ERROR003") {
          toast.error("VALIDATION_EMAIL_ERROR003", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        else{
          toast.error("REGISTER_ERROR001", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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
            placeholder="Nhập mật khẩu ít nhất 6 kí tự"
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
            required={true}
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

export default Register;
