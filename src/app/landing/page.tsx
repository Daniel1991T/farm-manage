import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <MaxWidthWrapper className="flex flex-col gap-10 justify-center h-[calc(100vh-16rem)] items-center px-4 md:px-0">
      <h1 className="text-3xl font-bold">Easier farm management starts here</h1>
      <div className="flex flex-col md:flex-row gap-1 items-center">
        <div className="flex flex-col items-center">
          <p>
            The farm management software that streamlines operations and
            cultivates growth by bringing all your work, records, sales and data
            together...so you can get back to farming.
          </p>
          <SignUpButton>
            <button className="bg-green-600 text-white h-20 w-48 px-4 py-2 rounded-full">
              Get started
            </button>
          </SignUpButton>
        </div>
        <Image
          className="rounded-xl"
          src={"/assets/images/landing.webp"}
          alt="logo"
          width={600}
          height={400}
        />
      </div>
    </MaxWidthWrapper>
  );
}
