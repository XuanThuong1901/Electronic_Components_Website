import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";

import api from "../../../apiRequest/axios";
import classes from "./OderDetail.module.css";
import formatCurrency from "../../../Helper/convertUSD";

const ItemOrderDetail = ({ order, status }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showEvaluate, setShowEvaluate] = useState(true);
  const [evaluate, setEvaluate] = useState(0);
  const [content, setContent] = useState("");
  const [isCheckExchangeReturn, setIsCheckExchangeReturn] = useState(false);

  const toggleForm = () => {
    setShowEvaluate((prevShowForm) => !prevShowForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleEvaluateChange = (newEvaluate) => {
    setEvaluate(newEvaluate);
  };

  const exchangeReturn = (e) => {
    if(isCheckExchangeReturn === true)
      navigate("/createReturnOrder",{ state:{ orderDetail: e}})
  }
  

  const viewEvaluation = () => {
    return (
      <div className={classes["view-evaluate"]}>
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={toggleForm}
        ></div>
        <div className={classes["specification"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="specificationName"
              className={classes["specification-form"]}
            >
                <div className={classes["star-rating"]}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="evaluate"
                        value={value}
                        onClick={() => handleEvaluateChange(value)}
                      />
                      <FaStar
                        className="star"
                        color={value <= evaluate ? "#ffc107" : "#e4e5e9"}
                      />
                    </label>
                  ))}
                </div>
            </Form.Group>
            <Form.Group
              controlId="content"
              className={classes["specification-form"]}
            >
              <Form.Label>Nội dung đánh giá</Form.Label>
              <Form.Control
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className={classes["specification-form-button"]}>
              <button type="button" onClick={handleEvaluation}>
                Đánh giá
              </button>
              <button type="button" onClick={toggleForm}>
                Thoát
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  const handleEvaluation = () => {
    if (evaluate !== 0) {
      const newEvaluation = {
        evaluate: evaluate,
        contents: content,
      };

      try{
        api.post(`/evaluation/create/${order.product.idproduct}`, newEvaluation,{
          headers:{
            access_token: token,
          }
        }).then(() => {
          toast.success("Đánh giá sản phẩm thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
      }
      catch(err){
        return toast.error(err, {
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
      

      setShowEvaluate(false);
    }
  };

  return (
    <div>
      <div>
        <div className={classes["cart-item"]} key={order.idorder}>
          <div className={classes["image-item"]}>
            <img
              src={order.product.imageProducts[0].urlimg}
              alt="food image"
              width="90px"
              height="90px"
            ></img>
          </div>
          <div className={classes["name-item"]}>
            <p>{order.product.productName}</p>
          </div>
          <div className={classes["price"]}>
            <p>Giá : {formatCurrency(order.product.priceLists[0].price)}</p>
          </div>
          <div className={classes["input-quantity"]}>
            <p>Số lượng: {order.quantity}</p>
          </div>
          <div className={classes["input-quantity"]}>
            <p>
              Thuế: {order.product.tax.type} : {order.product.tax.taxPercentage}
              %
            </p>
          </div>
          <div className={classes["total-price"]}>
            <p>
              Tổng Giá :{" "}
              {formatCurrency(
                order.product.priceLists[0].price * order.quantity +
                  ((order.product.priceLists[0].price *
                    order.product.tax.taxPercentage) /
                    100) *
                    order.quantity
              )}
            </p>
          </div>
          {status === 6 && (
            <div className={classes[""]}>
              <div className={classes["evaluate"]}>
              <button onClick={toggleForm}>Đánh giá</button>
            </div>
            <div className={classes["evaluate"]}>
              <button onClick={()=> {setIsCheckExchangeReturn(true); exchangeReturn(order)}}>Đổi, trả</button>
            </div>
            </div>
            
          )}
        </div>
        <hr></hr>
        {!showEvaluate && viewEvaluation(handleEvaluation, toggleForm)}
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
  );
};

export default ItemOrderDetail;
