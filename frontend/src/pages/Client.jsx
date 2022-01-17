import { Outlet } from "react-router-dom";

import Announcement from "../components/Announcement.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Client = () => {
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