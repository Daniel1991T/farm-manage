import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddNewAnimalForm from "@/components/form/AddNewAnimalForm";
import Modal from "@/components/shared/Modal";
import { getAllCows } from "@/lib/actions/cow";

export default async function AllAnimalsPage() {
  const [cows, error] = await getAllCows();

  if (cows) {
    console.log(cows);
  }

  if (error) {
    console.log(error);
  }
  return (
    <MaxWidthWrapper className="flex mx-0 justify-between w-full">
      <h1>AllAnimalsPage</h1>
      <Modal triggerTitle="Adauga animal nou">
        <AddNewAnimalForm />
      </Modal>
    </MaxWidthWrapper>
  );
}
