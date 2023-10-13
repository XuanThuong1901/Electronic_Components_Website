import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import classes from "./BannerItem.module.css";

import combo from "../../assets/images/banner/combo.png";
import pizza from "../../assets/images/banner/pizza.png";
import burger from "../../assets/images/banner/burger.png";
import chicken from "../../assets/images/banner/chicken.png";
import pasta from "../../assets/images/banner/pasta.png";
import drinks from "../../assets/images/banner/drinks.png";

import BannerItem from "./BannerItem";
import AuthContext from "../../apiRequest/Authprovider";
import { Link } from "react-router-dom";

const productList = [
  { id: 1, name: "Product 1", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/63815684843772393700309.jpg" },
  { id: 2, name: "Product 2", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/VDK--IC-chuc-nang/63823718677045834900884.jpg" },
  { id: 3, name: "Product 3", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/638232012923013884small.png" },
  { id: 4, name: "Product 1", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/63815684843772393700309.jpg" },
  { id: 5, name: "Product 2", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/VDK--IC-chuc-nang/63823718677045834900884.jpg" },
  { id: 6, name: "Product 3", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/638232012923013884small.png" },
  // ...Thêm sản phẩm khác
];

const BannerList = ({category, product}) => {
  const {auth,setAuth} = useContext(AuthContext)
  let count = 0;
  console.log(auth)

  return (
    <section className="banner">
      
      <ul style={{ backgroundColor: "var(--white)", margin: "30px 30px",border: "1px solid #ccc" }}>
      <div className={classes.header_banner}>
        <Link to={"/product"} className={classes.stypes}>{category}</Link>
      </div>
        <Container>
          <Row>
            {product.map((item) => 
                <BannerItem item={item} key={item.id} />
             
            )}
          </Row>
        </Container>
      </ul>
    </section>
  );
};

export default BannerList;
