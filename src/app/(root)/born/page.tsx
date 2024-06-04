import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AnimalForm from "@/components/form/AnimalForm";
import Modal from "@/components/shared/Modal";
import { columnsNewBorn } from "@/components/table/columnsNewBorn";
import CowTable from "@/components/table/cowTable/CowTable";
import { NewBornTableSchema } from "@/database/schema";
import { addNewBornToDB, getNewBorn } from "@/lib/actions/newBorn";

export default async function BornCattlePage() {
  const [newBorn, error] = await getNewBorn();

  if (!newBorn) {
    return <div>loading...</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Fătări curente:</h1>
        <Modal triggerTitle="Aduga fatare" triggerClassName="w-fit">
          <AnimalForm submitFn={addNewBornToDB} type="add" />
        </Modal>
      </div>
      <div>
        <CowTable
          data={newBorn as NewBornTableSchema[]} // Cast newBorn to NewBornTableSchema[]
          columns={columnsNewBorn}
        />
      </div>
    </MaxWidthWrapper>
  );
}
