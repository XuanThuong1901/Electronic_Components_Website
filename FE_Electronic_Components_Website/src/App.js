import './App.css';
import React, {useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import WishList from './pages/WishList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Menu from './pages/Menu';
import Profile from './components/Profile/Profile';
import CheckOut from './components/CheckOut/CheckOut';
import Oders from './pages/Oders';
import OrderDetail from './components/ListOrders/OderDetail';
import ChangePassword from './components/Changepw/ChangePassword';
import Payment from './components/Payment/Payment';
import Discount from './components/Discount/Discount';
import HomePageAdmin from './pages/admin/HomePageAdmin';
import OrderAdmin from './pages/admin/OrderAdmin';
import OrderDetailAdmin from './components/admin/OrderAdmin/OrderDetailAdmin';
import ProdcutAdmin from './components/admin/ProductAdmin/Product';
import ListProdcutAdmin from './components/admin/ProductAdmin/ListPoructAdmin';
import AddProduct from './components/admin/ProductAdmin/AddProduct';
import ListCustomer from './components/admin/Customer/ListCustomer';
import ListSupplier from './components/admin/Supplier/ListSupplier';
import ListShippingUnit from './components/admin/ShippingUnit/ListShippingUnit';
import ListCategoryAdmin from './components/admin/CategoryAdmin/ListCategoryAdmin';
import ListImport from './components/admin/ImportAdmin/ListImport';
import ImportDetail from './components/admin/ImportAdmin/ImportDetail';
import AddImport from './components/admin/ImportAdmin/AddImport';
import ProductDetailAdmin from './components/admin/ProductAdmin/ProductDetailAdmin';
import ListEmployee from './components/admin/Employee/ListEmployee';
import InfoEmployee from './components/admin/Employee/EmloyeeDetail';
import AddEmployee from './components/admin/Employee/AddEmployee';
import Statistical from './components/admin/Statistical/Statistical';
import InfoUser from './components/admin/User/UserAdmin';
function App() {

  useEffect(() => {  
    return () => {
      localStorage.clear()
    }
  })

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/wish-list" element={<WishList/>} />
          <Route path="/product-detail/:id_item" element={<ProductDetail/>} />
          <Route path="/product" element={<Menu/>} />
          <Route path="/category/:id_item" element={<Menu/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/check-out" element={<CheckOut/>} />
          <Route path="/orders" element={<Oders/>} />
          <Route path="/order/:idorder" element={<OrderDetail/>} />
          <Route path="/change-password" element={<ChangePassword/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/discount" element={<Discount/>} />
          <Route path="/admin" element={<HomePageAdmin/>}/>
          <Route path="/admin/order" element={<OrderAdmin/>}/>
          <Route path="/admin/order/:idorder" element={<OrderDetailAdmin/>}/>
          <Route path="/admin/product" element={<ListProdcutAdmin/>}/>
          <Route path="/admin/product/:idproduct" element={<ProductDetailAdmin/>}/>
          <Route path="/admin/product/add" element={<AddProduct/>}/>
          <Route path="/admin/customer" element={<ListCustomer/>}/>
          <Route path="/admin/supplier" element={<ListSupplier/>}/>
          <Route path="/admin/shippingunit" element={<ListShippingUnit/>}/>
          <Route path="/admin/category" element={<ListCategoryAdmin/>}/>
          <Route path="/admin/import" element={<ListImport/>}/>
          <Route path="/admin/import/:idimport" element={<ImportDetail/>}/>
          <Route path="/admin/import/add" element={<AddImport/>}/>
          <Route path="/admin/employee" element={<ListEmployee/>}/>
          <Route path="/admin/employee/:idemployee" element={<InfoEmployee/>}/>
          <Route path="/admin/employee/add" element={<AddEmployee/>}/>
          <Route path="/admin/statistical" element={<Statistical/>}/>
          <Route path="/admin/user" element={<InfoUser/>}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
