import React from "react";
import classes from './Payment.module.css';
import ItiemCheckOut from '../CheckOut/ItiemCheckOut'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaymentDetail from "./PaymentDetail";

const Payment = () => {

    return(
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5 align-baseline' style={{marginLeft: "15px"}}>Thanh Toán</h1>
                <p className="" style={{marginLeft: "15px"}}><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Thanh Toán</p>
                </div>
            </div>
            <PaymentDetail/>
        </div>
    )
}
export default Payment

