import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Routes, Route } from "react-router-dom";

import { AlreadyAuth, RequireAuth, RequireAuthorization } from "./services/ProtectedRoute.js";

// SHOP PAGES
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Success from "./pages/Success.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

// ADMIN PAGES
import UserList from "./pages/Admin/UserList.jsx";
import HomeAdmin from "./pages/Admin/Home.jsx";
import User from "./pages/Admin/User.jsx";
import Admin from "./pages/Admin.jsx";
import UserNew from "./pages/Admin/UserNew.jsx";
import AdminProductList from "./pages/Admin/ProductList.jsx"
import AdminProduct from "./pages/Admin/Product.jsx"
import AdminProductNew from "./pages/Admin/ProductNew.jsx"
import Client from "./pages/Client.jsx";

const paypalOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_ID,
  currency: "EUR",
  intent: "capture",
  locale: 'fr_FR',
};

const App = () => {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Routes>
        <Route path="/" element={<Client/>}>
          <Route index element={<Home/>}/>
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
        <Route path="/admin" element={<RequireAuthorization><Admin/></RequireAuthorization>}>
          <Route index element={<HomeAdmin/>}/>
          <Route path="users" element={<UserList/>}/>
          <Route path="user/:id" element={<User/>}/>
          <Route path="user/new" element={<UserNew/>}/>
          <Route path="products" element={<AdminProductList/>}/>
          <Route path="product/:id" element={<AdminProduct/>}/>
          <Route path="product/new" element={<AdminProductNew/>}/>
        </Route>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </PayPalScriptProvider>
  );
};

export default App;