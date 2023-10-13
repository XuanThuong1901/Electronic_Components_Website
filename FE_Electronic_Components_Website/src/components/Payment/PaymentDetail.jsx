import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Mapbox from "../Mapbox/Mapbox";

import api from "../../apiRequest/axios";
import classes from "./PaymentDetail.module.css";
import LabledInput from "../UI/Input/LabledInput";
import formatCurrency from "../../Helper/convertUSD";

const PaymentDetail = () => {
  const token = localStorage.getItem("token");
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  const navigate = useNavigate();

  const [value, setValue] = useState(1);
  const [paysmethod, setPaysmethod] = useState([]);
  const [pays, setPays] = useState(0);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("Ghi Chu");
  const [shippings, setShippings] = useState([]);
  const [selectedShipper, setSelectedShipper] = useState(0);
  const [isCheck, setIsCheck] = useState(false);
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const payments = [...paysmethod];

  const getData = async () => {
    const res = await api.get("/cart", {
      headers: {
        access_token: token,
      },
    });
    console.log(res);
    return res;
  };

  const getPayment = async () => {
    const res = await api.get("/payment");
    return res;
  };
  const getShipping_unit = async () => {
    const res = await api.get("/shipping_unit");
    return res;
  };
  // //console.log(infoOder)

  useEffect(() => {
    getPayment().then((res) => {
      setPaysmethod(res.data);
      setPays(res.data.idpayment)
    });
    getShipping_unit().then((res) => {
      setShippings(res.data);
      setSelectedShipper(res.data.idshippingUnit)
    });
  }, []);
  useEffect(() => {
    getData()
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangePay = (e) => {
    setPays(e.target.value);
  };
  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeShipper = (e) => {
    setSelectedShipper(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeTelePhone = (e) => {
    setTelephone(e.target.value);
  };

  const caulculateTotalAmount = () => {
    let amount = 0;
    items.forEach((item) => {
      amount =
        amount +
        20000 +
        (item.product.priceLists[0].price +
          (item.product.priceLists[0].price * item.product.tax.taxPercentage) /
            100) *
          item.quantity;
    });
    setAmount(amount);
  };

  if (isCheck === false && items.length > 0) {
    caulculateTotalAmount();
    setAddress(items[0].customer.address);
    setTelephone(items[0].customer.telephone);
    setIsCheck(true);
  }

  const CheckOut = () => {
    if (items.length === 0) {
      return toast.error("Giỏ hàng không có sản phẩm", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (pays === 0) {
      return toast.error("Vui lòng chọn phương thức thanh toán", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (selectedShipper === 0) {
      return toast.error("Vui lòng chọn đơn vị vận chuyển", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (address === "") {
      return toast.error("Vui lòng nhập địa chỉ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (telephone === "") {
      return toast.error("Vui lòng nhập số điện thoại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        const order = {};
        order.address = address;
        order.telephone = telephone;
        order.note = description;
        order.shippingUnit = selectedShipper;
        order.payment = pays;
        order.shippingFee = 20000;
        order.discountAmount = 0;
        order.detailOrders = [];
        items.forEach((item) => {
          const detailOrder = {};
          detailOrder.product = item.cartId.idproduct;
          detailOrder.quantity = item.quantity;
          order.detailOrders = [...order.detailOrders, detailOrder];
        });
        api
          .post("/order/add", order, {
            headers: {
              access_token: token,
            },
          })
          .then((res) => {
            console.log(res);
            setValue(value + 1);
            toast.success("Đặt Hàng Thành Công", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/orders");
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            setError(err.response.data.message);
            toast.error(<div>{err.response.data.message}</div>, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  // console.log(pays,description,selectedShipper,latitude,longitude,discount)
  // console.log(discount)

  return (
    <div className={classes.container}>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className={classes["list__items"]}>
            {items.map((item) => {
              return (
                <div>
                  <div
                    className={classes["cart-item"]}
                    key={item.cartId.idproduct}
                  >
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
                        Đơn Giá :{" "}
                        {formatCurrency(item.product.priceLists[0].price)}
                      </p>
                    </div>
                    <div className={classes["input-quantity"]}>
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                    <div className={classes["input-quantity"]}>
                      <p>
                        Thuế: {item.product.tax.type} :
                        {item.product.tax.taxPercentage}
                      </p>
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
              );
            })}
            {selectedShipper !== 0 && (
              <div>
                <div className={classes["amount-price"]}>
                  <p>Phí vận chuyển: {formatCurrency(20000)}</p>
                </div>
                <hr></hr>
              </div>
            )}
            <div className={classes["amount-price"]}>
              <p>Tổng Giá: {formatCurrency(amount)}</p>
            </div>
            <hr></hr>
            {/* <div className={classes["map__box"]}>
                            <Mapbox/>
                        </div> */}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className={classes["payment__method"]}>
            <p>Chọn Phương thức thanh toán:</p>
            <Form.Control
              as="select"
              value={pays}
              onChange={handleChangePay}
              required
            >
              {payments.map((pay) => (
                <option key={pay.idpayment} value={pay.idpayment}>
                  {pay.paymentName}
                </option>
              ))}
            </Form.Control>
            {/* <select
              name="lang"
              id="lang-select"
              multiple
              onChange={handleChangePay}
              className={classes["set__payment"]}
            >
              {payments.map((pay) => {
                return <option value={pay.idpayment}>{pay.paymentName}</option>;
              })}
            </select> */}
            <p>Địa chi giao hàng</p>
            <textarea
              name="message"
              rows="4"
              cols="38"
              placeholder="Địa chỉ"
              onChange={handleChangeAddress}
              value={address}
            ></textarea>
            <p>Số điện thoại liên hệ</p>
            <input
              name="message"
              style={{ marginBottom: "38px", marginTop: "15px" }}
              placeholder="Số điện thoại"
              onChange={handleChangeTelePhone}
              value={telephone}
            ></input>

            <p>Thêm ghi chú cho đơn hàng</p>
            <textarea
              name="message"
              rows="4"
              cols="38"
              placeholder="Ghi Chú"
              onChange={handleChangeDes}
            ></textarea>
            <p>Chọn đơn vị vận chuyển:</p>
            <Form.Control
              as="select"
              value={selectedShipper}
              onChange={handleChangeShipper}
              required
            >
              {shippings.map((shipping) => (
                <option
                  key={shipping.idshippingUnit}
                  value={shipping.idshippingUnit}
                >
                  {shipping.shippingUnitName}
                </option>
              ))}
            </Form.Control>
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
      {/* <div className={classes["map__box"]}>
                    <Mapbox/>
            </div> */}
      <div className={classes["Check__out"]}>
        <button onClick={CheckOut}>Đặt Hàng</button>
      </div>
    </div>
  );
};

export default PaymentDetail;
