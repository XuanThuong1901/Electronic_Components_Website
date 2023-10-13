import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../apiRequest/axios";
import classes from "./ListDiscount.module.css";

const ListDiscount = () => {
  const [discountList, setDiscount] = useState([]);

  const getDiscountList = async () => {
    const res = await api.get("/discounts", {});
    return res;
  };
  useEffect(() => {
    getDiscountList().then((res) => {
      setDiscount(res.data.discountList);
      console.log(res);
    });
    getDiscountList().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className={classes['container']}>

    </div>
  );
};

export default ListDiscount;
