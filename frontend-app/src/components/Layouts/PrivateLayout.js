import React from "react";
import Header from "../Admin/Header";
import Footer from "../Admin/Footer";
import SideNav from "../Admin/SideNav";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import { Outlet } from "react-router-dom";
export default function PrivateLayout() {
  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <Header />
        <div className="app-main">
          <SideNav />
          <div className="app-main__outer">
            <Outlet />
          </div>
        </div>
      </div>
      <div>
        <div className="app-drawer-wrapper">
          <div className="drawer-nav-btn">
            <button
              type="button"
              className="hamburger hamburger--elastic is-active"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
          <div className="drawer-content-wrapper">
            <div className="scrollbar-container">
              <h3 className="drawer-heading">Servers Status</h3>
              <div className="drawer-section">
                <div className="row">
                  <div className="col">
                    <div className="progress-box">
                      <h4>Server Load 1</h4>
                      <div className="circle-progress circle-progress-gradient-xl mx-auto">
                        <small />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="progress-box">
                      <h4>Server Load 2</h4>
                      <div className="circle-progress circle-progress-success-xl mx-auto">
                        <small />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="progress-box">
                      <h4>Server Load 3</h4>
                      <div className="circle-progress circle-progress-danger-xl mx-auto">
                        <small />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider" />
                <div className="mt-3">
                  <h5 className="text-center card-title">Live Statistics</h5>
                  <div id="sparkline-carousel-3" />
                  <div className="row">
                    <div className="col">
                      <div className="widget-chart p-0">
                        <div className="widget-chart-content">
                          <div className="widget-numbers text-warning fsize-3">
                            43
                          </div>
                          <div className="widget-subheading pt-1">Packages</div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-chart p-0">
                        <div className="widget-chart-content">
                          <div className="widget-numbers text-danger fsize-3">
                            65
                          </div>
                          <div className="widget-subheading pt-1">Dropped</div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-chart p-0">
                        <div className="widget-chart-content">
                          <div className="widget-numbers text-success fsize-3">
                            18
                          </div>
                          <div className="widget-subheading pt-1">Invalid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="text-center mt-2 d-block">
                    <button className="mr-2 border-0 btn-transition btn btn-outline-danger">
                      Escalate Issue
                    </button>
                    <button className="border-0 btn-transition btn btn-outline-success">
                      Support Center
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="app-drawer-overlay d-none animated fadeIn" />
      </div>
    </>
  );
}
