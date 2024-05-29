"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CowSchema } from "@/database/schema";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columnsCowTable: ColumnDef<CowSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "registration_number",
    header: ({ column }) => {
      return <HeaderColumn column={column} label="Nr. Crotaliu" />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <HeaderColumn label="Nume" column={column} />;
    },
  },
  {
    accessorKey: "breed",
    header: ({ column }) => {
      return <HeaderColumn label="Rasa" column={column} />;
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return <HeaderColumn label="Sex" column={column} />;
    },
  },
  {
    accessorKey: "birth_date",
    header: ({ column }) => {
      return <HeaderColumn label="Data Nasterii" column={column} />;
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => {
      return <HeaderColumn label="Greutate" column={column} />;
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return <HeaderColumn label="Varsta" column={column} />;
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return <HeaderColumn label="Culoare" column={column} />;
    },
  },
  {
    accessorKey: "registration_number_father",
    header: ({ column }) => {
      return <HeaderColumn label="Nr. Crotaliu Tata" column={column} />;
    },
  },
  {
    accessorKey: "registration_number_mother",
    header: ({ column }) => {
      return <HeaderColumn label="Nr. Crotaliu Mama" column={column} />;
    },
  },
  {
    accessorKey: "number_of_authorization",
    header: ({ column }) => {
      return <HeaderColumn label="Nr. Autorizatie Taur" column={column} />;
    },
  },
  {
    accessorKey: "expiration_authorization",
    header: ({ column }) => {
      return (
        <HeaderColumn label="Data Expirarii autorizatiei" column={column} />
      );
    },
  },
  {
    accessorKey: "entry_date",
    header: ({ column }) => {
      return <HeaderColumn label="Data de intrare" column={column} />;
    },
  },
  {
    accessorKey: "health_condition",
    header: ({ column }) => {
      return <HeaderColumn label="Starea de sanatate" column={column} />;
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <HeaderColumn label="Fotografie" column={column} />;
    },
  },
];

type HeaderColumnProps = {
  label: string;
  column: Column<CowSchema>;
};

function HeaderColumn({ label, column }: HeaderColumnProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
