import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex items-center justify-center flex-col">
      <div className="w-full flex">
        <LeftSidebar />
        {children}
      </div>
    </main>
  );
};
export default Layout;
