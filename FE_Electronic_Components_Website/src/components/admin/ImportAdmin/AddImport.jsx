import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import classes from "./AddImport.module.css";
import api from "../../../apiRequest/axios";
import formatCurrency from "../../../Helper/convertUSD";
import { useNavigate } from "react-router-dom";

const AddImport = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Các state để lưu dữ liệu sản phẩm
  const [importName, setImportName] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const [contents, setContents] = useState("");
  const [product, setProduct] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [showFormDetailImport, setShowFormDetailImport] = useState(true);

  const [detailImport, setDetailImport] = useState([]);
  // const [idProduct, setIdProduct] = useState(0);
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const getSupplier = async () => {
    const res = await api.get("/supplier", {});
    console.log("supplier: ", res);
    return res;
  };
  const getProduct = async () => {
    const res = await api.get("/product");
    return res;
  };

  useEffect(() => {
    getSupplier()
      .then((res) => {
        setSupplier(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getProduct()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Specification
  const toggleForm = () => {
    if (selectedSupplier !== 0)
      setShowFormDetailImport((prevShowForm) => !prevShowForm);
    else {
      return toast.error("Chọn đơn vị nhà cung cấp", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const viewProduct = () => {
    return (
      <div>
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={toggleForm}
        ></div>
        <div className={classes["detailImport"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="nameProduct"
              className={classes["detailImport-form"]}
            >
              <Form.Label>Sản phẩm nhập</Form.Label>
              <Form.Control
                as="select"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
                required
              >
                <option value="">Chọn sản phẩm</option>
                {product.map((item) => {
                  
                  console.log(selectedSupplier)
                  // setID(item.supplier.idsupplier)
                  if (`${item.supplier.idsupplier}` === `${selectedSupplier}`) {
                    return (
                      <option key={item.productName} value={item.productName}>
                        {item.productName}
                      </option>
                    );
                  }
                  return null; // Không tạo phần tử option nếu điều kiện không đúng
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="price"
              className={classes["detailImport-form"]}
            >
              <Form.Label>Giá sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="quantity"
              className={classes["detailImport-form"]}
            >
              <Form.Label>Số lượng nhập</Form.Label>
              <Form.Control
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
            <div className={classes["detailImport-form-button"]}>
              <button type="button" onClick={handleAddDetailImport}>
                Add
              </button>
              <button type="button" onClick={toggleForm}>
                Exit
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  const handleAddDetailImport = () => {
    if (nameProduct !== "" && price !== 0 && quantity !== 0) {
      const newDetailImport = {
        product: nameProduct,
        quantity: quantity,
        price: price,
      };

      setDetailImport((prevDetailImport) => [
        ...prevDetailImport,
        newDetailImport,
      ]);

      setNameProduct("");
      setQuantity(0);
      setPrice(0);
    }
  };

  const handleRemoveDetailImport = (idProduct) => {
    setDetailImport((prevDetailImport) =>
      prevDetailImport.filter((spec) => spec.idProduct !== idProduct)
    );
  };

  //handleAddProduct
  const handleAddImport = () => {
    const newImport = {
      importStockName: importName,
      contents: contents,
      supplier: selectedSupplier,
      detailImportStocks: detailImport,
    };

    if (
      newImport.importStockName.trim() !== "" &&
      newImport.supplier !== 0 &&
      newImport.detailImportStocks.length > 0
    ) {
      api
        .post("/admin/import/add", newImport, {
          headers: {
            access_token: token,
          },
        })
        .then(() => {
          toast.success("Lập phiếu nhập thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/admin/import");
          }, 2000);
        })
        .catch((err) => {
          return toast.error("Lập phiếu nhập thất bại, vui lòng thử lại", {
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
    } else {
      return toast.error("Nhận đủ thông tin cho phiếu nhập", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Thêm phiếu nhập
          </h1>
        </div>
      </div>
      <div className={classes["container"]}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddImport();
          }}
        >
          <Form.Group controlId="productName">
            <Form.Label className={classes["form"]}>Tên phiếu nhập</Form.Label>
            <Form.Control
              type="text"
              value={importName}
              onChange={(e) => setImportName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="selectedSupplier">
            <Form.Label className={classes["form"]}>Nhà cung cấp</Form.Label>
            <Form.Control
              as="select"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              required
            >
              <option value="">Chọn nhà cung cấp</option>
              {supplier.map((supplier) => (
                <option key={supplier.idsupplier} value={supplier.idsupplier}>
                  {supplier.supplierName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="contents">
            <Form.Label className={classes["form"]}>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="specifications">
            <Form.Label className={classes["form"]}>Sản phẩm nhập</Form.Label>
            <div>
              {showFormDetailImport && (
                <button
                  className={classes["button-add-spec"]}
                  onClick={toggleForm}
                >
                  Thêm sản phẩm nhập
                </button>
              )}

              <div className={classes["list"]}>
                {!showFormDetailImport &&
                  viewProduct(handleAddDetailImport, toggleForm)}
                <div className={classes["list-spec"]}>
                  <p>Tên sản phẩm</p>
                  <p>Giá nhập</p>
                  <p>Số lượng</p>
                  <div></div>
                </div>
                <hr style={{ margin: "0px", marginLeft: "10px" }}></hr>
                {detailImport.map((item) => (
                  <div>
                    <div className={classes["list-spec"]} key={item.idProduct}>
                      <p>{item.product}</p>
                      <p>{formatCurrency(item.price)} </p>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => handleRemoveDetailImport(item.idProduct)}
                      >
                        Xóa
                      </button>
                    </div>
                    <hr style={{ margin: "0px", marginLeft: "10px" }}></hr>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>

          <div className={classes["add-product"]}>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </div>
        </Form>
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
    </div>
  );
};
export default AddImport;
