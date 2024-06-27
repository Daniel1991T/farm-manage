import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserCog } from "lucide-react";
import ProfileMenu from "../ProfileMenu";

export default function Navbar() {
  return (
    <nav className="py-4 w-full fixed z-50 shadow-md shadow-casal-800 mx-auto">
      <MaxWidthWrapper className="flex items-center justify-between w-full">
        <Link href="/">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/logo.webp"
              alt="logo"
              width={80}
              height={80}
            />
            <div className="hidden md:flex items-center justify-center ">
              <h2 className="font-bold text-casal-800 text-4xl">Farm</h2>
              <p className="text-4xl">Manager</p>
            </div>
          </div>
        </Link>
        <SignedOut>
          <div className="flex justify-center items-center gap-2">
            <SignInButton>
              <Button
                variant="outline"
                className="outline-green-600 hover:bg-green-50 hover:text-green-600 rounded-full"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outline"
                className="outline-green-600 bg-green-600  text-white hover:bg-green-50 hover:text-green-600 rounded-full"
              >
                Try for free
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <ProfileMenu />
        </SignedIn>
      </MaxWidthWrapper>
    </nav>
  );
}
