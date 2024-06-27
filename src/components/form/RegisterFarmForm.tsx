"use client";
import {
  AddFarmValidationSchema,
  FarmValidationDefaultValues,
  NewBornValidationSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useServerAction } from "zsa-react";
import { TDataOrError } from "zsa";
import {
  InputRegisterFarmType,
  UpdateFarmFnType,
  registerFarmToDB,
} from "@/lib/actions/farm";
import WidthFullWrapper from "../wrapper/WidthFullWrapper";
import RegisterFarmInputField from "./RegisterFarmInputField";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  handleRegisterError,
  handleTZSAErrorMessage,
} from "@/lib/error-server";

type RegisterFarmFormProps = {
  submitFn?: (values: InputRegisterFarmType) => TDataOrError<any>;
  updateFn?: (values: UpdateFarmFnType) => TDataOrError<any>;
  type: "add" | "update";
  id?: number;
  defaultValues?: z.infer<typeof AddFarmValidationSchema>;
  userId: string;
};

export default function RegisterFarmForm({
  submitFn,
  updateFn,
  userId,
  defaultValues,
  type,
}: RegisterFarmFormProps) {
  const { isPending, execute: submit } = useServerAction(registerFarmToDB);
  const { isPending: isUpdatePending, execute: update } = useServerAction(
    updateFn!!
  );

  const form = useForm<z.infer<typeof AddFarmValidationSchema>>({
    resolver: zodResolver(AddFarmValidationSchema),
    defaultValues: defaultValues || { ...FarmValidationDefaultValues, userId },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof AddFarmValidationSchema>) => {
    console.log(values);
    if (type === "add") {
      const [data, error] = await submit({ ...values });
      if (data?.success) {
        toast.success("Ferma a fost adaugata cu succes");
      }
      if (error) {
        handleRegisterError(error);
      }
    } else {
      const [data, error] = await update({ ...values });
      if (data?.success) {
        toast.success("Profilul fermei a fost actualizata cu succes");
      }
      if (error) {
        handleRegisterError(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <WidthFullWrapper className="flex flex-col ">
          <WidthFullWrapper className="gap-10">
            <RegisterFarmInputField
              form={form}
              name="farm_name"
              label="Numele fermei"
              placeholder="Numele fermei"
            />
            <RegisterFarmInputField
              form={form}
              name="exploitation_code"
              label="Codul de exploatare"
              placeholder="Codul de exploatare"
            />
          </WidthFullWrapper>
          <WidthFullWrapper className="gap-10">
            <RegisterFarmInputField
              form={form}
              name="phone"
              label="Telefon"
              placeholder="Telefon"
            />
            <RegisterFarmInputField
              form={form}
              name="email"
              label="Email"
              placeholder="Email"
            />
          </WidthFullWrapper>
          <WidthFullWrapper className="gap-10">
            <RegisterFarmInputField
              form={form}
              name="administrator"
              label="Administrator"
              placeholder="Administrator"
            />
            <RegisterFarmInputField
              form={form}
              name="country"
              label="Tara"
              placeholder="Tara"
            />
          </WidthFullWrapper>
          <WidthFullWrapper className="gap-10">
            <RegisterFarmInputField
              form={form}
              name="region"
              label="Județ"
              placeholder="Județ"
            />
            <RegisterFarmInputField
              form={form}
              name="location"
              label="Locatie"
              placeholder="Locatie"
            />
          </WidthFullWrapper>
          <RegisterFarmInputField
            form={form}
            name="address"
            label="Adresa"
            placeholder="Adresa"
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Descriere</FormLabel>
                <FormControl>
                  <Textarea
                    id={field.name}
                    placeholder="Descriere"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </WidthFullWrapper>
        <Button className="bg-casal-800 hover:bg-casal-950" type="submit">
          {isPending ? "...Incarcare" : "Creare ferma"}
        </Button>
      </form>
    </Form>
  );
}
