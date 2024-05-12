import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <>
      <div className="App-header">
        <Header />
      </div>
      <div className="App-content">
        <Outlet />
      </div>
      <div className="App-footer">
        <Footer />
      </div>
    </>
  );
}
