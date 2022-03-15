import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Announcement from "../components/Announcement.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import categoryStore from "../store/categoryStore.js";
import productStore from "../store/productStore.js";

const Client = () => {
  const { products, getProducts } = productStore();
  const { categories, getCategories } = categoryStore();

  useEffect(() => {
    if (products.length > 1) return;
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
      <Outlet/>
      <Footer/>
    </>
  );
};

export default Client;