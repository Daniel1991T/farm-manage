import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { AddNewAnimalNameField, AddNewAnimalType } from "@/lib/validation";

type AddNewFormFieldProps = {
  form: UseFormReturn<AddNewAnimalType, any, undefined>;
  name: AddNewAnimalNameField;
  label: string;
  placeholder?: string;
};

export default function AddNewFormField({
  form,
  name,
  label,
  placeholder,
}: AddNewFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
