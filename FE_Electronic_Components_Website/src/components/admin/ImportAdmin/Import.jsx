import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@mui/material";
import api from "../../../apiRequest/axios";
import classes from "./ListImport.module.css";
import formatCurrency from "../../../Helper/convertUSD";
import { formatDate, formatTime } from "../../../Helper/convertDate";
import { FaExclamationCircle } from "react-icons/fa";

const Import = ({imports, setIsCheckHandle}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [showSubtable, setShowSubtable] = useState(false);
  
 const [amount, setAmount] = useState(0);
 let amountTemp = 0;
 useEffect(()=>{
  imports.detailImportStocks.map((item) => {
    console.log("amount")
    amountTemp += item.quantity * item.price;
  })
  setAmount(amountTemp/2);
 }, [])

 const viewStatus = (option) => {
  return (
    <div className={classes["status"]}>
      <div className={classes["status-text"]} onClick={() => HandleStatus(9)}>
        <Link className={classes["status-color"]}>Hoàn thành</Link>
      </div>
    </div>
  );
};

  function Status(e) {
    const status = e.value;
    if (status === 8) {
      return <p className={classes["text-wait"]}>Đang xử lý</p>;
    }
    else {
      return <p className={classes["text-confirm"]}>Hoàn thành </p>;
    }
  }

  const HandleStatus = (index) => {
    setShowSubtable(false)
      try {
        if (index === 9 && imports.status.idstatus !== 9) {
          api
            .get(`/admin/import/complete/${imports.idimportStock}`, {
              headers: {
                access_token: token,
              },
            })
            .then((res) => {
              console.log(res);
              toast.success("COMPLETE_IMPORT_SUCCESS", {
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
              console.log(err);
              toast.error("VALIDATION_COMPLETE_IMPORT_ERROR001", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
        }
        setIsCheckHandle(true);
      } catch (error) {
        console.log(error.response.data);
      }
  };

  const toggleSubtable = () => {
    setShowSubtable((prevShowSubtable) => !prevShowSubtable);
  };

  const handleStatusSelect = () => {
    setShowSubtable(false);
  };

  return (
    <div className={classes["container__orders"]}>
      <div className={classes["cart-item"]} key={imports.idimportStock}>
        
        <div className={classes["item"]} onClick={() => navigate(`/admin/import/${imports.idimportStock}`)}>
          <p>{imports.importStockName}</p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/import/${imports.idimportStock}`)}>
          <p >
            {imports.employer.name}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/import/${imports.idimportStock}`)}>
          <p >
            {formatTime(imports.updatedDate)} {formatDate(imports.updatedDate)}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/import/${imports.idimportStock}`)}>
          <p >
            {imports.supplier.supplierName}
          </p>
        </div>
        <div className={classes["item"]} onClick={() => navigate(`/admin/import/${imports.idimportStock}`)}>
          <p >
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={classes["item-status"]}>
          <Status value={imports.status.idstatus}/>
          <FaExclamationCircle
              className={classes["item-icon"]}
              onClick={toggleSubtable}
            />
            {showSubtable && viewStatus(handleStatusSelect)}
        </div>
      </div>
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
  );
};

export default Import;
