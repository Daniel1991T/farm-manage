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
  disabled?: boolean;
};

export default function AddNewFormField({
  form,
  name,
  label,
  placeholder,
  disabled,
}: AddNewFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              id={field.name}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
