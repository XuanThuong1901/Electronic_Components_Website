import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import classes from "./EmployeeDetail.module.css";
import api from "../../../apiRequest/axios";
import formatCurrency from "../../../Helper/convertUSD";
import { useNavigate } from "react-router-dom";

const InfoEmployee = () => {
  const token = localStorage.getItem("token");
  const { idemployee } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState(true);
  const [identityCard, setIdentityCard] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [formattedBirthday, setFormattedBirthday] = useState(null);

  // Các state để lưu dữ liệu sản phẩm
  // const [employee, setEmployee] = useState(null);

  const getEmployee = async () => {
    const res = await api.get(`/admin/employee/${idemployee}`, {
      headers: {
        access_token: token,
      },
    });
    return res;
  };

  useEffect(() => {
    getEmployee()
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.account.email);
        setRole(res.data.account.role.idrole);
        const newDate = new Date(res.data.birthday); 
        setBirthday(new Date(newDate).toISOString().split("T")[0]);
        
        setGender(res.data.gender);
        setIdentityCard(res.data.identityCard);
        setTelephone(res.data.telephone);
        setAddress(res.data.address);
        setAvatar(require(`../../../assets/avatar/${res.data.avatar}`));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRole = (e) => {
    if(`${e}` === '2') {
      setRole(2);
    }
    else{
      setRole(3);
    }
  }
  const handleBirthdayChange = (e) => {
    const newDate = new Date(e.target.value); // Chuyển đổi chuỗi ngày thành đối tượng ngày
    setBirthday(new Date(newDate).toISOString().split("T")[0]); // Cập nhật state
    // setFormattedBirthday(new Date(birthday).toISOString().split('T')[0]);
  };
  const handleGender = (e) => {
    if (e === "Nam") {
      setGender(true);
    } else {
      setGender(false);
    }
  };
  
  const handleButton = (e) => {
    const user = {
      name: name,
      birthday: new Date(birthday),
      gender: gender,
      identityCard: identityCard,
      telephone: telephone,
      address: address,
      role: role,
    }
    console.log(user);
    if(`${e}` === '1'){
      api.post(`/user/update/${idemployee}` , user, {
        headers: {
          access_token: token,
        }
      }).then(() => {
        toast.success("Cập nhật thông tin nhân viên thành công", {
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
      .catch((err) => {
        return toast.error("Cập nhật thất bại vui lòng thử lại", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
    }
    if(`${e}` === '2'){
      api.get(`/api/auth/resetPass/${email}`, {
        headers: {
          access_token: token,
        }
      }).then(() => {
        return toast.success("Reset mật khẩu thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
      .catch((err) => {
        return toast.error("Reset mật khẩu thất bại, vui lòng thử lại", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
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
            Thông tin nhân viên
          </h1>
        </div>
      </div>
      <div className={classes["container"]}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const buttonValue = e.target.getAttribute('value');
            // handleButton(buttonValue);
          }}
        >
          <div className={classes["container-button"]}>
            <div className={classes["detail-button"]}>
              <Button type="submit" value={1} onClick={() => handleButton(1)}>Cập nhật</Button>
            </div>
            <div className={classes["detail-button"]}>
              <Button type="submit" value={2} onClick={() => handleButton(2)}>Reset Mật khẩu</Button>
            </div>
          </div>
          <Form.Group controlId="imageProduct">
            <div className={classes["form-image"]} key={avatar}>
                  <div className={classes["form-image-detail"]}>
                    {avatar !== "" && <img
                      src={avatar}
                      alt={`Image_${avatar}`}
                      width="250px"
                      height="250px"
                      
                    />}
                  </div>
                </div>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label className={classes["form"]}>Tên nhân viên</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className={classes["form"]}>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              // onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label className={classes["form"]}>Chức vụ</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => handleRole(e.target.value)}
              required
            >
              <option value={2}>Quản lý</option>
              <option value={3}>Nhân viên</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="birthday">
            <Form.Label className={classes["form"]}>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={handleBirthdayChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label className={classes["form"]}>Giới tính</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Nam"
                value="Nam"
                checked={gender === true}
                onChange={(e) => handleGender(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                label="Nữ"
                value="Nữ"
                checked={gender === false}
                onChange={(e) => handleGender(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="identityCard">
            <Form.Label className={classes["form"]}>CCCD</Form.Label>
            <Form.Control
              type="text"
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="telephone">
            <Form.Label className={classes["form"]}>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label className={classes["form"]}>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
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
  );
};
export default InfoEmployee;
