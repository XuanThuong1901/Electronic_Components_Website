import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import classes from "./UserAdmin.module.css";
import api from "../../../apiRequest/axios";
import { useNavigate } from "react-router-dom";

const InfoUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [ id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState(true);
  const [identityCard, setIdentityCard] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [formattedBirthday, setFormattedBirthday] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enterNewPassword, setEnterNewPassword] = useState("");
  const [errorConliftPassword, setErrorConliftPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [showViewNewPassword, setShowViewNewPassword] = useState(true);
  
  // Các state để lưu dữ liệu sản phẩm
  // const [employee, setEmployee] = useState(null);

  const getUser = async () => {
    const res = await api.get(`/user`, {
      headers: {
        access_token: token,
      },
    });
    return res;
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        setId(res.data.idaccount);
        setName(res.data.employer.name);
        setEmail(res.data.email);
        setRole(res.data.role.idrole);
        const newDate = new Date(res.data.employer.birthday); 
        setBirthday(new Date(newDate).toISOString().split("T")[0]);
        
        setGender(res.data.employer.gender);
        setIdentityCard(res.data.employer.identityCard);
        setTelephone(res.data.employer.telephone);
        setAddress(res.data.employer.address);
        setAvatar(require(`../../../assets/avatar/${res.data.employer.avatar}`));
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

  const toggleForm = () => {
    setShowViewNewPassword((prevShowForm) => !prevShowForm);
  };

  const isCheckNewPassword = (e) => {
    if(newPassword.length < 5){
      setErrorNewPassword("Mật khẩu phải từ 6 ký tự trở lên !")
    }
    else{
      setErrorNewPassword("")
    }
    if(e !== newPassword)
        setErrorConliftPassword("Mật khẩu xác nhận không đúng !")
    else{
      setErrorConliftPassword("")
    }
};

  const viewNewPassword = () => {
    return (
      <div>
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
              <Form.Label>Mật khẩu củ</Form.Label>
              <Form.Control
              className={classes["specification-form-text"]}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="parameter"
              className={classes["specification-form"]}
            >
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  isCheckNewPassword()
                }}
                required
              />
            </Form.Group>
            {errorNewPassword !== "" && <div className={classes["password-error"]}>
                <p>{errorNewPassword}</p>
                </div>}
            <Form.Group
              controlId="parameter"
              className={classes["specification-form"]}
            >
              <Form.Label>Nhập lại mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                value={enterNewPassword}
                onChange={(e) => {setEnterNewPassword(e.target.value);
                    isCheckNewPassword(e.target.value)}}
                required
              />
            </Form.Group>
            {errorConliftPassword !== "" && <div className={classes["password-error"]}>
                <p>{errorConliftPassword}</p>
                </div>}
            <div className={classes["specification-form-button"]}>
              <button type="submit" onClick={handleNewPassword}>
                Thay đổi
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

  const handleNewPassword = () => {
    if (password.trim() !== "" && newPassword.trim() !== "" && newPassword === enterNewPassword) {
      const newPasswords = {
        password: password,
        newPassword: newPassword,
      };

      api.post(`/user/updatepassword`,newPasswords, {
        headers:{
            access_token: token,
      }}).then(()=> {
        
        return toast.success("Thay đổi mật khẩu thành công", {
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
      .catch((err)=> {
        return toast.error("Mật khẩu hiện tại không đúng !", {
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
  };
  
  const handleButtonUpdate = () => {
    if(name.length === 0 || identityCard.length === 0 || telephone.length === 0 || address.length === 0 ){
      return;
    }
    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
      alert("Sai kiểu định dạng tên !");
      return;
    }
    if (!/^0\d{9}$/.test(telephone)) {
      alert("Sai kiểu định dạng số điện thoại !");
      return;
    }
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
      api.post(`/user/update/${id}` , user, {
        headers: {
          access_token: token,
        }
      }).then(() => {
        toast.success("Cập nhật thông tin thành công", {
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
        return toast.error("Cập nhật thông tin thất bại !", {
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

  const handleButtonLogOut = () => {
    localStorage.clear();
    navigate("/")
  }

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Thông tin cá nhân
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
              <Button type="submit" value={1} onClick={handleButtonUpdate}>Cập nhật</Button>
            </div>
            <div className={classes["detail-button"]}>
              <Button type="submit" value={2} onClick={toggleForm}>Đổi mật khẩu</Button>
            </div>
            <div className={classes["detail-button"]}>
              <Button type="submit" value={3} onClick={handleButtonLogOut}>Đăng xuất</Button>
            </div>
          </div>
          {!showViewNewPassword && viewNewPassword(toggleForm, handleNewPassword)}
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
            //   onChange={(e) => handleRole(e.target.value)}
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
              type="number"
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="telephone">
            <Form.Label className={classes["form"]}>Số điện thoại</Form.Label>
            <Form.Control
              type="number"
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
export default InfoUser;
