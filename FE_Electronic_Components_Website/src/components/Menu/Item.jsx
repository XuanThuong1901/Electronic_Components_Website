import React from "react";
import classes from "./ListItem.module.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RatingStars from "../UI/RatingStars/Index";
import { FormControl } from "react-bootstrap";
import Footer from "../UI/Footer/index";
import { useState, useEffect, useContext } from "react";
import api from "../../apiRequest/axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatCurrency from "../../Helper/convertUSD";

const Item = ({ item }) => {
  const navigate = useNavigate();

  return (
   <>
    <div key={item.idproduct} className="col-lg-3 mb-5 ">
    <div className={classes["container-item"]}>
      <div className={classes["image-item"]}>
        <img
          src={item.imageProducts[0].urlimg}
          alt="food image"
          width="200px"
          height="190px"
        ></img>
      </div>
      <div className={classes["des-item"]}>
        <div className={classes["item-detail"]}>
          <span
            className={classes.namefood}
            onClick={() =>
              navigate(`/product-detail/${item.idproduct}`)
            }
          >
            {item.productName}
          </span>
          {/* <div className={classes.rating}>
            <RatingStars rating={3} />
          </div> */}
          <p>{item.description}</p>
          <p>{item.supplier.supplierName}</p>
          <span className={classes.price}>
            {formatCurrency(item.priceLists[0].price)}
          </span>
        </div>
      </div>
      <div className={classes["des-button"]}>
        <Link to={`/product-detail/${item.idproduct}`}>
          <button>Chi tiết</button>
        </Link>
      </div>
    </div>
  </div>
   </>
  );
};

export default Item;
