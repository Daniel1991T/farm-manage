"use client";

import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Search } from "lucide-react";
import {
  AddNewAnimalNameField,
  AddNewAnimalType,
  AnimalGender,
} from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { getMatchingCows } from "@/lib/actions/cow";

type SelectSearchFormFieldProps = {
  form: UseFormReturn<AddNewAnimalType, any, undefined>;
  name: AddNewAnimalNameField;
  label: string;
  typeSelect: AnimalGender;
};

export function SearchSelectFormField({
  form,
  name,
  label,
  typeSelect,
}: SelectSearchFormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>(form.getValues(name) || "");
  const [items, setItems] = useState<{ registration_number: string }[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length > 0) {
        const response = await getMatchingCows({
          registration_number: search,
          sex: typeSelect,
        });
        if (response[0]) {
          setItems(response[0] as { registration_number: string }[]);
        }
      } else {
        setItems([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, typeSelect]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    setIsOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full gap-[2px] mt-2 relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              ref={searchContainerRef}
              className="flex items-center justify-center w-full relative"
            >
              <Input
                {...field}
                ref={inputRef}
                role="combobox"
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (!isOpen) setIsOpen(true);
                  if (e.target.value === "" && isOpen) setIsOpen(false);
                }}
                value={search}
                aria-autocomplete="none"
                className={cn(
                  "w-full justify-between pl-10",
                  !field.value && "text-muted-foreground"
                )}
                placeholder={label}
              />
              <Search className="left-2 h-4 w-4 shrink-0 opacity-50 absolute" />
            </div>
          </FormControl>
          {isOpen && (
            <div tabIndex={-1} className="w-[200px] p-0 absolute bottom-20">
              {items.length > 0
                ? items.map(({ registration_number }) => (
                    <Button
                      variant="outline"
                      autoFocus={false}
                      tabIndex={-1}
                      className="outline-none w-full"
                      onClick={(e) => {
                        field.onChange(registration_number);
                        setSearch(registration_number);
                        setIsOpen(false);
                      }}
                      key={registration_number}
                    >
                      {registration_number}
                    </Button>
                  ))
                : null}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
