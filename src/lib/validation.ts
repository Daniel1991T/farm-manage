import { z } from "zod";

export enum AnimalGender {
  MALE = "Mascul",
  FEMALE = "Femela",
}

export const addNewAnimalSchema = z.object({
  name: z.string().min(2).max(50),
  registration_number: z.string().min(14).max(15),
  birth_date: z.string().min(10).max(20),
  age: z.string().min(1).max(50),
  entry_date: z.string().min(2).max(50),
  sex: z.enum([AnimalGender.FEMALE, AnimalGender.MALE]),
  breed: z.string().min(2).max(50),
  number_of_authorization: z.string().optional(),
  expiration_authorization: z.string().optional(),
  registration_number_mother: z.string().optional(),
  registration_number_father: z.string().optional(),
  image: z.string().optional(),
  weight: z.string().min(1).max(5),
  color: z.string().min(2).max(50),
});

export type AddNewAnimalType = z.infer<typeof addNewAnimalSchema>;

export type AddNewAnimalNameField =
  | "name"
  | "registration_number"
  | "birth_date"
  | "age"
  | "entry_date"
  | "sex"
  | "expiration_authorization"
  | "image"
  | "number_of_authorization"
  | "registration_number_father"
  | "registration_number_mother"
  | "color"
  | "breed"
  | "weight";
