import LandingPage from "@/components/Landing";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Modal from "@/components/shared/Modal";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function page() {
  const { userId } = auth();
  if (!userId) return <LandingPage />;
  return (
    <MaxWidthWrapper className="flex mx-0">
      <SignOutButton redirectUrl="/landing" />
      <Modal triggerTitle="Creaza un task">
        <div>Formular de creare task</div>
      </Modal>
    </MaxWidthWrapper>
  );
}
