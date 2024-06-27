import RegisterFarmForm from "@/components/form/RegisterFarmForm";
import { getFarmDetails, updateFarmInDB } from "@/lib/actions/farm";
import { auth } from "@clerk/nextjs/server";

export default async function EditProfile() {
  const { userId } = auth();
  if (!userId) return null;
  const defaultValues = await getFarmDetails({ userId });

  return (
    <section>
      <RegisterFarmForm
        type="update"
        defaultValues={defaultValues[0] ? defaultValues[0] : undefined}
        userId={userId}
        submitFn={updateFarmInDB}
      />
    </section>
  );
}
