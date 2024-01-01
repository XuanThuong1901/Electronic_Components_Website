import React from "react";
import { useLocation } from "react-router-dom";
import classes from './CreateReturnOrder.module.css';
import ItiemCheckOut from '../CheckOut/ItiemCheckOut'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CreateReturnOrderDetail from "./CreateReturnOrderDetail";

const CreateReturnOrder = () => {
    const location = useLocation();
    const { orderDetail } = location.state;
    // console.log(orderDetail)
    return(
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5 align-baseline' style={{marginLeft: "15px"}}>Đơn đổi trả sản phẩm</h1>
                <p className="" style={{marginLeft: "15px"}}><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Thanh Toán</p>
                </div>
            </div>
            <CreateReturnOrderDetail item={orderDetail}/>
        </div>
    )
}
export default CreateReturnOrder

