import { Routes, Route } from "react-router-dom";

import { AlreadyAuth, RequireAuth, RequireAuthorization } from "./services/ProtectedRoute.js";

// SHOP PAGES
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Success from "./pages/Success.jsx";
import Product from "./pages/Product.jsx";
import Layout from "./pages/Client.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

// ADMIN PAGES
import AdminCategories from "./pages/Admin/Categories/Categories.jsx"
import AdminDiscounts from "./pages/Admin/Discounts/Discounts.jsx"
import AdminProducts from "./pages/Admin/Products/Products.jsx"
import AdminUsers from "./pages/Admin/Users/Users.jsx";
import HomeAdmin from "./pages/Admin/Home.jsx";
import AdminLayout from "./pages/Admin.jsx";
import ScrollToTop from "./utils/scrollToTop.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ScrollToTop smooth><Home/></ScrollToTop>}/>
        <Route path="/products" element={<ProductList/>}>
          <Route path=":category" element={<ProductList/>}/>
        </Route>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/login" element={<AlreadyAuth><Login/></AlreadyAuth>}/>
        <Route path="/register" element={<AlreadyAuth><Register/></AlreadyAuth>}/>
        <Route path="/profile" element={<RequireAuth><Register/></RequireAuth>}/> {/*TODO*/}
      </Route>
      <Route path="/admin" element={<RequireAuthorization><AdminLayout/></RequireAuthorization>}>
        <Route index element={<HomeAdmin/>}/>
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