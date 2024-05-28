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
