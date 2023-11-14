import React from "react";
import classes from './ChangePassword.module.css'
import { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import api from '../../apiRequest/axios';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"


const ChangePassword = () => {
    const token = localStorage.getItem('token')
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [resetPassword,setResetPassword] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setResetPassword(event.target.value);
    };

    const isCheckNewPassword = () => {
        if(newpassword !==  resetPassword)
        {
            setErrorNewPassword("Mật khẩu xác nhận không giống !")
        }
        else{
            setErrorNewPassword("")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
                api.post(`/user/updatepassword`, {
                    password: password,
                    newPassword: newpassword,
                },
                    {
                        headers: {
                            Access_token: token,
                        }
                    }
                )
                .then(res =>{
                    toast.success('Cập nhật mật khẩu thành công', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                })
                .catch(err =>{
                    console.log(err);
                    setError(err.response.data.message)
                    console.log(error)
                    if(error===""){
                        return(
                        toast.error('Cập nhật mật khẩu thất bại, vui lòng thử lại !', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        }));
                    }
                    else{
                        setErrorPassword("Mật khẩu không đúng !")
                    }   
                })
                
            }catch(error){
                console.log(error);
        }    
    };
    // console.log(password)

    return(
        <div className="container">
            <div className={classes["form__changepw"]}>
        <div className={classes["login"]}>
            <h1>Đổi Mật Khẩu</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="specificationName"
              className={classes["specification-form"]}
            >
              <Form.Label>Mật khẩu củ</Form.Label>
              <Form.Control
              className={classes["specification-form-text"]}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorPassword !== "" && <div className={classes["password-error"]}>
                <p>{errorPassword}</p>
                </div>}
            </Form.Group>
            <Form.Group
              controlId="parameter"
              className={classes["specification-form"]}
            >
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="parameter"
              className={classes["specification-form"]}
            >
              <Form.Label>Nhập lại mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                value={resetPassword}
                onChange={(e) => {setResetPassword(e.target.value);
                    isCheckNewPassword(e.target.value)}}
                required
              />
            </Form.Group>
            {errorNewPassword !== "" && <div className={classes["password-error"]}>
                <p>{errorNewPassword}</p>
                </div>}
            <div className={classes["login"]}>
              <button type="button" onClick={handleSubmit}>
                Thay đổi
              </button>
            </div>
          </Form>
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
    )
}


export default ChangePassword