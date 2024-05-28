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

export default function AddNewAnimalForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState(AnimalGender.FEMALE);
  // 1. Define your form.
  const form = useForm<z.infer<typeof addNewAnimalSchema>>({
    resolver: zodResolver(addNewAnimalSchema),
    defaultValues: {
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
      registration_number_father: "",
      registration_number_mother: "",
      sex: AnimalGender.FEMALE,
      weight: "0kg",
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
  function onSubmit(values: z.infer<typeof addNewAnimalSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          <AddNewFormField form={form} label="Imagine" name="image" />
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
          Adauga
        </Button>
      </form>
    </Form>
  );
}
