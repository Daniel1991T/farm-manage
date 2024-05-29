import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddNewAnimalForm from "@/components/form/AddNewAnimalForm";
import Modal from "@/components/shared/Modal";
import CowTable from "@/components/table/cowTable/CowTable";
import { columnsCowTable } from "@/components/table/cowTable/columnsCowTable";
import { CowSchema } from "@/database/schema";
import { getAllCows } from "@/lib/actions/cow";

export default async function AllAnimalsPage() {
  const [cows, error] = await getAllCows();

  if (!cows) {
    console.log(cows);
    return;
  }

  if (error) {
    console.log(error);
  }
  return (
    <section className="flex flex-col mx-0 max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Toate Vacile:</h1>
        <Modal triggerTitle="Adauga animal nou">
          <AddNewAnimalForm />
        </Modal>
      </div>
      <section className="w-full mx-auto py-10">
        <CowTable columns={columnsCowTable} data={cows as CowSchema[]} />
      </section>
    </section>
  );
}
