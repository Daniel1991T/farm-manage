import { useState } from "react";
import Datepicker, {
  DateValueType,
  DateType,
} from "react-tailwindcss-datepicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { AddNewAnimalNameField, AddNewAnimalType } from "@/lib/validation";

type DataPickerProps = {
  value: DateType;
  onChange: (newValue: string) => void;
  calculateAgeOnChange?: () => void;
  form: UseFormReturn<AddNewAnimalType, any, undefined>;
  name: AddNewAnimalNameField;
  label: string;
};

export default function DataPickerFromField({
  value,
  onChange,
  calculateAgeOnChange,
  form,
  name,
  label,
}: DataPickerProps) {
  const [date, setDate] = useState<DateValueType>({
    startDate: value,
    endDate: new Date().getTime() as unknown as DateType,
  });

  const handleValueChange = (newValue: DateValueType) => {
    setDate(newValue);
    onChange(newValue?.startDate?.toLocaleString() || "");
    calculateAgeOnChange && calculateAgeOnChange();
  };

  return (
    <div className="flex flex-col w-full">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <FormControl>
              <Datepicker
                displayFormat="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                maxDate={new Date()}
                containerClassName="border border-gray-300 rounded-md relative"
                value={date}
                useRange={false}
                onChange={handleValueChange}
                asSingle
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
