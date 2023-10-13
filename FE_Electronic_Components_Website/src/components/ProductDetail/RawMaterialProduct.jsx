import React from "react";

import classes from "./ProductDetail.module.css";

const RawMaterialProduct = ({ product }) => {
  return (
    <section>
      <div className={classes["des-content"]}>
        <p>{product.feature}</p>
        <br />
      </div>
      <div className={classes["ingredient-food"]}>
        <div className={classes["specifications"]}>
          <h3>Thông tin kỹ thuật:</h3>
        </div>
        <div className={classes["energy-food"]}>
          {product.specifications.map((item) => (
            <p>
              {item.specificationName}: {item.parameter}
            </p>
          ))}
        </div>  
      </div>
      <div className={classes["des-content"]}>
        <p>{product.contents}</p>
        <br />
      </div>
    </section>
  );
};

export default RawMaterialProduct;
