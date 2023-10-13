import React from "react";
import classes from "./ListItem.module.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RatingStars from "../UI/RatingStars/Index";
import { FormControl } from "react-bootstrap";
import Footer from "../UI/Footer/index";
import { useState, useEffect, useContext } from "react";
import api from "../../apiRequest/axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatCurrency from "../../Helper/convertUSD";
import Item from "./Item";

const ListItem = ({ id_item }) => {
  const [listItems, setListItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await api.get("/product/page=1");
    console.log("res", res);
    return res;
  };
  const getDatByCate = async () => {
    const res = await api.get(`/product/detailCategory=${id_item}/1`);
    return res;
  };

  useEffect(() => {
    if (id_item !== undefined) {
      getDatByCate().then((res) => {
        setListItems(res.data);
      });
    } else {
      getData().then((res) => {
        setListItems(res.data);
      });
    }
  }, [id_item]);

  const handleSearch = (searchTerm) => {
    const filteredProducts = listItems.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div>
      <div className={classes["form-search"]}>
        <FormControl
          className={classes["search"]}
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="container">
        <div className="container">
          <div className="row ">
            {searchTerm === ""
              ? listItems.map((item) => (
                  <Item item={item} />
              ))
              : searchResults.map((item) => (
                  <Item item={item} />
                ))}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListItem;
