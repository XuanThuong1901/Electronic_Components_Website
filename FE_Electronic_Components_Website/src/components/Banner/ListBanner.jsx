import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import api from "../../apiRequest/axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../apiRequest/Authprovider";
import BannerList from "./BannerList";

const productList = [
  { id: 1, name: "Product 1", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/63815684843772393700309.jpg" },
  { id: 2, name: "Product 2", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/VDK--IC-chuc-nang/63823718677045834900884.jpg" },
  { id: 3, name: "Product 3", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/638232012923013884small.png" },
  { id: 4, name: "Product 1", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/63815684843772393700309.jpg" },
  { id: 5, name: "Product 2", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/VDK--IC-chuc-nang/63823718677045834900884.jpg" },
  { id: 6, name: "Product 3", price: "10000 đ", image: "https://linhkienchatluong.vn/Uploads/pic/prods/Linh-kien-dien-tu/638232012923013884small.png" },
];

const ListBanner = () => {
  const {auth,setAuth} = useContext(AuthContext)
  const [productListOne, setProductListOne] = useState(null);
  const [productListTow, setProductListTwo] = useState(null);
  const [productListThree, setProductListThree] = useState(null);

  const getProductOne = () => {
    const res = api.get("/product/detailCategory=5/1")
    return res;
  }
  const getProductTwo = () => {
    const res = api.get("/product/detailCategory=10/1")
    return res;
  }
  const getProductThree = () => {
    const res = api.get("/product/detailCategory=17/1")
    return res;
  }

  useEffect(() => {
    getProductOne().then((res)=> {
      setProductListOne(res.data);
    })
    getProductTwo().then((res)=> {
      setProductListTwo(res.data);
    })
    getProductThree().then((res)=> {
      setProductListThree(res.data);
    })
  },[])
  console.log(auth)


  return (
    <div>
        {productListOne !== null && <BannerList category={"LINH KIỆN ĐIỆN TỬ"} product={productListOne}/>}
        {productListOne !== null && <BannerList category={"VĐK - IC CHỨC NĂNG"} product={productListOne}/>}
        {productListThree !== null && <BannerList category={"MODULE - CẢM BIẾN"} product={productListThree}/>}
    </div>
  );
};

export default ListBanner;
