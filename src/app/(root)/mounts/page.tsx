import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Modal from "@/components/shared/Modal";

export default function MountsPage() {
  return (
    <MaxWidthWrapper>
      <h1>MountsPage</h1>
      <Modal triggerTitle="Adauga montă">
        <div>Formular de adaugare montă</div>
      </Modal>
    </MaxWidthWrapper>
  );
}
