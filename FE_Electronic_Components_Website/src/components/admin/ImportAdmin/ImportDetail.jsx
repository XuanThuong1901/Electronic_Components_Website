import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../apiRequest/axios";
import classes from "./DetailImport.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";

const ImportDetail = () => {
  const token = localStorage.getItem("token");
  const { idimport } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [amount, setAmount] = useState(0);

  const getOrdersDetail = async () => {
    const res = await api.get(`/admin/import/${idimport}`, {
      headers: {
        access_token: token,
      },
    });
    console.log(res)
    return res;
  };
  useEffect(() => {
    getOrdersDetail()
      .then((res) => {
        setItems(res.data);
        let temp = 0;
        res.data.detailImportStocks.map((item) => {
          temp += (item.quantity * item.price)
        })
        setAmount(temp)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function Status(e) {
    const status = e.value;
    if (status === 8) {
      return (
        <div>
          <p className={classes["text-confirm"]}>Đang xử lý </p>
        </div>
      );
    }

    if (status === 9) {
      return (
        <div>
          <p className={classes["text-confirm"]}>Hoàn tất </p>
        </div>
      );
    } 
  }

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Thông tin phiếu nhập
          </h1>
        </div>
      </div>
    <div className={classes.container}>
      {items !== null && (
        <div className="row">
          <div className="col-12 col-md-8">
            <div className={classes["list__items"]}>
              <div className={classes["title_import"]} >
                <p>
                  Thông tin sản phẩm nhập
                </p>
                <hr></hr>
              </div>
              {items.detailImportStocks.map((item) => {
                return (
                  <div>
                    <div className={classes["cart-item"]} key={item.id_item}>
                      <div className={classes["image-item"]}>
                        <img
                          src={item.product.imageProducts[0].urlimg}
                          alt="food image"
                          width="90px"
                          height="90px"
                        ></img>
                      </div>
                      <div className={classes["name-item"]}>
                        <p>{item.product.productName}</p>
                      </div>
                      <div className={classes["price"]}>
                        <p>Đơn Giá : {formatCurrency(item.price)}</p>
                      </div>
                      <div className={classes["input-quantity"]}>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                      <div className={classes["total-price"]}>
                        <p>
                          Tổng Giá :{" "}
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={classes["info__order"]}>
              <div className={classes["info__order-title"]}>
                Thông tin đơn nhập
              </div>
              <div className={classes["info__user"]}>
              <div className={classes["info__user-item"]}>
                  <h1>Tên đơn nhập </h1>
                  <p>: {items.importStockName} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Nhân viên lập đơn</h1>
                  <p>: {items.employer.name} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Ngày nhập </h1>
                  <p>: {formatTime(items.dateAdded)} {formatDate(items.dateAdded)}</p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Ngày hoàn tất </h1>
                  <p>: {formatTime(items.updatedDate)} {formatDate(items.updatedDate)}</p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Nhà cung cấp </h1>
                  <p>: {items.supplier.supplierName} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Ghi chú </h1>
                  <p>: {items.contents} </p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Tổng giá trị </h1>
                  <p>: {formatCurrency(amount)}</p>
                </div>
                <div className={classes["info__user-item"]}>
                  <h1>Trạng thái đơn hàng: </h1>
                  <p>
                    <Status value={items.status.idstatus} />{" "}
                  </p>
                </div>
              </div>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ImportDetail;
