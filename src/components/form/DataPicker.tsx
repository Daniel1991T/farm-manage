import { useState } from "react";
import Datepicker, {
  DateValueType,
  DateType,
} from "react-tailwindcss-datepicker";

type DataPickerProps = {
  value: DateType;
  onChange: (newValue: string) => void;
  calculateAgeOnChange: () => void;
  placeholder?: string;
};

export default function DataPicker({
  value,
  onChange,
  calculateAgeOnChange,
  placeholder,
}: DataPickerProps) {
  const [date, setDate] = useState<DateValueType>({
    startDate: value,
    endDate: new Date().setMonth(11) as unknown as DateType,
  });

  const handleValueChange = (newValue: DateValueType) => {
    setDate(newValue);
    onChange(newValue?.startDate?.toLocaleString() || "");
    calculateAgeOnChange();
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {placeholder}
      </p>
      <Datepicker
        displayFormat="DD/MM/YYYY"
        placeholder="DD/MM/YYYY"
        value={date}
        useRange={false}
        onChange={handleValueChange}
        asSingle
      />
    </div>
  );
}
