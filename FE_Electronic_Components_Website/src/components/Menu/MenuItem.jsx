import React from "react";
import classes from './MenuItem.module.css'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "./ListItem";

const MenuItem = ({id_item}) =>{
    // console.log("id_item",id_item)
    return (
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5 align-baseline' style={{marginLeft: "15px"}}>Sản phẩm</h1>
                <p className="" style={{marginLeft: "15px"}}><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Sản phẩm</p>
                </div>
                
            </div>
            <ListItem id_item = {id_item}/>
        </div>
    )
}

export default MenuItem;