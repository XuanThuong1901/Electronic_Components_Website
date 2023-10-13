import classes from "./index.module.css";
import SideCartList from "./SideCartList";
import { useState,useEffect } from "react";
import Button from "../../Button/index"
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import api from '../../../../apiRequest/axios';
import BorderedButton from "../../Button/BorderedButton";



const Index = (props) => {
  const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`;
  const totalPrice = Number(3000000).toLocaleString("en");
  const token = localStorage.getItem('token')
  const [items,setItems] = useState([])
  const [click,setClick] = useState(1)
  const { itemList } = props;


  const getData = async() => {
    const res = await api.get("/cart",{
        headers: {
            access_token: token
        }
    })
    return res
  }
  useEffect(() => {
  
    getData().then((res) => {
      setItems(res.data.itemList)
    })
    getData().catch((err) => {
      console.log(err)
    })
  },[click])
  console.log(itemList)
  //check chỉ gọi lại api khi tắt cart
  // console.log(items)
  const handleClick = (e) => {
    setClick(click + 1)
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(
        (<div className={classesName}>
          <header className={classes.header} onClick={handleClick}>
            <h2>GIỎ HÀNG</h2>
            <button onClick={props.onClose}>Đóng</button>
          </header>
          <div className={classes["body-wrapper"]}>
            <SideCartList cartItems={itemList} />
            {items.length > 0 && (
              <div className={classes.footer}>
                {/* <div className={classes.total}>
                  <div>TỔNG GIÁ:</div>
                  <div>{totalPrice} Đ</div>
                </div> */}
                <div className={classes["button-group"]}>
                  {/* <NavLink to="/check-out">
                    <Button>Thanh toán</Button>
                  </NavLink> */}
                  <NavLink to="/check-out">
                    <BorderedButton>Chi tiết</BorderedButton>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>), document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default Index;
