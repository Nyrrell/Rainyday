import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Announcement from "../Layout/Announcement.jsx";
import Navbar from "../Layout/Navbar.jsx";
import Footer from "../Layout/Footer.jsx";

import categoryStore from "../../store/categoryStore.js";
import productStore from "../../store/productStore.js";

const Client = () => {
  const { products, getProducts } = productStore();
  const { categories, getCategories } = categoryStore();

  useEffect(() => {
    if (Object.keys(products).length) return;
    getProducts();
  }, [getProducts, products]);

  useEffect(() => {
    if (categories.length > 1) return;
    getCategories();
  }, [getCategories, categories]);

  return (
    <>
      <Navbar/>
      <Announcement/>
      <Outlet style={{minHeight: "60vh"}}/>
      <Footer/>
    </>
  );
};

export default Client;