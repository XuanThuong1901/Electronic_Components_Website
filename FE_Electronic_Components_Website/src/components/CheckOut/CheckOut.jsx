import React from "react";
import classes from './CheckOut.module.css'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItiemCheckOut from "./ItiemCheckOut";

const CheckOut = () => {
    return (
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                    <h1 className='display-5 align-baseline' style={{marginLeft: "15px"}}>Giỏ Hàng</h1>
                    <p className="" style={{marginLeft: "15px"}}><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Giỏ Hàng</p>
                </div>
            </div>
            <ItiemCheckOut/>
        </div>
    )
}

export default CheckOut