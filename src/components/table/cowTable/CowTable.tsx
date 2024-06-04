"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  RowModel,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { deletedCows } from "@/lib/actions/cow";
import { useServerAction } from "zsa-react";
import { CowSchema } from "@/database/schema";
import { Input } from "@/components/ui/input";

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
    number_of_authorization: false,
    expiration_authorization: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnVisibility, sorting, rowSelection, columnFilters },
  });

  const handleDeleteSelected = async () => {
    const selected = table.getSelectedRowModel();
    const selectedItemId = selected.rows.map((value) => {
      const cowSchema = value.original as CowSchema;
      const id = cowSchema?.id ? cowSchema.id : ("" as string);
      return id;
    }) as number[];
    console.log(selectedItemId);

    const [_, error] = await deleteCowsFromDB(selectedItemId);
    table.resetRowSelection();
  };

  return (
    <div className="rounded-md border w-full items-start justify-start flex flex-col">
      <div className="py-2 ml-4 flex w-full justify-start items-start gap-4">
        <div className="flex items-center">
          <Input
            placeholder="Filtereaza dupa nume"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center">
          <Input
            placeholder="Filtereaza dupa Crotaliu"
            value={
              (table
                .getColumn("registration_number")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("registration_number")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
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
      <Table className="px-2 w-full">
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
                Nu există animale înregistrate
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
          disabled={
            table.getFilteredSelectedRowModel().rows.length === 0 || isPending
          }
        >
          {!isPending
            ? "Șterge toate randurile selectate"
            : "In progres pentru a sterge toate vacile selectate"}
        </Button>
      </div>
    </div>
  );
}
