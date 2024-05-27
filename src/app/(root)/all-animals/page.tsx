import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Modal from "@/components/shared/Modal";

export default function AllAnimalsPage() {
  return (
    <MaxWidthWrapper className="flex mx-0 justify-between w-full">
      <h1>AllAnimalsPage</h1>
      <Modal triggerTitle="Adauga animal nou">
        <div>Formular de adaugare animal</div>
      </Modal>
    </MaxWidthWrapper>
  );
}
