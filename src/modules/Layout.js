import React from "react";
import Navbar from "./Partials/Navbar";
import SideBar from "./Partials/Sidebar";
import Footer from "./Partials/Footer";
import SettingPanel from "./Partials/SettingPanel";

const Layout = ({ children }) => {
  return (
    <>
      <div class="container-scroller">
        <Navbar />
        <div class="container-fluid page-body-wrapper">
          <SettingPanel />
          {/* Sidebar */}
          <SideBar />
          <div class="main-panel">
            {/* Begin: Content Wrapper */}
            <main>{children}</main>
            {/* End: Content Wrapper */}
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
