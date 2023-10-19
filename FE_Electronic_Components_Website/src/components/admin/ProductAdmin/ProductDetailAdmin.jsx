import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import classes from "./ProductDetail.module.css";
import api from "../../../apiRequest/axios";
import formatCurrency from "../../../Helper/convertUSD";
import { useNavigate } from "react-router-dom";

const ProductDetailAdmin = () => {
  const token = localStorage.getItem("token");
  const { idproduct } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(new FormData());

  // Các state để lưu dữ liệu sản phẩm
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const [selectedTax, setSelectedTax] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [feature, setFeature] = useState("");
  const [contents, setContents] = useState("");
  const [imageProduct, setImageProduct] = useState(null);
  const [showFormSpecifications, setShowFormSpecifications] = useState(true);
  const [specifications, setSpecifications] = useState(null);
  const [specificationName, setSpecificationName] = useState("");
  const [parameter, setParameter] = useState("");

  const [priceList, setPriceList] = useState(null);
  const [showFormListPrice, setShowFormListPrice] = useState(true);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [tax, setTax] = useState(null);

  const getProduct = async () => {
    const res = await api.get(`/product/product=${idproduct}`);
    console.log("product: ", res);
    return res;
  }

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
    getProduct()
        .then((res) => {
        setProduct(res.data)
        setProductName(res.data.productName)
        setSelectedCategory(res.data.category.idcategory)
        setSelectedSupplier(res.data.supplier.idsupplier)
        setQuantity(res.data.quantity)
        setFeature(res.data.feature)
        setContents(res.data.contents)
        setSelectedTax(res.data.tax.idtax)
        setSpecifications(res.data.specifications)
        setPriceList(res.data.priceLists)
        setImageProduct(res.data.imageProducts)
        })
        .catch((err)=>{
        console.log(err); 
        })
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

  const handleUpdateProduct = () => {
    
    const updateProduct = {

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
    formData.append("productDTO", JSON.stringify(updateProduct));
    if (updateProduct.productName.trim() === "") {
      return toast.success("VALIDATION_NAME_PRODUCT_ERROR001", {
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
    if (updateProduct.category === 0) {
      return toast.success("VALIDATION_CATEGORY_PRODUCT_ERROR001", {
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
    if (updateProduct.supplier === 0) {
      return toast.success("VALIDATION_SUPPLIER_PRODUCT_ERROR001", {
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
    if (updateProduct.tax === 0) {
      return toast.success("VALIDATION_TAX_PRODUCT_ERROR001", {
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
    if (updateProduct.feature.trim() === "") {
      return toast.success("VALIDATION_FEATURE_PRODUCT_ERROR001", {
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
    if (updateProduct.contents.trim() === "") {
      return toast.success("VALIDATION_CONTENTS_PRODUCT_ERROR001", {
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
    if (updateProduct.priceList.length === 0) {
      return toast.success("VALIDATION_PRICE_PRODUCT_ERROR001", {
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
    if (updateProduct.specification.length === 0) {
      return toast.success("VALIDATION_SPECIFICATION_PRODUCT_ERROR001", {
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
    if (
      updateProduct.productName.trim() !== "" &&
      updateProduct.category !== 0 &&
      updateProduct.supplier !== 0 &&
      updateProduct.tax !== 0 &&
      updateProduct.quantity !== 0 &&
      updateProduct.feature.trim() !== "" &&
      updateProduct.contents.trim() !== "" &&
      updateProduct.priceList.length !== 0 &&
      updateProduct.specification.length !== 0
    ) {
      api
        .post(`/product/update/${idproduct}`, formData, {
          headers: {
            access_token: token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("UPDATE_PRODUCT_SUCCESS", {
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
          return toast.error("UPDATE_PRODUCT_ERROR001", {
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
      return toast.error("UPDATE_PRODUCT_ERROR001", {
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
              <Form.Label>Thông số</Form.Label>
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
                type="text"
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
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
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
    if (price.trim() !== 0 && type.trim() !== "") {
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
            Thông tin sản phẩm
          </h1>
        </div>
      </div>
    <div className={classes["container"]}>
      
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProduct();
        }}
      >
        <div className={classes["add-product"]}>
          <Button  type="submit">
            Update
          </Button>
        </div>
        <Form.Group controlId="imageProduct">
          <Form.Label className={classes["form"]}>Hình ảnh sản phẩm</Form.Label>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className={classes["form-image"]}>

              {imageProduct !== null && imageProduct.map((image) => (
                <div className={classes["form-image-detail"]} key={image.urlimg}>
                  <img
                    src={image.urlimg}
                    alt={`Image_${image.urlimg}`}
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
            {category !== null && category.map((category) => (
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
            {supplier !== null && supplier.map((supplier) => (
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
            {tax !== null && tax.map((tax) => (
              <option key={tax.idtax} value={tax.idtax}>
                {tax.type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label className={classes["form"]}>Số lượng</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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

        <Form.Group controlId="contents">
          <Form.Label className={classes["form"]}>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={contents}
            onChange={(e) => setContents(e.target.value)}
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
                    {priceList !== null && priceList.map((price) => (
                      <tr
                        className={classes["table-header"]}
                        key={price.id}
                      >
                        <td>{formatCurrency(price.price)}</td>
                        <td>{price.type === "export" ? "Giá bán" : "Giá nhập"}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleRemovePrice(price.id)
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
                      <th>Thông số</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {specifications !== null && specifications.map((spec) => (
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
export default ProductDetailAdmin;
