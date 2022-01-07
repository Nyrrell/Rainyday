import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";
import Success from "./pages/Success.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

const App = () => {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<ProductList/>}>
        <Route path=":category" element={<ProductList/>}/>
      </Route>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/login" element={user ? <Navigate replace to='/'/> : <Login/>} />
      <Route path="/register" element={user ? <Navigate replace to='/'/> : <Register/>}/>
      <Route path="/admin" element={<Admin/>}>
        {/*<Route path="/edit" element={<Admin/>}/>*/}
      </Route>
    </Routes>
  );
};

export default App;