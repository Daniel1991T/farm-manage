"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AnimalGender, addNewAnimalSchema } from "@/lib/validation";
import AddNewFormField from "./AddNewFormField";
import WidthFullWrapper from "../wrapper/WidthFullWrapper";
import DataPickerFromField from "./DataPicker";
import { calculateAge } from "@/lib/utils";
import ImageUploaderInputField from "./ImageUploaderInputField";
import { useEffect, useState } from "react";
import SelectField from "./SelectField";
import {
  AnimalGenderOption,
  initialValuesAddNewAnimal,
  initialValuesAddNewAnimalTest,
} from "@/constants";
import { addCowToDB, getMatchingCows, updateCow } from "@/lib/actions/cow";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { handleTZSAErrorMessage } from "@/lib/error-server";
import { DialogClose } from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { SelectSearchFormField } from "./SelectSearchFormField";
import { SearchByRegNumberType } from "@/types";

type AddNewAnimalFormProps = {
  type: "add" | "update";
  defaultValues?: z.infer<typeof addNewAnimalSchema>;
  id?: number;
};

export default function AddNewAnimalForm({
  type,
  defaultValues,
  id,
}: AddNewAnimalFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState(AnimalGender.FEMALE);
  const { isPending, execute: addCow, data } = useServerAction(addCowToDB);
  const { isPending: isPendingUpdate, execute: updateCowDB } =
    useServerAction(updateCow);
  // 1. Define your form.
  const form = useForm<z.infer<typeof addNewAnimalSchema>>({
    resolver: zodResolver(addNewAnimalSchema),
    defaultValues: defaultValues || initialValuesAddNewAnimalTest,
  });

  const handleDateChange = (date: string) => {
    form.setValue("birth_date", date);
  };

  const calculateAgeOnChange = () => {
    form.setValue("age", calculateAge(form.getValues("birth_date")));
  };

  const searchByRegNumber = async ({
    searchRegistrationNumber,
    sex,
  }: SearchByRegNumberType) => {
    return await getMatchingCows({
      registration_number: searchRegistrationNumber,
      sex,
    });
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [imageUrl, form]);
  useEffect(() => {
    form.setValue("sex", gender);
  }, [gender, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addNewAnimalSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (type === "update") {
      try {
        const [data, error] = await updateCowDB({ ...values, id: id!! });
        if (error) {
          handleTZSAErrorMessage(error);
        }
        if (data?.success) {
          toast.success("Animal updatat cu succes", {
            className: "bg-green-500 text-white border-none",
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const [data, error] = await addCow(values);
        if (error) {
          handleTZSAErrorMessage(error);
        }
        if (data?.success) {
          toast.success("Animal adaugat cu succes", {
            className: "bg-green-500 text-white border-none",
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-4xl w-full mx-auto"
      >
        <WidthFullWrapper>
          <ImageUploaderInputField
            imageURL={imageUrl}
            setImageURLs={setImageUrl}
          />
          <div className="w-full">
            <AddNewFormField form={form} label="Nume" name="name" />
            <AddNewFormField
              form={form}
              label="Număr Crotaliu"
              name="registration_number"
            />
          </div>
          <div className="w-full">
            <SelectField
              placeholder="Sexul animalului"
              option={AnimalGenderOption}
              value={gender}
              onChange={setGender.bind(null) as (value: string) => void}
            />
            <AddNewFormField form={form} label="Rasa" name="breed" />
          </div>
        </WidthFullWrapper>
        <WidthFullWrapper className="justify-center items-end">
          <DataPickerFromField
            label="Data Nasterii"
            form={form}
            name="birth_date"
            value={form.getValues("birth_date")}
            onChange={handleDateChange}
            calculateAgeOnChange={calculateAgeOnChange}
          />
          <AddNewFormField form={form} label="Varsta" name="age" />
        </WidthFullWrapper>
        <WidthFullWrapper>
          <AddNewFormField form={form} label="Culoare" name="color" />
          <AddNewFormField form={form} label="Greutate" name="weight" />
        </WidthFullWrapper>
        {gender === AnimalGender.MALE && (
          <WidthFullWrapper>
            <AddNewFormField
              form={form}
              label="Nr. autorizatie taur"
              name="number_of_authorization"
            />
            <AddNewFormField
              form={form}
              label="Data expirari autorizatie"
              name="expiration_authorization"
            />
          </WidthFullWrapper>
        )}
        <WidthFullWrapper>
          {/* <AddNewFormField
            form={form}
            label="Nr. Crotaliu tata"
            name="registration_number_father"
          /> */}
          <SelectSearchFormField
            form={form}
            label="Nr. Crotaliu tata"
            name="registration_number_father"
            typeSelect={AnimalGender.MALE}
            searchFn={searchByRegNumber}
          />
          <SelectSearchFormField
            form={form}
            label="Nr. Crotaliu mama"
            name="registration_number_mother"
            typeSelect={AnimalGender.FEMALE}
            searchFn={searchByRegNumber}
          />
        </WidthFullWrapper>
        <WidthFullWrapper>
          <AddNewFormField
            form={form}
            label="Starea de sanatate"
            name="health_condition"
          />
          <DataPickerFromField
            form={form}
            label="Data de intrare"
            name="entry_date"
            value={form.getValues("entry_date")}
            onChange={(value) => form.setValue("entry_date", value)}
          />
        </WidthFullWrapper>
        <div className="flex items-center justify-between">
          {type === "update" ? (
            <DropdownMenuItem>
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-500 transition-all duration-200 ease-linear"
              >
                {isPendingUpdate ? "Se incarca..." : "Actualizeaza"}
              </Button>
            </DropdownMenuItem>
          ) : (
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-500 transition-all duration-200 ease-linear"
            >
              {isPending ? "Se incarca..." : "Adauga"}
            </Button>
          )}
          <DialogClose className="hover:text-red-500">Închide</DialogClose>
        </div>
      </form>
    </Form>
  );
}
