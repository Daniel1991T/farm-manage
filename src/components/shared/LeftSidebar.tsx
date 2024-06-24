/* eslint-disable @next/next/no-img-element */
"use client";
import { sidebarLinks } from "@/constants";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <SignedIn>
      <section
        className="row-span-5 bg-casal-800 left-0 top-0 flex h-screen
  flex-col pt-36  max-sm:hidden lg:w-[266px]"
      >
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "backdrop-blur-3xl bg-casal-700 text-gray-50 fill-gray-50"
                  : "text-gray-50 fill-gray-50 hover:bg-casal-700 hover:text-gray-50"
              } flex items-center justify-start gap-1 p-4 hover:scale-y-110`}
            >
              <div className="flex items-center w-full gap-1">
                <img
                  src={item.imgURL}
                  alt={item.label}
                  className={`size-10 invert`}
                />
                <p className="w-full hidden md:inline-block">{item.label}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </SignedIn>
  );
}
