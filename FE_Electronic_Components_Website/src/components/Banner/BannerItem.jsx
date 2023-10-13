import formatCurrency from "../../Helper/convertUSD";
import classes from "./BannerItem.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BannerItem = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <div key={item.idproduct} className="col-lg-2 mb-5 ">
    <div className={classes["container-item"]}>
      <div className={classes["image-item"]}>
        <img
          src={item.imageProducts[0].urlimg}
          alt="food image"
          width="200px"
          height="190px"
        ></img>
      </div>
      <div className={classes["des-item"]}>
        <div className={classes["item-detail"]}>
          <span
            className={classes.namefood}
            onClick={() =>
              navigate(`/product-detail/${item.idproduct}`)
            }
          >
            {item.productName}
          </span>
          {/* <div className={classes.rating}>
            <RatingStars rating={3} />
          </div> */}
          <p>{item.description}</p>
          <p>{item.supplier.supplierName}</p>
          <span className={classes.price}>
            {formatCurrency(item.priceLists[0].price)}
          </span>
        </div>
      </div>
      <div className={classes["des-button"]}>
        <Link to={`/product-detail/${item.idproduct}`}>
          <button>Chi tiết</button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default BannerItem;
