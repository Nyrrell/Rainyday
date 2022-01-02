import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";

const App = () => {
  const user = true
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<ProductList/>}>
        <Route path=":category" element={<ProductList/>}/>
      </Route>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={user ? <Navigate replace to='/'/> : <Login/>} />
      <Route path="/register" element={user ? <Navigate replace to='/'/> : <Register/>}/>
    </Routes>
  );
};

export default App;