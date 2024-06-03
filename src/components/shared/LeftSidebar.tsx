/* eslint-disable @next/next/no-img-element */
import { sidebarLinks } from "@/constants";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LeftSidebar() {
  return (
    <SignedIn>
      <section className="w-56 flex flex-col p-2">
        {sidebarLinks.map((link) => (
          <Link key={link.route} href={link.route}>
            <div className="flex items-center w-full gap-2 p-4 hover:bg-gray-100">
              <img src={link.imgURL} alt={link.label} className="size-10" />
              <p className="w-full">{link.label}</p>
            </div>
          </Link>
        ))}
      </section>
    </SignedIn>
  );
}
