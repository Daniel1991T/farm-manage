/* eslint-disable @next/next/no-img-element */
import { sidebarLinks } from "@/constants";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LeftSidebar() {
  return (
    <SignedIn>
      <section>
        {sidebarLinks.map((link) => (
          <Link key={link.route} href={link.route}>
            <div className="flex items-center gap-2 p-4 hover:bg-gray-100">
              <img src={link.imgURL} alt={link.label} className="size-10" />
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </section>
    </SignedIn>
  );
}
