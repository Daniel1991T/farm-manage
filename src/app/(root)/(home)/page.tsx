import LandingPage from "@/components/Landing";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function page() {
  const { userId } = auth();
  if (!userId) return <LandingPage />;
  return (
    <div>
      <SignOutButton redirectUrl="/landing" />
    </div>
  );
}
