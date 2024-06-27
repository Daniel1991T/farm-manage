import RegisterFarmForm from "@/components/form/RegisterFarmForm";
import { registerFarmToDB } from "@/lib/actions/farm";
import { auth } from "@clerk/nextjs/server";

export default async function Register() {
  const { userId } = auth();
  if (!userId) {
    return <div>loading...</div>;
  }
  return (
    <section className="flex flex-col px-10 gap-2 lg:pl-0">
      <h1 className="font-bold text-2xl">Crează Profilul Fermei Tale</h1>
      <p className="text-sm text-gray-500">
        Completează informațiile necesare pentru a-ți organiza și gestiona
        eficient ferma. Adaugă detalii despre ferma ta pentru a avea o evidență
        clară și accesibilă. Începe acum și simplifică administrarea
        activităților zilnice ale fermei tale!
      </p>
      <RegisterFarmForm
        type="add"
        userId={userId}
        submitFn={registerFarmToDB}
      />
    </section>
  );
}
