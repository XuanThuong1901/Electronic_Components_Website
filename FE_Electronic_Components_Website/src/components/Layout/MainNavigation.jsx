import React,{ useEffect, useState, useContext  } from "react";

import classes from "./MainNavigation.module.css";

import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../UI/Elements/Logo";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

import MenuButton from "./MenuButton";
import Backdrop from "../UI/Modal/Backdrop";
import Authentication from "../UI/Modal/Auth/Authentication";
import SideCart from "../UI/Modal/SideCart";
import MobileMenu from "./MobileMenu";
import api from "../../apiRequest/axios";
import CategoryList from "../Category/CategoryList";

const MainNavigation = () => {
  const navigate = useNavigate();
  const [authenticationIsOpen, setAuthenticationIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [listitems, setListitems] = useState([]);
  const [click, setClick] = useState(1);
  const [showCategory, setShowCategory] = useState(false);
  const [showDetailCategory, setShowDetailCategory] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [navList, setNaList] = useState([]);
  const [idCategory, setIdCategory] = useState(0);

  const getDataCategory = async () => {
    try {
      const res = await api.get("/category");
      return res.data;
    } catch (err) {
      console.log("category", err);
      return [];
    }
  };
  // console.log(listitems)

  const editCategory = () => {
    const updatedNavList = listCategory;
    for (let i = 0; i < updatedNavList.length; i++) {
      console.log(updatedNavList[i]);
      for (let j = i + 1; j < updatedNavList.length; j++) {
        if (updatedNavList[i].idcategory === updatedNavList[j].origin) {
          if (updatedNavList[i].detailCategory == null) {
            updatedNavList[i].detailCategory = [updatedNavList[j]];
          } else {
            updatedNavList[i].detailCategory = [
              ...updatedNavList[i].detailCategory,
              updatedNavList[j],
            ];
          }
          updatedNavList.splice(j, 1);
          j--;
        }
      }
    }
    setNaList(updatedNavList);
  };

  useEffect(() => {
    getDataCategory()
      .then((data) => {
        setListCategory(data);
        console.log("navlisst", data);
        return data;
      })
    getDataCategory().catch((err) => {
      console.log("categoyr", err);
    });
  }, []);
  useEffect(() => {
    editCategory(); // Call editCategory after listCategory has been updated
    console.log("list category", listCategory);
    console.log("navlisst", navList);
  }, [listCategory]);

  // modal actions
  //Auth
  const openAuthHandler = () => {
    if (mobileMenuIsOpen) setMobileMenuIsOpen(false);
    setAuthenticationIsOpen(true);
  };

  const closeAuthHandler = () => {
    setAuthenticationIsOpen(false);
  };

  //Cart
  const openCartHandler = () => {
    setCartIsOpen(true);
  };

  const closeCartHandler = () => {
    setCartIsOpen(false);
  };

  //Mobile menu
  const openMobileMenuHandler = () => {
    setMobileMenuIsOpen(true);
  };

  const closeMobileMenuHandler = () => {
    setMobileMenuIsOpen(false);
  };

  const handleMouseEnter = () => {
    setShowCategory(true);
  };
  const handleMouseLeave = () => {
    setShowCategory(false);
  };
  const handleDetailCategoryClick = () => {
    setShowDetailCategory(!showDetailCategory);
  };

  const closeBackdrop = () => {
    if (authenticationIsOpen) setAuthenticationIsOpen(false);
    else if (cartIsOpen) setCartIsOpen(false);
    else if (mobileMenuIsOpen) setMobileMenuIsOpen(false);
  };

  const handleClickLoginSucces = () => {
    if (localStorage.getItem("token")) {
      return navigate("/profile");
    } else {
      return setMobileMenuIsOpen(false), setAuthenticationIsOpen(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      return setAuthenticationIsOpen(false);
    }
  });

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"))
  // }, [localStorage.getItem("token")]);

  return (
    <div className={classes.menu}>
      {/* Render modal */}
      {authenticationIsOpen || cartIsOpen ? (
        <Backdrop onClose={closeBackdrop} />
      ) : null}
      <Authentication
        className={authenticationIsOpen ? "open" : ""}
        onClose={closeAuthHandler}
        // setLocal = {setLocal}
      />
      <SideCart
        className={cartIsOpen ? "open" : ""}
        onClose={closeCartHandler}
        itemList={listitems}
      />

      <Container className={classes["main-menu"]}>
        <div className={classes["menu-wrapper"]}>
          <NavLink to="/" className={classes.linker}>
            <Logo />
          </NavLink>
          <nav className={classes["navigator"]}>
            <ul className="d-flex align-items-center h-100">
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/product"
                  className={(props) => (props.isActive ? classes.active : "")}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Sản phẩm
                  {showCategory && (
                    <CategoryList
                      listCategory={navList}
                      onClick={handleDetailCategoryClick}
                      setIdCategory = {setIdCategory}
                    />
                  )}
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/check-out"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Giỏ Hàng
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/orders"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Đơn Hàng
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/discount"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Liên hệ
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes["fn-wrapper"]}>
            {/* <div className={classes["ship-icon"]}>
              <img src={scooterIcon} alt="shipping-icon" />
            </div>
            <div className={classes["ship-desc"]}>
              <h4>
                <span className={classes.header}>Đặt hàng ngay tại: </span>
              </h4>
              <h3>
                <span className={classes.phone}>+ 1 123 456 789</span>
              </h3>
            </div> */}
            <div className={`d-flex align-items-center ${classes["mn-btn"]}`}>
              {/* <MenuButton icon={<SearchTwoToneIcon />} /> */}
              <MenuButton
                icon={<PersonIcon />}
                onClick={handleClickLoginSucces}
              />
              <NavLink
                to="/wish-list"
                className={(props) =>
                  props.isActive ? classes["btn-active"] : ""
                }
              >
                <MenuButton icon={<FavoriteIcon />} />
              </NavLink>
              {/* <MenuButton
                icon={<ShoppingBasketIcon />}
                quantity=""
                onClick={openCartHandler}
              /> */}
            </div>
          </div>
          {/* Mobile Menu */}
          <button
            className={classes["open-m-menu-btn"]}
            onClick={openMobileMenuHandler}
          >
            <div className={classes.line}></div>
            <div className={classes.line}></div>
            <div className={classes.line}></div>
          </button>
          <MobileMenu
            onClose={closeMobileMenuHandler}
            isOpen={mobileMenuIsOpen}
            openAuth={handleClickLoginSucces}
          />
        </div>
      </Container>
    </div>
  );
};

export default MainNavigation;
