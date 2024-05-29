"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AnimalGender, addNewAnimalSchema } from "@/lib/validation";
import AddNewFormField from "./AddNewFormField";
import WidthFullWrapper from "../wrapper/WidthFullWrapper";
import DataPicker from "./DataPicker";
import { calculateAge } from "@/lib/utils";
import ImageUploaderInputField from "./ImageUploaderInputField";
import { useEffect, useState } from "react";
import SelectField from "./SelectField";
import { AnimalGenderOption } from "@/constants";
import { addCowToDB } from "@/lib/actions/cow";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { handleTZSAErrorMessage } from "@/lib/error-server";

export default function AddNewAnimalForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState(AnimalGender.FEMALE);
  const { isPending, execute: addCow, data } = useServerAction(addCowToDB);
  // 1. Define your form.
  const form = useForm<z.infer<typeof addNewAnimalSchema>>({
    resolver: zodResolver(addNewAnimalSchema),
    defaultValues: {
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
    },
  });

  const handleDateChange = (date: string) => {
    form.setValue("birth_date", date);
  };

  const calculateAgeOnChange = () => {
    form.setValue("age", calculateAge(form.getValues("birth_date")));
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

    try {
      const [data, error] = await addCow(values);
      if (error) {
        handleTZSAErrorMessage(error);
      }
      if (data?.success) {
        toast.success("Animal adaugat cu succes", {
          className: "bg-green-500 text-white",
        });
      }
    } catch (error) {
      console.error(error);
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
          <DataPicker
            placeholder="Data nasterii"
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
          <AddNewFormField
            form={form}
            label="Nr. Crotaliu tata"
            name="registration_number_father"
          />
          <AddNewFormField
            form={form}
            label="Nr. Crotaliu mama"
            name="registration_number_mother"
          />
        </WidthFullWrapper>
        <WidthFullWrapper>
          <AddNewFormField
            form={form}
            label="Starea de sanatate"
            name="health_condition"
          />
          <AddNewFormField
            form={form}
            name="entry_date"
            label="Data intrari in ferma"
          />
        </WidthFullWrapper>
        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-500 transition-all duration-200 ease-linear"
        >
          {isPending ? "Se incarca..." : "Adauga"}
        </Button>
      </form>
    </Form>
  );
}
