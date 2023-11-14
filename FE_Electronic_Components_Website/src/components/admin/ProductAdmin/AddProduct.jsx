import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import classes from "./AddProduct.module.css";
import api from "../../../apiRequest/axios";
import formatCurrency from "../../../Helper/convertUSD";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState(new FormData());

  // Các state để lưu dữ liệu sản phẩm
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const [selectedTax, setSelectedTax] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [feature, setFeature] = useState("");
  const [contents, setContents] = useState("");
  const [imageProduct, setImageProduct] = useState([]);
  const [showFormSpecifications, setShowFormSpecifications] = useState(true);
  const [specifications, setSpecifications] = useState([]);
  const [specificationName, setSpecificationName] = useState("");
  const [parameter, setParameter] = useState("");

  const [priceList, setPriceList] = useState([]);
  const [showFormListPrice, setShowFormListPrice] = useState(true);
  const [price, setPrice] = useState();
  const [type, setType] = useState("export");

  const [category, setCategory] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [tax, setTax] = useState([]);

  const [productNameError, setProductNameError] = useState('');

  const getCategory = async () => {
    const res = await api.get("/category/detail", {});
    console.log("categoryDetail: ", res);
    return res;
  };
  const getSupplier = async () => {
    const res = await api.get("/supplier", {});
    console.log("supplier: ", res);
    return res;
  };
  const getTax = async () => {
    const res = await api.get("/tax", {});
    console.log("tax: ", res);
    return res;
  };

  useEffect(() => {
    getCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getSupplier()
      .then((res) => {
        setSupplier(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getTax()
      .then((res) => {
        setTax(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddProduct = () => {

    // if (productName.trim() === '') {
    //   setProductNameError('Tên sản phẩm không được để trống');
    // } else {
    //   setProductNameError('');
    // }
    // if()

    

    if (productName.trim() === "") {
      return toast.error("Tên sản phẩm không được để trống !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (selectedCategory === 0) {
      return toast.error("Vui lòng chọn loại danh mục sản phẩm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (selectedSupplier === 0) {
      return toast.error("Vui lòng chọn nhà cung cấp sản phẩm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (selectedTax === 0) {
      return toast.error("Vui lòng chọn thuế sản phẩm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (feature.trim("") === "") {
      return toast.error("Tính năng không được để trống !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (contents.trim() === "") {
      return toast.error("Phần mô tả không được để trống !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (priceList.length === 0) {
      return toast.error("Vui lòng thêm giá sản phẩm !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (specifications.length === 0) {
      return toast.error("Vui lòng thêm thông số kỹ thuật cho sản phẩm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    
    const newProduct = {
      productName: productName,
      category: selectedCategory,
      supplier: selectedSupplier,
      tax: selectedTax,
      quantity: quantity,
      feature: feature,
      contents: contents,
      priceList: priceList,
      specification: specifications,
    };
    console.log(newProduct)
    formData.append("productDTO", JSON.stringify(newProduct));

    if (
      newProduct.productName.trim() !== "" &&
      newProduct.category !== 0 &&
      newProduct.supplier !== 0 &&
      newProduct.tax !== 0 &&
      newProduct.quantity === 0 &&
      newProduct.feature.trim() !== "" &&
      newProduct.contents.trim() !== "" &&
      newProduct.priceList.length !== 0 &&
      newProduct.specification.length !== 0
    ) {
      api
        .post("/product/add", formData, {
          headers: {
            access_token: token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Thêm sản phẩm thành công", {
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
            navigate("/admin/product");
          }, 2000);
        })
        .catch((err) => {
          console.log(err)
          formData.delete("productDTO");
          if(err.response.data === "VALIDATION_NAME_PRODUCT_ERROR002")
          {
            toast.error("Trùng tên sản phẩm", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    } else {
      formData.delete("productDTO");
      return toast.error("Thêm sản phẩm thất bại, vui lòng thử lại !", {
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

  //Image
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagesArray = selectedFiles.map((file) => ({
      file: URL.createObjectURL(file),
    }));

    setImageProduct((prevImages) => [...prevImages, ...imagesArray]);

    formData.delete("imageProduct");
    selectedFiles.forEach((file) => {
      formData.append("imageProduct", file);
    });
    setFormData(new FormData(formData));
  };

  const handleRemoveImage = (file) => {
    setImageProduct((prevImages) =>
      prevImages.filter((image) => image.file !== file)
    );
    const fileIndex = Array.from(formData.getAll("imageProduct")).findIndex(
      (image) => image.name === file
    );
    if (fileIndex !== -1) {
      formData.delete(`imageProduct[${fileIndex}]`);
      setFormData(new FormData(formData)); // Update formData state
    }
  };

  // Specification
  const toggleForm = () => {
    setShowFormSpecifications((prevShowForm) => !prevShowForm);
  };

  const viewSpecification = () => {
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
        <div className={classes["specification"]}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="specificationName"
              className={classes["specification-form"]}
            >
              <Form.Label>Tên thông số</Form.Label>
              <Form.Control
                type="text"
                value={specificationName}
                onChange={(e) => setSpecificationName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="parameter"
              className={classes["specification-form"]}
            >
              <Form.Label>Giá trị thông số</Form.Label>
              <Form.Control
                type="text"
                value={parameter}
                onChange={(e) => setParameter(e.target.value)}
                required
              />
            </Form.Group>
            <div className={classes["specification-form-button"]}>
              <button type="button" onClick={handleAddSpecification}>
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

  const handleAddSpecification = () => {
    if (specificationName.trim() !== "" && parameter.trim() !== "") {
      const newSpecification = {
        specificationName: specificationName,
        parameter: parameter,
      };

      setSpecifications((prevSpecifications) => [
        ...prevSpecifications,
        newSpecification,
      ]);

      setSpecificationName("");
      setParameter("");
      setShowFormSpecifications(false);
    }
  };

  const handleRemoveSpecification = (specificationName) => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.filter(
        (spec) => spec.specificationName !== specificationName
      )
    );
  };
  // Price
  const toggleFormPrice = () => {
    setShowFormListPrice((prevShowForm) => !prevShowForm);
  };
  const viewPrice = () => {
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
          onClick={toggleFormPrice}
        ></div>
        <div className={classes["specification"]}>
          <Form onSubmit={handleSubmit}>
          
            <Form.Group
              controlId="price"
              className={classes["specification-form"]}
            >
              <Form.Label>Giá sản phẩm</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId="type"
              className={classes["specification-form"]}
            >
              <Form.Label>Loại</Form.Label>
              <Form.Control
                className={classes["select-type-detail"]}
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="export">Giá bán</option>
                <option value="import">Giá nhập</option>
              </Form.Control>
            </Form.Group>

            <div className={classes["specification-form-button"]}>
              <button type="button" onClick={handleAddPrice}>
                Add
              </button>
              <button type="button" onClick={toggleFormPrice}>
                Exit
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  const handleAddPrice = () => {

    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      alert("Giá sản phẩm phải là một số dương.");
      return; // Không thực hiện thêm giá nếu không hợp lệ
    }
    if (price.trim() !== 0) {
      const newPrice = {
        idprice: Math.random(),
        price: price,
        type: type,
      };

      setPriceList((prevListPrices) => [...prevListPrices, newPrice]);

      setPrice(0);
      setType("");
      setShowFormListPrice(false);
    }
  };

  const handleRemovePrice = (id) => {
    setPriceList((prevPrice) => prevPrice.filter((spec) => spec.id !== id));
  };

  //handleAddProduct

  return (
    <div>
      <div className={classes["main-content"]}>
        <div style={{ margin: "auto" }}>
          <h1
            className="display-5 align-baseline"
            style={{ marginLeft: "15px", paddingTop: "20px" }}
          >
            Thêm sản phẩm
          </h1>
        </div>
      </div>
      <div className={classes["container"]}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <div className={classes["add-product"]}>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </div>
          <Form.Group controlId="imageProduct">
            <Form.Label className={classes["form"]}>
              Hình ảnh sản phẩm
            </Form.Label>
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className={classes["form-image"]}>
                {imageProduct.map((image) => (
                  <div
                    className={classes["form-image-detail"]}
                    key={image.file}
                  >
                    <img
                      src={image.file}
                      alt={`Image_${image.file}`}
                      width="90px"
                      height="90px"
                    />
                    <button onClick={() => handleRemoveImage(image.file)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="productName">
            <Form.Label className={classes["form"]}>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            {/* {productNameError && <p style={{ color: 'red' }}>{productNameError}</p>} */}
          </Form.Group>

          <Form.Group controlId="selectedCategory">
            <Form.Label className={classes["form"]}>Thuộc danh mục</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {category.map((category) => (
                <option key={category.idcategory} value={category.idcategory}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="selectedSupplier">
            <Form.Label className={classes["form"]}>Nhà cung cấp</Form.Label>
            <Form.Control
              as="select"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              required
            >
              <option value="">Select Supplier</option>
              {supplier.map((supplier) => (
                <option key={supplier.idsupplier} value={supplier.idsupplier}>
                  {supplier.supplierName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="selectedTax">
            <Form.Label className={classes["form"]}>Loại thuế</Form.Label>
            <Form.Control
              as="select"
              value={selectedTax}
              onChange={(e) => setSelectedTax(e.target.value)}
              required
            >
              <option value="">Select Tax</option>
              {tax.map((tax) => (
                <option key={tax.idtax} value={tax.idtax}>
                  {tax.type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="quantity">
            <Form.Label className={classes["form"]}>Số lượng</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Group> */}

          <Form.Group controlId="contents">
            <Form.Label className={classes["form"]}>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="feature">
            <Form.Label className={classes["form"]}>Tính năng</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="priceList">
            <Form.Label className={classes["form"]}>Giá sản phẩm</Form.Label>
            <div>
              {showFormListPrice && (
                <button
                  className={classes["button-add-spec"]}
                  onClick={toggleFormPrice}
                >
                  Thêm giá sản phẩm
                </button>
              )}
              <div className={classes["list"]}>
                {!showFormListPrice &&
                  viewPrice(handleAddPrice, toggleFormPrice)}
                <table className={classes["spec-table"]}>
                  <thead>
                    <tr className={classes["table-header"]}>
                      <th>Giá</th>
                      <th>Loại</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceList.map((price) => (
                      <tr className={classes["table-header"]} key={price.id}>
                        <td>{formatCurrency(price.price)}</td>
                        <td>
                          {price.type === "export" ? "Giá bán" : "Giá mua"}
                        </td>
                        <td>
                          <button onClick={() => handleRemovePrice(price.id)}>
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="specifications">
            <Form.Label className={classes["form"]}>
              Thông số kỹ thuật
            </Form.Label>
            <div>
              {showFormSpecifications && (
                <button
                  className={classes["button-add-spec"]}
                  onClick={toggleForm}
                >
                  Thêm thông số
                </button>
              )}
              <div className={classes["list"]}>
                {!showFormSpecifications &&
                  viewSpecification(handleAddSpecification, toggleForm)}
                <table className={classes["spec-table"]}>
                  <thead>
                    <tr className={classes["table-header"]}>
                      <th>Tên thông số</th>
                      <th>Giá trị thông số</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {specifications.map((spec) => (
                      <tr
                        className={classes["table-header"]}
                        key={spec.specificationName}
                      >
                        <td>{spec.specificationName}</td>
                        <td>{spec.parameter}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleRemoveSpecification(spec.specificationName)
                            }
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Form.Group>
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
export default AddProduct;
