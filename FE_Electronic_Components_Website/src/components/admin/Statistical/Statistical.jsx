import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import classes from "./Statistical.module.css";
import api from "../../../apiRequest/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatDate } from "../../../Helper/convertDate";
import Sale from "./Sale";
import formatCurrency from "../../../Helper/convertUSD";

const Statistical = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [imports, setImports] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataImports, setDataImports] = useState([]);
  const [typeStatistical, setTypeStistical] = useState("sale");
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  // const [dataReport, setDataReport] = useState([]);
  const [dataReports, setDataReports] = useState([]);
  const [dateStart, setDateStart] = useState([]);
  const [sumSale, setSumSale] = useState(0);
  const handleSale = () => {
    if (startDay === null) {
      return toast.warn("Vui lòng chọn này thống kê !", {
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
    if (endDay === null) {
      return toast.warn("Vui lòng chọn này thống kê !", {
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
    const request = {
      startDay: startDay,
      endDay: endDay,
      type: typeStatistical,
    };
    console.log(request);

    api
      .post("/admin/report", request, {
        headers: {
          access_token: token,
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        setDateStart([formatDate(startDay)]);
        // setDateStart((prevDate) => {
        //   const newDate = data.dateList.map((item, index) => ({
        //     time: formatDate(item),
        //   }));
        //   return newDate;
        // });
        setDataReports((prevData) => {
          const newData = data.dateList.map((item, index) => ({
            time: formatDate(item),
            saleOrder: data.saleOrder[index],
            saleImport: data.saleImport[index],
          }));
          return newData;
        });
        setDateStart((prevData) => {
          const newDate = []
          newDate.push(formatDate(startDay))
          dataReports.map((item) => (
            newDate.push(item.time)
            // setSumSale(sumSale + (item.saleOrder - item.saleImport))
            ))
          return newDate;
        });
        setSumSale(() => {
          let sumSale = 0;
          dataReports.map((item) => (
            sumSale = sumSale + (item.saleOrder - item.saleImport)
            ));
          return sumSale;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const typeStatistical =
  const handleStartDayChange = (e) => {
    const newDate = new Date(e.target.value);
    setStartDay(new Date(newDate).toISOString().split("T")[0]);
  };

  const handleEndDayChange = (e) => {
    const newDate = new Date(e.target.value);
    setEndDay(new Date(newDate).toISOString().split("T")[0]);
  };

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Thống kê
          </h1>
        </div>

        <div className={classes["select-type"]}>
          <p>Loại thống kê:</p>
          <Form>
            <Form.Group controlId="typeStatistical">
              <Form.Control
                className={classes["select-type-detail"]}
                as="select"
                value={typeStatistical}
                onChange={(e) => setTypeStistical(e.target.value)}
                required
              >
                <option value={"sale"}>Doanh thu</option>
                <option value={"product"}>Sản phẩm bán chạy</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <div className={classes["row"]}>
          <div className={classes["select-datetime"]}>
            {/* <p>Thời gian:</p> */}
            <Form.Group controlId="birthday">
              <Form.Label className={classes["form"]}>Từ ngày:</Form.Label>
              <Form.Control
                type="date"
                value={startDay}
                onChange={handleStartDayChange}
              />
            </Form.Group>
          </div>
          <div className={classes["select-datetime"]}>
            {/* <p>Thời gian:</p> */}
            <Form.Group controlId="birthday">
              <Form.Label className={classes["form"]}>Đến ngày:</Form.Label>
              <Form.Control
                type="date"
                value={endDay}
                onChange={handleEndDayChange}
              />
            </Form.Group>
          </div>
          <div className={classes["button-report"]}>
            <button onClick={handleSale}>Thống kê</button>
          </div>
        </div>
        {dataReports.length !== 0 && (
          <div>
            <BarChart
              className={classes["barchart"]}
              width={1100}
              height={400}
              data={dataReports}
              // margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" name="Thời gian" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="saleOrder"
                fill="#8884d8"
                name="Tổng tiền bán"
                barSize={40}
              />
              <Bar
                dataKey="saleImport"
                fill="#00ffff"
                name="Tổng tiền nhập"
                barSize={40}
              />
            </BarChart>
            <div>
              <div className={classes["container"]}>
                <p>Thống kê doanh thu</p>
                <div className={classes["container__employees"]}>
                  <div className={classes["cart-item"]}>
                    <div className={classes["main"]}>
                      <p>Từ ngày</p>
                    </div>
                    <div className={classes["main"]}>
                      <p>Đến trước ngày</p>
                    </div>
                    <div className={classes["main"]}>
                      <p>Tổng bán</p>
                    </div>
                    <div className={classes["main"]}>
                      <p>Tổng nhập</p>
                    </div>
                    <div className={classes["main"]}>
                      <p>Doanh thu</p>
                    </div>
                  </div>
                </div>
                {dataReports.map((item, index) => (
                  <Sale startDay={dateStart[index]} item={item} />
                ))}
                
              </div>
            </div>
            <div className={classes["sum-sale"]}>
                  <p>
                    Tổng doanh thu : {formatCurrency(sumSale)}
                  </p>
                </div>
          </div>
        )}
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

export default Statistical;
