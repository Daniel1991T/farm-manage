import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Modal from "@/components/shared/Modal";

export default function DeathsPage() {
  return (
    <MaxWidthWrapper>
      <h1>DeathsPage</h1>
      <Modal triggerTitle="Adauga mortalitate">
        <div>Formular de adaugare mortalitate</div>
      </Modal>
    </MaxWidthWrapper>
  );
}
