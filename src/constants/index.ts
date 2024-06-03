import { AnimalGender } from "@/lib/validation";
import { SelectOptionType, SidebarLink } from "@/types";

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/circle-check.svg",
    route: "/",
    label: "Tasks-uri",
  },
  {
    imgURL: "/assets/icons/all-animals.svg",
    route: "/all-animals",
    label: "Toate animalele",
  },
  {
    imgURL: "/assets/icons/birth.svg",
    route: "/born",
    label: "Vitei nascuti",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/mounts",
    label: "Monte",
  },
  {
    imgURL: "/assets/icons/circle-x.svg",
    route: "/deaths",
    label: "Decese",
  },
  {
    imgURL: "/assets/icons/file-output.svg",
    route: "/outputs",
    label: "Iesiri",
  },
];

export const AnimalGenderOption: SelectOptionType[] = [
  {
    label: "Mascul",
    value: "Mascul",
  },
  {
    label: "Femela",
    value: "Femela",
  },
];

export const initialValuesAddNewAnimal = {
  name: "",
  registration_number: "",
  birth_date: new Date().toISOString(),
  age: "",
  entry_date: "",
  breed: "",
  color: "",
  expiration_authorization: "",
  image: "",
  number_of_authorization: "",
  health_condition: "",
  registration_number_father: "",
  registration_number_mother: "",
  sex: AnimalGender.FEMALE,
  weight: "",
};
export const initialValuesAddNewAnimalTest = {
  name: "Bibi",
  registration_number: "RO525525225233",
  birth_date: new Date().toISOString(),
  age: "7 ani",
  entry_date: "25/02/2024",
  breed: "angus",
  color: "negru",
  expiration_authorization: "25/12/2024",
  image: "test",
  number_of_authorization: "2525252525",
  health_condition: "good",
  registration_number_father: "RO525525225233",
  registration_number_mother: "RO525525225233",
  sex: AnimalGender.FEMALE,
  weight: "250kg",
};
