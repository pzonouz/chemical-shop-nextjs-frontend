import React from "react";
import Navbar from "./navbar";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer drawer-start z-50 relative">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Navbar />
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-1/2 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className="w-full">
            <a className="w-full">Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
