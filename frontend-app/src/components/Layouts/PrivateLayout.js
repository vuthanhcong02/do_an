import React from "react";
import Header from "../Admin/Header";
import Footer from "../Admin/Footer";
import SideNav from "../Admin/SideNav";
import HomeAdmin from "../Admin/HomeAdmin";
export default function PrivateLayout() {
  return (
    <div className="wrapper">
      <Header />
      <SideNav />
      <HomeAdmin />
      <Footer />
    </div>
  );
}
