import LeftSidebar from "@/components/shared/LeftSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex items-center justify-center flex-col">
      <div className="w-full flex">
        <LeftSidebar />
        <div className="flex flex-1">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
