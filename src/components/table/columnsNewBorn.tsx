"use client";

import AddNewAnimalForm from "@/components/form/AddNewAnimalForm";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewBornTableSchema } from "@/database/schema";
import { deletedCows } from "@/lib/actions/cow";
import { AddNewAnimalType } from "@/lib/validation";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import AnimalForm from "../form/AnimalForm";
import { deleteNewBorn, updateNewBorn } from "@/lib/actions/newBorn";

export const columnsNewBorn: ColumnDef<NewBornTableSchema>[] = [
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
    accessorKey: "edit-delete",
    header: () => <p></p>,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2 p-0">
            <Modal
              triggerClassName="border-0 hover:bg-green-600 hover:text-white hover:ring-0 focus:ring-0 w-full text-green-600 rounded"
              triggerTitle="Editare"
              icon={<Edit className="size-4" />}
            >
              <AnimalForm
                updateFn={updateNewBorn}
                type="update"
                id={row.original.mainTableId!!}
                defaultValues={row.original as AddNewAnimalType}
              />
            </Modal>

            <DropdownMenuItem className="outline-none">
              <Button
                className="gap-2 text-red-600 w-full hover:bg-red-600 hover:text-white hover:ring-0 focus:ring-0"
                onClick={() => {
                  deleteNewBorn([row.original.id!!]);
                }}
                variant="ghost"
              >
                <Trash className="size-4 " />
                Stergere
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
  column: Column<NewBornTableSchema>;
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
