import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { AddFarmType, FarmNameField } from "@/lib/validation";

type RegisterFieldProps = {
  form: UseFormReturn<AddFarmType, any, undefined>;
  name: FarmNameField;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function RegisterFarmInputField({
  form,
  name,
  label,
  placeholder,
  disabled,
}: RegisterFieldProps) {
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
