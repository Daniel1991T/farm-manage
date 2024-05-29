"use client";
import {
  ColumnDef,
  RowModel,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AArrowDown, FilterX } from "lucide-react";
import { deletedCows } from "@/lib/actions/cow";
import { useServerAction } from "zsa-react";
import { log } from "console";
import { CowSchema } from "@/database/schema";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function CowTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const { isPending, execute: deleteCowsFromDB } = useServerAction(deletedCows);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    image: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selected, setSelected] = useState<RowModel<TData>>();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { columnVisibility, sorting, rowSelection },
  });

  const handleDeleteSelected = async () => {
    const selected = table.getSelectedRowModel();
    const selectedItemId = selected.rows.map((value) => {
      const cowSchema = value.original as CowSchema;
      const registration_number = cowSchema?.registration_number
        ? cowSchema.registration_number
        : ("" as string);
      return registration_number;
    }) as string[];
    console.log(selectedItemId);

    const [_, error] = await deleteCowsFromDB(selectedItemId);
    table.resetRowSelection();
  };

  return (
    <div className="rounded-md border">
      <div className="py-2 ml-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto gap-2">
              Filtreaza coloanele <FilterX className="font-medium stroke-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="px-2">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex-1 w-full text-sm text-muted-foreground items-end">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
        <Button
          onClick={handleDeleteSelected}
          variant="link"
          className="hover:text-red-600"
        >
          Delete All Selected
        </Button>
      </div>
    </div>
  );
}