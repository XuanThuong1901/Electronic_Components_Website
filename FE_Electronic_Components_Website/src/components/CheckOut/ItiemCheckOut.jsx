import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import classes from './ItiemCheckOut.module.css'
import Table from 'react-bootstrap/Table';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../apiRequest/axios';
import Mapbox from "../Mapbox/Mapbox";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import formatCurrency from "../../Helper/convertUSD";

const ItiemCheckOut = () => {
    const token = localStorage.getItem('token')
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    const navigate = useNavigate();

    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [items, setItems] = useState([])


    const getData = async() => {
        const res = await api.get("/cart",{
            headers: {
                access_token: token
            }
        })
        console.log(res)
        return res
    }

    const CheckOut = () => {
        if(items.length===0){
            return(
                toast.error('Giỏ hàng không có sản phẩm', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            ))
        }  
        else{
            try{
                navigate("/payment")
            }catch(error){
            console.log(error.response.data);
            }
        }
    }

    // gọi items trong cart
    useEffect(() => {
        if(token === undefined)
        {
            navigate("/")
        }
      
        getData().then((res) => {
            setItems(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },[])
    console.log(items);
    // const handleChange = (event) => {
    //     setValue(Math.min(Math.max(Number(event.target.value), 1), 100));
    // };

    //Tang giam so luong items
    const handleIncrement = (id_item, quantityProduct, quantity) =>{

        if(quantity < quantityProduct){
            quantity++

            api.post(`cart/update/${id_item}`,{quantity},
            {
                headers: {
                    access_token: token
                }
            })
            .then(function (res) {
                console.log(res)
                toast.success('Tăng số lượng thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                getData().then((res) => {
                    setItems(res.data)
                })
                getData().catch((err) => {
                    console.log(err)
                })
            })
            .catch(function (res) {
                console.log(res)
                toast.error('Thao tác thất bại', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        }
        else{
            toast.error('Số lượng tồn không đủ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        
    }
    //console.log(value)
    const handleDecrement = (id_item, quantity) =>{
        
        if(quantity > 1)
        {
            quantity--
            api.post(`cart/update/${id_item}`,{quantity},
            {
                headers: {
                    access_token: token
                }
            })
            .then(function (res) {
                console.log(res)
                toast.success('Giảm số lượng thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }); 
                getData().then((res) => {
                    setItems(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch(function (res) {
                console.log(res)
                toast.error('Thao tác thất bại', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        }
        else
        {
            toast.error('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleDelteitem = async (id_item) => {
        api.delete(`cart/delete/${id_item}`,
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res)
            toast.success('Đã xoá khỏi giỏ hàng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }); 
            getData().then((res) => {
                setItems(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch(function (res) {
            console.log(res)
            toast.warn('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }

    return (
        <div className="container">
            {items.map((item) =>{
            return(
            <div>
            <div className={classes["cart-item"]} key={item.cartId.idproduct}>
                <CloseIcon className={classes["icon"]} 
                    onClick={() => handleDelteitem(item.cartId.idproduct)}
                />
                <div className={classes["image-item"]}>
                    <img src={item.product.imageProducts[0].urlimg} alt="food image" width="90px" height="90px"></img>
                </div>
                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/product-detail/${item.cartId.idproduct}`)}>{item.product.productName}</p>
                </div>
                <div className={classes["price"]}>
                    <p>Đơn Giá : {formatCurrency(item.product.priceLists[0].price)}</p>
                </div>
                <div className={classes["input-quantity"]}>
                        
                        <button onClick={() => handleDecrement(item.cartId.idproduct, item.quantity)}> - </button>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleIncrement(item.cartId.idproduct, item.product.quantity, item.quantity)}> + </button>
                </div>
                <div className={classes["total-price"]}>
                    <p>Tổng Giá : {formatCurrency(item.product.priceLists[0].price * item.quantity)}</p>
                </div>
                {/* <div >
                    <label>Chọn thanh toán</label>
                    <input
                        type="checkbox"
                        checked= {item.isCheck}
                        onChange={() => 
                            item.isCheck = !item.isCheck}
                    />
                </div> */}
            </div>
            <hr></hr>
            </div>
            )})}
            <hr></hr>
            <div className={classes["message"]}>
                <p>{message}</p>
            </div>
            <div className={classes["handle__error"]}>
                <p>{error}</p>
            </div>
            {/* <div className={classes["payment__map"]}>
            <div className={classes["payment__method"]}>
            <p>Chọn Phương thức thanh toán:</p>
            <select name="lang" id="lang-select" multiple onChange={handleChangePay} className={classes["set__payment"]}>
                {payments.map((pay) => {
                    return(
                    <option value={pay.id_payment}>
                        {pay.name}
                    </option>
                )})}   
            </select>
            <p>Thêm ghi chú cho đơn hàng</p>
            <textarea name="message" rows="7" cols="38" placeholder="Ghi Chú" onChange={handleChangeDes}></textarea>
            <p>Chọn đơn vị vận chuyển:</p>
            <select name="lang" id="lang-select" multiple onChange={handleChangeShipper} className={classes["set__payment"]}>
                {shippings.map((shipping) => {
                    return(
                    <option value={shipping.id_shipping_partner}>
                        {shipping.name}
                    </option>
                )})}   
            </select>
            </div>
            <div className={classes["box__map"]}>
                <Mapbox/>
            </div>
            </div> */}
            <div className={classes["Check__out"]}>
                <button
                    onClick={CheckOut}
                >
                    Đặt Hàng
                </button>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
        
    )
}

export default ItiemCheckOut