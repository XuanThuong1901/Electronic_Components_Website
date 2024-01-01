import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../apiRequest/axios";
import classes from "./ReturnOrderDetail.module.css";
import formatCurrency from "../../../Helper/convertUSD";

const ReturnOrder = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const navigate = useNavigate();
  const [item, setItems] = useState(null);
  const [infoOder, setInfoOder] = useState({});

  const getOrdersDetail = async () => {
    const res = await api.get(`/return_order/${id}`, {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  useEffect(() => {
    getOrdersDetail()
      .then((res) => {
        setItems(res.data.returnOrderList[0]);
        // setInfoOder(res.data.info)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(infoOder)

  function Status(e) {
    const order = e.value;
    //console.log(order)
    if (order === "unconfirmed") {
      return <p className={classes["text-wait"]}>Chưa xác nhận</p>;
    }
    if (order === "confirmed") {
      return <p className={classes["text-confirm"]}>Đã xác nhận</p>;
    }
    if (order === "cancel") {
      return <p className={classes["text-cancel"]}>Từ chối</p>;
    }
    // if (order === 7) {
    //   return <p className={classes["text-cancel"]}>Đã Huỷ </p>;
    // } else {
    //   return <p className={classes["text-unconfirm"]}>Đã xác nhận </p>;
    // }
  }

  return (
    
    <div className={classes.container}>
        <div className={classes["title"]}>
        <h1>Chi Tiết Đơn Đổi, Trả</h1>
      </div>
    {item !== null && <div className="row">
      <div className={classes["form-product"]}>
        <div className={classes["name-item"]}>
          <p>
            Sản phẩm đổi ,trả:
          </p>
        </div>

        <div className={classes["list__items"]}>
          <div className={classes["cart-item"]} key={item.idproduct}>
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
              <p>
                Đơn Giá : {formatCurrency(item.product.priceLists[0].price)}
              </p>
            </div>
            <div className={classes["input-quantity"]}>
              <p>Số lượng: {item.quantity}</p>
            </div>
            <div className={classes["total-price"]}>
              <p>
                Tổng Giá :
                {formatCurrency(
                  (item.product.priceLists[0].price +
                    (item.product.priceLists[0].price *
                      item.product.tax.taxPercentage) /
                      100) *
                    item.quantity
                )}
              </p>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
     
      <div className="col-12 col-md-6">
        <div className={classes["payment__method"]}>
          <Form.Group controlId="contents">
            <Form.Label className={classes["form"]}>Tên người đổi trả:</Form.Label>
            <Form.Control
              as="input"
              placeholder=""
              rows={3}
              value={item.name}
              required
            />
          </Form.Group>
          <Form.Group controlId="contents">
            <Form.Label className={classes["form"]}>Địa chỉ: </Form.Label>
            <Form.Control
              as="input"
              placeholder=""
              rows={3}
              value={item.address}
              required
            />
          </Form.Group>
          <Form.Group controlId="contents">
            <Form.Label className={classes["form"]}>Số điện thoại:</Form.Label>
            <Form.Control
              as="input"
              type="number"
              placeholder=""
              rows={3}
              value={item.phoneNumber}
              required
            />
          </Form.Group>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className={classes["payment__method"]}>
          <Form.Group controlId="imageProduct">
            <Form.Label className={classes["form"]}>
              Hình ảnh sản phẩm đổi trả:
            </Form.Label>
            <div>
              <div className={classes["form-image"]}>
                {item.imageReturnOrderList.map((image) => (
                  <div
                    className={classes["form-image-detail"]}>
                    <img
                        src={image.url}
                        alt="food image"
                        width="90px"
                        height="90px"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="contents">
            <Form.Label className={classes["form"]}>Lý do đổi trả:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder=""
              rows={3}
              value={item.reason}
              required
            />
          </Form.Group>
          <Form.Group controlId="selectedTax">
            <Form.Label className={classes["form"]}>
              Hình thức đổi, trả:
            </Form.Label>
            <Form.Control
              as="select"
              required
            >
              {item.formality === "giveBack" ? <option key={"giveBack"} value={"giveBack"}>
                Trả
              </option> : <option key={"change"} value={"change"}>
                Đổi
              </option>}
              
              
            </Form.Control>
          </Form.Group>
          <div className={classes["total-price"]}>
            <p>Trạng thái đơn hàng:</p>
                <Status value={item.status} />
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
    </div>}
  </div>
  );
};

export default ReturnOrder;
