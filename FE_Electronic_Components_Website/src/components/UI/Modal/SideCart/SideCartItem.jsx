import { NavLink } from "react-router-dom";
import api from '../../../../apiRequest/axios';
import classes from "./SideCartItem.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const SideCartItem = (props) => {
  const token = localStorage.getItem('token')
  const { item } = props;
  const removeItemAPI = `remove/${item.id}`;
  const itemLink = `food/${item.id}`;
  const price = Number(item.price).toLocaleString("en");
  const handleDelteitem = async (id_item) => {
    api.delete(`cart/remove/${item.id_item}`,
    {
        headers: {
            access_token: token
        }
    })
    .then(function (res) {
        console.log(res) 
    })
    .catch(function (res) {
        console.log(res)
    });
  }
  // console.log(item.id_item)
  return (
    <li className={classes.item}>
      <NavLink  className={classes["remove-btn"]}
        onClick={() => handleDelteitem(item.id_item)}
      >
        <HighlightOffIcon />
      </NavLink>
      <div className="w-100">
        <NavLink className={classes["item-nav"]} to={itemLink}>
          <img src={item.image} alt="hinh san pham"></img>
          <span>{item.name}</span>
        </NavLink>
        <span className={classes["item-desc"]}>
          {item.quantity} x <p>{price} Đ</p>
        </span>
      </div>
    </li>
  );
};

export default SideCartItem;
