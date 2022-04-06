import React from "react";
import { SideBarCmp } from "../components/Common/SideBar/SideBar";
import Header from "../components/Common/Header/Header";

export default function MainLayout({ children, currentFlow, apploginRole }) {
  return (
    <>
      <Header currentFlow={currentFlow} />
      <div className="page-container">
        <SideBarCmp currentFlow={currentFlow} apploginRole={apploginRole} />
        <div className="right-side-container ">{children}</div>
      </div>
    </>
  );
}
