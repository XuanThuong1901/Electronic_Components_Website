import React, {useEffect, useState} from "react";
import { ToastContainer } from "react-toastify";
import { Form } from "react-bootstrap";
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

const Statistical = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [imports, setImports] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataImports, setDataImports] = useState([]);
  const [typeStatistical, setTypeStistical] = useState(1);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const getOrders = () =>{
    const res = api.get("/admin/order", {
      headers :{
        access_token: token
      }
    });
    return res;
  }
  const getImports = () => {
    const res = api.get("/admin/import", {
      headers: {
        access_token: token
      }
    });
    return res;
  }

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    getImports()
      .then((res) => {
        setImports(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  const datatemp = [
    { name: "A", value1: 200000, value2: 50000 },
    { name: "B", value1: 150000, value2: 50000 },
    { name: "C", value1: 50000, value2: 50000 },
    { name: "D", value1: 700000, value2: 50000 },
  ];

  // const typeStatistical = 



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
              <option value={1}>Thu nhập</option>
              <option value={2}>Sản phẩm bán chạy</option>
              
            </Form.Control>
          </Form.Group>
            </Form>
        </div>
        <div className={classes["select-datetime"]}>
          <p>Thời gian:</p>
            <Form.Group controlId="typeStatistical">
            <Form.Control
            className={classes["select-type-detail"]}
              as="date"
              value={typeStatistical}
              onChange={(e) => setTypeStistical(e.target.value)}
              required
            >
            </Form.Control>
          </Form.Group>
        </div>
        <BarChart className={classes["barchart"]}
          width={1200}
          height={600}
          data={datatemp}
          // margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" fill="#8884d8" name="date1" barSize={40}/>
          <Bar dataKey="value2" fill="#00ffff" name="date2" barSize={40}/>
        </BarChart>
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
