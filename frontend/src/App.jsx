import { Routes, Route } from "react-router-dom";
import React from 'react';

import { AlreadyAuth, RequireAuth, RequireAuthorization } from "./hooks/ProtectedRoute.js";

// SHOP PAGES
import ProductDetailPage from "./components/ProductDetail/ProductDetailPage.jsx";
import ProductCatalog from "./components/Product/ProductCatalog.jsx";
import Profile from "./components/Users/Profile/AccountPage.jsx";
import Register from "./components/Users/Auth/Register.jsx";
import Login from "./components/Users/Auth/Login.jsx";
import NoMatch from "./components/Base/NoMatch.jsx";
import Layout from "./components/Base/Client.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Home from "./components/Base/Home.jsx";

// ADMIN PAGES
import AdminCategories from "./components/Admin/Categories/Categories.jsx"
import AdminDiscounts from "./components/Admin/Discounts/Discounts.jsx"
import AdminProducts from "./components/Admin/Products/Products.jsx"
import AdminSales from "./components/Admin/Sales/Sales.jsx";
import AdminUsers from "./components/Admin/Users/Users.jsx";
import AdminLayout from "./components/Base/Admin.jsx";
import HomeAdmin from "./components/Admin/Home.jsx";
import ScrollToTop from "./hooks/scrollToTop.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<ScrollToTop><Layout/></ScrollToTop>}>
          <Route index element={<Home/>}/>
          <Route path="/products/:category" element={<ProductCatalog/>}/>
          <Route path="/product/:slug" element={<ProductDetailPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<AlreadyAuth><Login className={'auth'}/></AlreadyAuth>}/>
          <Route path="/register" element={<AlreadyAuth><Register className={'auth'}/></AlreadyAuth>}/>
          <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
        </Route>
        <Route path="/admin" element={<RequireAuthorization><AdminLayout/></RequireAuthorization>}>
          <Route index element={<HomeAdmin/>}/>
          <Route path="sales" element={<AdminSales/>}/>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="categories" element={<AdminCategories/>}/>
          <Route path="discounts" element={<AdminDiscounts/>}/>
        </Route>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </React.StrictMode>
  );
};

export default App;