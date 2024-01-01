import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Mapbox from "../Mapbox/Mapbox";

import api from "../../apiRequest/axios";
import classes from "./CreateReturnOrderDetail.module.css";
import LabledInput from "../UI/Input/LabledInput";
import formatCurrency from "../../Helper/convertUSD";

const CreateReturnOrderDetail = ({ item }) => {
  const token = localStorage.getItem("token");
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [imgProductReturn, setImgProductReturn] = useState([]);
  const [reason, setReason] = useState("");
  const [formality, setFormality] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  
  const [error, setError] = useState("");
  

  console.log(item);
  const getInfo = async () => {
    const res = await api.get("/user", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  useEffect(() => {
    getInfo()
    .then((res)=>{
      console.log(res)
      setUser(res.data)
    }).then(()=>{
      setAddress(user.customers.address);
      setPhoneNumber(user.customers.telephone);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  //Image
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagesArray = selectedFiles.map((file) => ({
      file: URL.createObjectURL(file),
    }));

    setImgProductReturn((prevImages) => [...prevImages, ...imagesArray]);

    formData.delete("imgProductReturn");
    selectedFiles.forEach((file) => {
      formData.append("imgProductReturn", file);
    });
    setFormData(new FormData(formData));
  };

  const handleRemoveImage = (file) => {
    setImgProductReturn((prevImages) =>
      prevImages.filter((image) => image.file !== file)
    );
    const fileIndex = Array.from(formData.getAll("imgProductReturn")).findIndex(
      (image) => image.name === file
    );
    if (fileIndex !== -1) {
      formData.delete(`imgProductReturn[${fileIndex}]`);
      setFormData(new FormData(formData)); // Update formData state
    }
  };


  const handleChangeFormality = (e) => {
    setFormality(e.target.value);
  };
  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };


  if (isCheck === false && user !== null) {
    setAddress(user.customers.address);
    setPhoneNumber(user.customers.telephone);
    setIsCheck(true);
  }

  const ChangeReturn = () => {
    
    if (reason === "") {
      return toast.error("Vui lòng nhập lý do đổi, trả sản phẩm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (address === "") {
      return toast.error("Vui lòng nhập địa chỉ !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (phoneNumber === "") {
      return toast.error("Vui lòng nhập số điện thoại !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (formality === "") {
      return toast.error("Vui lòng chọn hình thức đổi, trả !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } 
    else {
      try {
        const returnOrder = {};
        
        returnOrder.productId = item.product.idproduct;
        // returnOrder.orderId = item.
        console.log(returnOrder.productId);
        returnOrder.address = address;
        console.log(returnOrder.address);
        returnOrder.phoneNumber = phoneNumber;
        console.log(returnOrder.phoneNumber);
        returnOrder.quantity = item.quantity;
        console.log(returnOrder.quantity);
        returnOrder.amount = (item.product.priceLists[0].price + (item.product.priceLists[0].price *item.product.tax.taxPercentage) /100) *item.quantity;
        console.log(returnOrder.amount);
        returnOrder.reason = reason;
        returnOrder.formality = formality;

        formData.append("returnOrderRequest", JSON.stringify(returnOrder))
        // returnOrder.imageReturnOrderList = formData.getAll("imgProductReturn");
        // console.log(returnOrder.imageReturnOrderList);
        // console.log(returnOrder);
        api
          .post("/return_order/add", formData, {
            headers: {
              access_token: token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            // setValue(value + 1);
            toast.success("Lập đơn đổi, trả hàng thành công", {
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
            return toast.error("Đổi, trả hàng thất bại, vui lòng thử lại !", {
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
        toast.error("Đổi, trả hàng thất bại, vui lòng thử lại !", {
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
    }
  };

  return (
    <div className={classes.container}>
      <div className="row">
        <div className="col-12 col-md-6">
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
            <Form.Group controlId="imageProduct">
              <Form.Label className={classes["form"]}>
                Hình ảnh sản phẩm đổi trả
              </Form.Label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <div className={classes["form-image"]}>
                  {imgProductReturn.map((image) => (
                    <div
                      className={classes["form-image-detail"]}
                      key={image.file}
                    >
                      <img
                        src={image.file}
                        alt={`Image_${image.file}`}
                        width="90px"
                        height="90px"
                      />
                      <button onClick={() => handleRemoveImage(image.file)}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="contents">
              <Form.Label className={classes["form"]}>Lý do đổi trả</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập lý do đổi trả sản phẩm"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="contents">
              <Form.Label className={classes["form"]}>Địa chỉ</Form.Label>
              <Form.Control
                as="input"
                placeholder="Nhập địa chỉ"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="contents">
              <Form.Label className={classes["form"]}>Số điện thoại</Form.Label>
              <Form.Control
                as="input"
                type="number"
                placeholder="Nhập số điện thoại"
                rows={3}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="selectedTax">
              <Form.Label className={classes["form"]}>
                Chọn hình thức đổi, trả
              </Form.Label>
              <Form.Control
                as="select"
                
                value={formality}
                onChange={(e) => setFormality(e.target.value)}
                required
              >
                <option value="">Chọn hình thức đổi, trả</option>
                <option key={"change"} value={"change"}>
                  Đổi
                </option>
                <option key={"giveBack"} value={"giveBack"}>
                  Trả
                </option>
              </Form.Control>
            </Form.Group>
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
      <div className={classes["Check__out"]}>
        <button onClick={ChangeReturn}>Đổi, trả</button>
      </div>
    </div>
  );
};

export default CreateReturnOrderDetail;
