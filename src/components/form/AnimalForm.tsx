"use client";
import { AnimalGenderOption, initialValuesAddNewAnimal } from "@/constants";
import { AnimalGender, NewBornValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageUploaderInputField from "./ImageUploaderInputField";
import { useEffect, useState } from "react";
import WidthFullWrapper from "../wrapper/WidthFullWrapper";
import AddNewFormField from "./AddNewFormField";
import SelectField from "./SelectField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import DataPickerFromField from "./DataPicker";
import { calculateAge } from "@/lib/utils";
import { SearchSelectFormField } from "./SearchSelectFormField";
import { useServerAction } from "zsa-react";
import { TDataOrError } from "zsa";
import { FnType, UpdateFnType } from "@/lib/actions/newBorn";
import { toast } from "sonner";
import { handleTZSAErrorMessage } from "@/lib/error-server";

type AnimalFormProps = {
  submitFn?: (values: FnType) => TDataOrError<any>;
  updateFn?: (values: UpdateFnType) => TDataOrError<any>;
  type: "add" | "update";
  id?: number;
  defaultValues?: z.infer<typeof NewBornValidationSchema>;
};

export default function AnimalForm({
  submitFn,
  type,
  updateFn,
  id,
  defaultValues,
}: AnimalFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState(AnimalGender.FEMALE);
  const { isPending, execute: submit } = useServerAction(submitFn!!);
  const { isPending: isUpdatePending, execute: update } = useServerAction(
    updateFn!!
  );

  const form = useForm<z.infer<typeof NewBornValidationSchema>>({
    resolver: zodResolver(NewBornValidationSchema),
    defaultValues: defaultValues || initialValuesAddNewAnimal,
  });

  const handleDateChange = (date: string) => {
    form.setValue("birth_date", date);
  };

  const calculateAgeOnChange = () => {
    form.setValue("age", calculateAge(form.getValues("birth_date")));
  };

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof NewBornValidationSchema>) => {
    if (type === "add") {
      try {
        const [data, error] = await submit(values as FnType);
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
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      try {
        const [data, error] = await update({
          ...values,
          id: id,
        } as UpdateFnType);
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
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [imageUrl, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <WidthFullWrapper>
          <SearchSelectFormField
            form={form}
            label="Nr. Crotaliu tata"
            name="registration_number_father"
            typeSelect={AnimalGender.MALE}
          />
          <SearchSelectFormField
            form={form}
            label="Nr. Crotaliu mama"
            name="registration_number_mother"
            typeSelect={AnimalGender.FEMALE}
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
        <Button type="submit">{isPending ? "...Incarcare" : "Adugare"}</Button>
      </form>
    </Form>
  );
}
