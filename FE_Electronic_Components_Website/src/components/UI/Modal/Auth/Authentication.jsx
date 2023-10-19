import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink,useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from '../../../../apiRequest/axios'
import AuthContext from "../../../../apiRequest/Authprovider";
import classes from "./Authentication.module.css";
import LabledInput from "../../Input/LabledInput";
import Button from "../../Button/index";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TokenContext from "../../../Layout/TokenContext";


const validateLogin = (values) => {
  const errors = {};

  if (!values.email || values.email.trim().length === 0) {
    errors.email = "VALIDATION_EMAIL_ERROR001"; }
  else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)) {
    errors.email = "VALIDATION_EMAIL_ERROR002";
  }

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "VALIDATION_PASSWORD_ERROR001"; }
   else if (!/(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password)) {
    errors.password = "VALIDATION_PASSWORD_ERROR002";
  }

  return errors;
};

const LoginForm = (props) => {
  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [success,setSuccess] = useState(false);
  const [errors,setError] = useState("");

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      console.log(values);
      handlesubmit(values);
    },
  });

  const handlesubmit = async(values) => {
    
    try{
        const res = await api.post("/api/auth/login",values);
        if(res.data === null)
          return;
          
        // navigate("/")
        setSuccess(true)
        if(res.data.account.customers != null){
          navigate("/")
          const name = res.data.account.customers.name
          const id_customer = res.data.account.customers.idcustomer
          const email = res.data.account.email
          const phone = res.data.account.customers.telephone
          const address = res.data.account.customers.address
          const id_account = res.data.account.idaccount
          setAuth({name,id_customer,phone,address,id_account,email})
        }
        else if(res.data.account.employer != null)
        {
          navigate("/admin")
          const name = res.data.account.employer.name
          const id_eployee = res.data.account.employer.idcustomer
          const email = res.data.account.email
          const phone = res.data.account.employer.telephone
          const address = res.data.account.employer.address
          const birthday = res.data.account.employer.birthday
          const gender = res.data.account.employer.gender
          const identityCard = res.data.account.employer.identityCard
          const avatar = res.data.account.employer.avatar
          const id_account = res.data.account.idaccount
          setAuth({name,id_eployee,phone,address,id_account, birthday, gender, identityCard, avatar,email})
        }

        localStorage.setItem('token',res.data.token);
        localStorage.setItem('timeOut',res.data.expireTime)
        props.setToken(res.data.token)
        toast.success("UPDATE_PRODUCT_SUCCESS", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
    catch(err){
        console.log(err)
        setError("LOGIN_ERROR001")
    } 
}
    

  return (
    <form onSubmit={formikLogin.handleSubmit}>
      <p className={classes["errors__login"]}>{errors}</p>
      <LabledInput
         name="email"
         label="email"
         placeholder="Nhập email"
         required={true}
         value={formikLogin.values.email}
         onChange={formikLogin.handleChange}
         onBlur={formikLogin.handleBlur}
         error={
          formikLogin.touched.email && formikLogin.errors.email
            ? formikLogin.errors.email
            : null
         }
      />
      <LabledInput
        name="password"
        label="Mật khẩu"
        placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
        required={true}
        type="password"
        value={formikLogin.values.password}
        onChange={formikLogin.handleChange}
        onBlur={formikLogin.handleBlur}
        error={
          formikLogin.touched.password && formikLogin.errors.password
            ? formikLogin.errors.password
            : null
        }
      />
      <div className={classes.switch}>
        <p>Không có tài khoản ? Chuyển sang Đăng ký</p>
        <NavLink to="/register" onClick={props.onClose}>
          <Button>
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </NavLink>
      </div>
      <Button type="submit">Đăng Nhập</Button>
    </form>
  );
};






const Authentication = (props) => {
  const authClasses = `${classes[`${props.className}`]} ${
    classes["auth-wrapper"]
  }`;
  const { token, setToken } = useContext(TokenContext);

  return (
    <Fragment>
      {ReactDOM.createPortal(
         <div className={authClasses}>
          <div className={classes.wrapper}>
            <header className="my-3 d-flex justify-content-between">
              <h1 className={classes["form-header"]}>Đăng nhập</h1>
              {/* <p>Sai thông tin đăng nhập</p> */}
              <button onClick={props.onClose} className={classes.close}>
                <CloseIcon />
              </button>
           </header>
           <LoginForm onClose={props.onClose} setToken={setToken}/>
          </div>
         </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Authentication;
