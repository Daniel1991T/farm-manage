import { toast } from "sonner";
import { TZSAError } from "zsa";

export const handleTZSAErrorMessage = (error: TZSAError) => {
  const errorParse = JSON.parse(error.data);
  errorParse;
  console.log(errorParse);

  let userFriendlyMessage = "A apărut o eroare necunoscută.";

  if (errorParse.code === "23505") {
    userFriendlyMessage = `O înregistrare cu crotaliu: ${errorParse.detail
      .split("=")[1]
      .replace(")", "")
      .replace("(", "")
      .split(" ")[0]
      .trim()} există deja în baza de date.`;
  } else if (errorParse.code === "42P01") {
    userFriendlyMessage = `Eroare: Tablelul nu există.`;
  } else {
    userFriendlyMessage = `Cod eroare: ${error.code} - ${errorParse.detail}`;
  }

  return toast.error(userFriendlyMessage, {
    className: "bg-red-500 text-white",
  });
};
