import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "../../apiRequest/Authprovider";
import classes from "./Profile.module.css";
import api from "../../apiRequest/axios";
import formatCurrency from "../../Helper/convertUSD";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState(null);
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState(0);
  const [complete, setComplete] = useState(0);
  const [cancel, setCancel] = useState(0); 
  const [unfinished, setUnfinished] = useState(0); 
  
  const navigate = useNavigate();
  // const {auth,setAuth} = useContext(AuthContext)

  // console.log(auth)

  const getInfo = async () => {
    const res = await api.get("/user", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };
  const getInfoOrder = async () => {
    const res = await api.get("/order", {
      headers: {
        access_token: token,
      }
    })
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getInfo()
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getInfoOrder()
      .then((res) => {
        res.data.map((item) => {
          if(item.status.idstatus === 6)
          {
            setAmount(amount + item.amount); // Sửa "setAmount(item.amount + amount)" thành "setAmount(amount + item.amount)"
            setComplete(complete + 1);
          }
          else if(item.status.idstatus === 7)
          {
            setCancel(cancel+1);
          }
          else
          {
            setUnfinished(unfinished+1);
          }
        })
        setOrder(res.data.lenght)

      })
      .catch((err) => 
      console.log(err)
      )
  }, []);


  const handleSubmit = (e) => {
    try {
      api
        .post(
          `/user/update/${info.idaccount}`,
          {
            name: info.customers.name,
            address: info.customers.address,
            telephone: info.customers.telephone,
          },
          {
            headers: {
              Access_token: token,
            },
          }
        )
        .then((res) => {
          toast.success("Cập nhập thông tin thành công", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Thao tác thất bại", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInfo((info) => ({
      ...info,
      customers:{
        ...info.customers,
        [e.target.name]: e.target.value,
      }
    }));
  };
  return (
    <div style={{ marginTop: "80px" }} className={classes["main-container"]}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className={classes["user-info"]}>
              <div className={classes["main-title"]}>
                <h5>Thông tin cá nhân</h5>
              </div>
              {info !== null&& (
                <div>
                  <div className={classes["data-user"]}>
                    <div className={classes["title"]}>
                      <h6>Tên</h6>
                    </div>
                    <div className={classes["value-info"]}>
                      <input
                        name="name"
                        value={info.customers.name}
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <hr></hr>
                  <div className={classes["data-user"]}>
                    <div className={classes["title"]}>
                      <h6>Email</h6>
                    </div>
                    <div className={classes["value-info"]}>
                      <h5>{info.email}</h5>
                    </div>
                  </div>
                  <hr></hr>
                  <div className={classes["data-user"]}>
                    <div className={classes["title"]}>
                      <h6>SDT</h6>
                    </div>
                    <div className={classes["value-info"]}>
                      <input
                        name="telephone"
                        value={info.customers.telephone}
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className={classes["data-user"]}>
                    <div className={classes["title"]}>
                      <h6>Địa chỉ</h6>
                    </div>
                    <div className={classes["value-info"]}>
                      <input
                        className={classes["input-location"]}
                        name="address"
                        value={info.customers.address}
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr></hr>
              <div className={classes["button__update"]}>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <div className={classes["log-out"]}>
                    <button>Đăng Xuất</button>
                  </div>
                </Link>
                <div
                  className={classes["button-update"]}
                  onClick={handleSubmit}
                >
                  <button>Cập nhập thông tin</button>
                </div>
                <Link to="/change-password">
                  <div className={classes["log-out"]}>
                    <button>Đổi Mật Khẩu</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className={classes["total-order"]}>
              <p>Tổng hoá đơn: 12</p>
            </div>
            <div className={classes["total-pay"]}>
              <p>Tổng tiền thanh toán: {formatCurrency(1570000)}</p>
            </div>
            <div className={classes["order-type"]}>
              <div className={classes["order-final"]}>
                <p>Hoá đơn thành công: 6</p>
              </div>
              <div className={classes["order-cancel"]}>
                <p>Hoá đơn đã huỷ: 4</p>
              </div>
              
            </div>
            <div className={classes["order-type"]}>
            <div className={classes["order-final"]}>
                <p>Hoá đơn chưa hoàn thành: 2</p>
              </div>
            </div>
            
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
  );
};

export default Profile;
