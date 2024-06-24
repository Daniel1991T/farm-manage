import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="grid grid-cols-5 grid-rows-5">
        <LeftSidebar />
        <section className="flex min-h-screen items-start justify-start col-span-4 row-span-5 px-6 pb-6 pt-36">
          <div className="w-full">{children}</div>
        </section>
      </div>
      <Toaster />
    </main>
  );
};
export default Layout;
