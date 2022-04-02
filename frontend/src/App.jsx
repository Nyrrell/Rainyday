import { Routes, Route } from "react-router-dom";

import { AlreadyAuth, RequireAuth, RequireAuthorization } from "./services/ProtectedRoute.js";

// SHOP PAGES
import ProductCatalog from "./components/Product/ProductCatalog.jsx";
import ProductDetailPage from "./components/ProductDetail/ProductDetailPage.jsx";
import Register from "./components/Users/Auth/Register.jsx";
import ProfileTabs from "./components/Users/Profile/ProfileTabs.jsx";
import Layout from "./components/Base/Client.jsx";
import Login from "./components/Users/Auth/Login.jsx";
import NoMatch from "./components/Base/NoMatch.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Home from "./components/Base/Home.jsx";

// ADMIN PAGES
import AdminCategories from "./components/Admin/Categories/Categories.jsx"
import AdminDiscounts from "./components/Admin/Discounts/Discounts.jsx"
import AdminProducts from "./components/Admin/Products/Products.jsx"
import AdminSales from "./components/Admin/Sales/Sales.jsx";
import AdminUsers from "./components/Admin/Users/Users.jsx";
import HomeAdmin from "./components/Admin/Home.jsx";
import AdminLayout from "./components/Base/Admin.jsx";
import ScrollToTop from "./utils/scrollToTop.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ScrollToTop><Layout/></ScrollToTop>}>
        <Route index element={<Home/>}/>
        <Route path="/products/:category" element={<ProductCatalog/>}/>
        <Route path="/product/:slug" element={<ProductDetailPage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<AlreadyAuth><Login className={'auth'}/></AlreadyAuth>}/>
        <Route path="/register" element={<AlreadyAuth><Register className={'auth'}/></AlreadyAuth>}/>
        <Route path="/profile" element={<RequireAuth><ProfileTabs/></RequireAuth>}/>
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
  );
};

export default App;