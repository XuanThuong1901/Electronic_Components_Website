import React from "react";
import { useParams } from 'react-router-dom';
import MenuItem from "../components/Menu/MenuItem";
const Menu = () =>{

    const { id_item } = useParams(); 

    //setup time reset token login
    var timeOut = localStorage.getItem('timeOut'); // Reset storage 
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > timeOut*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
    return (
        <div style={{marginTop:'4.75rem'}}>
            <MenuItem id_item={id_item}/>
        </div>
    )
}

export default Menu;