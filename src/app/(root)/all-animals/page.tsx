import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddNewAnimalForm from "@/components/form/AddNewAnimalForm";
import Modal from "@/components/shared/Modal";

export default function AllAnimalsPage() {
  return (
    <MaxWidthWrapper className="flex mx-0 justify-between w-full">
      <h1>AllAnimalsPage</h1>
      <Modal triggerTitle="Adauga animal nou">
        <AddNewAnimalForm />
      </Modal>
    </MaxWidthWrapper>
  );
}
