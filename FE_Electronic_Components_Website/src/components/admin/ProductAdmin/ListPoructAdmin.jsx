import React from "react";
import { useState, useEffect } from "react";
import api from "../../../apiRequest/axios";
import classes from "./ListProduct.module.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const ListProdcutAdmin = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [isCheckHandle, setIsCheckHandle] = useState(false);

  const getProducts = async () => {
    const res = await api.get("/product", {
    });
    return res;
  };
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if(isCheckHandle === true)
  {
    getProducts()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsCheckHandle(false);
  }


  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Danh sách sản phẩm
          </h1>
        </div>
      </div>
        <div className={classes["add"]}>
            <button className={classes["add-button"]} onClick={()=>{ navigate("/admin/product/add")}}>Thêm sản phẩm</button>
        </div>
        <div className={classes["container"]}>
      <div className={classes["container__orders"]}>
        <div className={classes["cart-item"]}>
          <div className={classes["main"]}>
            <p>Hình ảnh</p>
          </div>
          <div className={classes["main"]}>
            <p>Tên sản phẩm</p>
          </div>
          <div className={classes["main"]}>
            <p>Nhà cung cấp</p>
          </div>
          <div className={classes["main"]}>
            <p>Số lượng</p>
          </div>
          <div className={classes["main"]}>
            <p>Giá</p>
          </div>
          <div className={classes["main"]}>
            <p>Trạng thái</p>
          </div>
        </div>
      </div>
      {product.map((item) =>
        <Product product={item} setIsCheckHandle={setIsCheckHandle}/>
      )}
    </div>
    </div>
  );
};

export default ListProdcutAdmin;
