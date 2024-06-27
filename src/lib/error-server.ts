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
  } else if (errorParse.issues[0].code === "too_small") {
    userFriendlyMessage = "Crotaliul trebuie să aibă cel puțin 14 caractere";
  } else {
    userFriendlyMessage = `Cod eroare: ${error.code} - ${errorParse.detail}`;
  }
  return toast.error(userFriendlyMessage, {
    className: "bg-red-500 text-white border-none",
    position: "top-center",
  });
};

export const handleRegisterError = (error: TZSAError) => {
  const errorParse = JSON.parse(error.data);
  let userFriendlyMessage = "A apărut o eroare necunoscută.";
  if (errorParse.code === "23505") {
    userFriendlyMessage = `Deja există o fermă creata de pe acest cont, daca vreati sa faceti modificari duceti-va pe pagina de profil.`;
  }
  return toast.error(userFriendlyMessage, {
    className: "bg-red-500 text-white border-none",
    position: "top-center",
  });
};
