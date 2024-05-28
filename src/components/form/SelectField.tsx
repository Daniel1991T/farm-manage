import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptionType } from "@/types";

type SelectFieldProps = {
  option: SelectOptionType[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SelectField({
  option,
  value,
  onChange,
  placeholder,
}: SelectFieldProps) {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-[10px]">
        {placeholder}
      </p>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sex" />
      </SelectTrigger>
      <SelectContent className="w-full">
        {option.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
