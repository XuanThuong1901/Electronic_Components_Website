import { React } from "react";
import classes from "./ProductDetail.module.css";
import RatingStars from "../UI/RatingStars/Index";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
//import AddButton from '../UI/Button/AddButton';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import WishButton from "../UI/Button/WishButton";
import { useState, useEffect } from "react";
import Footer from "../UI/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../apiRequest/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatCurrency from "../../Helper/convertUSD";
import RawMaterialProduct from "./RawMaterialProduct";
import ViewEvaluation from "./ViewEvaluation";

const ProductDetail = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id_item } = useParams();
  const [value, setValue] = useState(1);
  const [items, setItems] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await api.get(`/product/product=${id_item}`);
      return res;
    }
    getData().then((res) => {
      setItems(res.data);
      let amount = 0;
      let count = 0;
      res.data.evaluations.map((item) => {
        amount += item.evaluate;
        count +=1;
      })
      setRating(amount/count);
      console.log("rating",amount);
    });
    getData().catch((err) => {
      console.log(err);
    });
  }, []);

  const handleAddToCart = async (id_item) => {
    if(quantity > items.quantity){
      return toast.warn("Số lượng sản phẩm không đủ !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    api
      .post(`cart/add/${id_item}`, {quantity}, {
        headers: {
          access_token: token,
        },
      })
      .then(function (res) {
        toast.success("Thêm sản phẩm vào giỏ thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch(function (res) {
        console.log(res);
        toast.warn("Thêm sản phẩm vào giỏ thất bại !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
 
  const toggleTab = (index) => {
    setValue(index);
  };
  const handleIncrement = () => {
    if(quantity < items.quantity){
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <section style={{ marginTop: "4.75rem" }}>
      <div className="container" style={{ marginTop: "120px" }}>
        <div className={classes["wrapper"]}>
          {items && (
            <>
              <div className={classes["main-image"]}>
                <img
                  src={items.imageProducts[0].urlimg}
                  alt="Image"
                  width="100%"
                ></img>
              </div>
              <div className={classes["des-food"]}>
                <h1 className={classes["food-name"]}>{items.productName}</h1>
                <RatingStars rating={rating} />
                <p>{items.description}</p>
                <h1 className={classes["price"]}>
                  Giá: {formatCurrency(items?.priceLists[0].price)}
                </h1>
                <hr></hr>

                <div className={classes["add-main"]}>
                  <div className={classes["quantity"]}>
                    <p className={classes["quantity-stock"]}>
                      Số lượng: {items.quantity}
                    </p>

                    <div className={classes["quantity-add"]}>
                      <button onClick={handleDecrement}>-</button>
                      <p>{quantity}</p>
                      <button onClick={handleIncrement}>+</button>
                    </div>
                  </div>
                  <button
                    className={classes["button-add"]}
                    onClick={() => handleAddToCart(items.idproduct)}
                  >
                    <ShoppingBasketIcon
                      className={classes["icon-add"]}
                    ></ShoppingBasketIcon>
                    THÊM VÀO GIỎ HÀNG
                  </button>
                  <div
                    className={classes["wish-button"]}
                    // onClick={() => handleWishList(items.idproduct)}
                  >
                    <div className={classes["wish-icon"]}>
                      <WishButton />
                    </div>
                  </div>
                </div>
                <hr style={{ marginBottom: "2.5rem" }}></hr>
                <div className={classes["category-itiem"]}>
                  <p>
                    Loại:{" "}
                    <Link className={classes["link-itiem"]} to="/menu">
                      {items.category.categoryName}
                    </Link>
                  </p>
                  <p>Nhà cung cấp: {items.supplier.supplierName}</p>

                  <p>
                    Share: <tab />
                    <Link to="/">
                      <FacebookIcon
                        className={classes["icon-category"]}
                        color="disabled"
                      />
                    </Link>
                    <Link to="/">
                      <YouTubeIcon
                        className={classes["icon-category"]}
                        color="disabled"
                      />
                    </Link>
                    <Link to="/">
                      <InstagramIcon
                        className={classes["icon-category"]}
                        color="disabled"
                      />
                    </Link>
                    <Link to="/">
                      <TwitterIcon
                        className={classes["icon-category"]}
                        color="disabled"
                      />
                    </Link>
                  </p>
                </div>
                <hr style={{ marginTop: "2rem", marginBottom: "2rem" }}></hr>
                <ul className={classes["note-content"]}>
                  <li>Free global shipping on all orders</li>
                  <li>30 days easy returns if you change your mind</li>
                  <li>Order before noon for same day dispatch</li>
                </ul>
                <hr style={{ marginTop: "1.5rem", marginBottom: "2rem" }}></hr>
                <div>
                  <h1
                    style={{
                      color: "var(--text)",
                      fontWeight: "700",
                      marginRight: "2rem",
                    }}
                  >
                    Guaranteed Safe Checkout
                    <img
                      className={classes["image-pay"]}
                      src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/trust-symbols.png"
                      alt="image-"
                    ></img>
                  </h1>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className={classes["detail-product"]}>
          <div className={classes["button-review"]}>
            <button
              className={value === 1 ? classes["button-active"] : classes[""]}
              onClick={() => toggleTab(1)}
            >
              Thông tin sản phẩm
            </button>
            <button
              className={value === 2 ? classes["button-active"] : classes[""]}
              onClick={() => toggleTab(2)}
            >
              Đánh giá
            </button>
          </div>
          <div
            className={
              value === 1 ? classes["content-active"] : classes["content-none"]
            }
          >
            {items && <RawMaterialProduct product={items} />}
          </div>
          <div
            className={
              value === 2 ? classes["content-active"] : classes["content-none"]
            }
          >
            {items && <ViewEvaluation evaluation={items.evaluations} />}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};
export default ProductDetail;
