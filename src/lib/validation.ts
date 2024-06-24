import { z } from "zod";

export enum AnimalGender {
  MALE = "Mascul",
  FEMALE = "Femela",
}

export const addNewAnimalSchema = z.object({
  name: z.string().min(2).max(50),
  registration_number: z.string().min(14).max(15).nullable(),
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
  health_condition: z.string().min(2).max(50),
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
  | "weight"
  | "health_condition";

export const NewBornValidationSchema = z.object({
  name: z.string().min(2).max(50),
  registration_number: z.string().nullable(),
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
  health_condition: z.string().min(2).max(50),
});

export const AddFarmValidationSchema = z.object({
  userId: z.string().min(2).max(50),
  email: z.string().email(),
  exploitation_code: z.string().max(50),
  phone: z.string().max(20),
  administrator: z.string().max(50),
  farm_name: z.string().min(2).max(50),
  location: z.string().max(50),
  region: z.string().max(50),
  country: z.string().max(50),
  address: z.string().max(50),
  description: z.string().max(250),
});
