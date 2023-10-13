import React, { useEffect, useState } from "react";
import api from "../../apiRequest/axios";
import classes from "./ProductDetail.module.css";
import RatingStars from "../UI/RatingStars/Index";
import { FaUserCircle } from "react-icons/fa";
import { formatDate, formatTime } from "../../Helper/convertDate";
const ViewEvaluation = ({ evaluation }) => {

  return (
    <section>
      {evaluation !== null && evaluation.map((item) => (
        <div className={classes["des-content"]}>
          <div className={classes["form-view"]}>
            <FaUserCircle className={classes["form-view-icon"]}/>
            <div>
                <div className={classes["form-view-name"]}>
                    <p>{item.customer.name}</p>
                </div>
                <RatingStars rating={item.evaluate} />
                <div  className={classes["form-view-datetime"]}>
                    <p>
                        {formatTime(item.createDate)} {formatDate(item.createDate)}
                    </p>
                </div>
                <div className={classes["form-view-content"]}>
                    <p className={classes["form-view-content-main"]}>Bình luận:</p>
                    <p className={classes["form-view-content-detail"]}>{item.contents}</p>
                </div>
                {item.contents !== ""}
            </div>
          </div>
          <hr></hr>
        </div>
        
      ))}
    </section>
  );
};

export default ViewEvaluation;
