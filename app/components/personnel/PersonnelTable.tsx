"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Personnel } from "@/app/data/personnel";
import {
  ColumnDef,
  flexRender,
  GroupingState,
  ExpandedState,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface PersonnelTableProps {
  table: any; // Using any for simplicity but ideally should be properly typed
  handleRowClick: (person: Personnel) => void;
  getStickyBackground: (isGroupRow: boolean) => string;
  groupTagCellClassName?: string; // New prop for customizing group tag cell class
}

const PersonnelTable: React.FC<PersonnelTableProps> = ({
  table,
  handleRowClick,
  getStickyBackground,
  groupTagCellClassName,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log("scrolled", e.currentTarget.scrollLeft);
    if (e.currentTarget.scrollLeft > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <div className="border-t border-cardBorderColor flex-1">
      <div className="overflow-x-auto w-full h-full" onScroll={handleScroll}>
        <Table className="w-full min-w-[800px] relative">
          {/* Table Column Labels */}
          <TableHeader className="sticky top-0 z-30">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                <TableHead
                  colSpan={2}
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 40,
                    background: "var(--color-cardBackgroundPrimary)",
                  }}
                >
                  {/* Combined header for checkbox and name */}
                  <div className="flex">
                    <div style={{ width: "50px" }}>
                      {flexRender(
                        headerGroup.headers[0].column.columnDef.header,
                        headerGroup.headers[0].getContext()
                      )}
                    </div>
                    <div>
                      {flexRender(
                        headerGroup.headers[1].column.columnDef.header,
                        headerGroup.headers[1].getContext()
                      )}
                    </div>
                  </div>
                </TableHead>
                {headerGroup.headers.slice(3).map((header: any) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows.map((row: any) => {
              // Check if this is a group row
              const isGroupRow = row.getIsGrouped();

              // If it's a group row - keep the existing implementation
              if (isGroupRow) {
                // Get the group value and all columns
                const groupValue = row.getValue("group");
                const allColumns = table.getAllColumns();
                const columnCount = allColumns.length;

                // Check if all rows in this group are selected
                const groupRows = row.subRows;
                const allGroupRowsSelected = groupRows.every((row: any) =>
                  row.getIsSelected()
                );
                const someGroupRowsSelected =
                  groupRows.some((row: any) => row.getIsSelected()) &&
                  !allGroupRowsSelected;

                return (
                  <TableRow
                    key={row.id}
                    className={`${
                      isGroupRow ? "bg-muted font-medium" : "cursor-pointer"
                    }`}
                    onClick={() => row.getToggleExpandedHandler()()}
                  >
                    {/* group header */}
                    <TableCell
                      colSpan={2}
                      className="sticky left-0 z-25"
                      style={{
                        boxShadow: isScrolled
                          ? "1px 0 0 0 var(--color-cardBorderColor)"
                          : "none",
                      }}
                    >
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2 pl-2">
                          <Checkbox
                            checked={
                              allGroupRowsSelected ||
                              (someGroupRowsSelected && "indeterminate")
                            }
                            onCheckedChange={(value) => {
                              // Toggle all rows in this group
                              groupRows.forEach((row: any) => {
                                row.toggleSelected(!!value);
                              });
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            aria-label={`Select all in ${groupValue} group`}
                            className="mr-2"
                          />
                          <div className="font-medium text-sm">
                            {groupValue}
                            <span className="ml-2 text-gray-500 text-xs">
                              {groupRows.length}
                            </span>
                          </div>
                          <button className="">
                            {row.getIsExpanded() ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </TableCell>

                    {/* Dummy cell for the rest of the columns */}
                    <TableCell colSpan={columnCount - 2} className="bg-muted">
                      {/* Empty cell to fill the rest of the row */}
                    </TableCell>
                  </TableRow>
                );
              }

              // Regular row rendering for non-group rows - new implementation
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="cursor-pointer relative group"
                  onClick={() => handleRowClick(row.original)}
                >
                  {/* Combined cell for checkbox + name with sticky positioning */}
                  <TableCell className="sticky left-0 z-50 h-[48px] overflow-visible bg-cardBackgroundPrimary group-hover:bg-gray-50">
                    <div className="flex items-center">
                      {/* Checkbox */}
                      <div
                        className="w-[50px] pl-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {flexRender(
                          row.getVisibleCells()[0].column.columnDef.cell,
                          row.getVisibleCells()[0].getContext()
                        )}
                      </div>
                      {/* Name */}
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            row.original.avatar ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(row.original.name)
                          }
                          alt={`${row.original.name}'s avatar`}
                          className="w-7 h-7 rounded-full object-cover bg-muted"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(row.original.name);
                          }}
                        />
                        <div className="flex flex-col">
                          <div className="text-[13px] font-semibold">
                            {/* Name */}
                            {flexRender(
                              row.getVisibleCells()[1].column.columnDef.cell,
                              row.getVisibleCells()[1].getContext()
                            )}
                          </div>
                          <div className="text-[12px] text-muted-foreground">
                            {/* Role */}
                            {flexRender(
                              row.getVisibleCells()[2].column.columnDef.cell,
                              row.getVisibleCells()[2].getContext()
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Scroll indicator */}
                      {isScrolled && (
                        <div className="w-[6px] bg-gray-500 opacity-5 h-[48px]"></div>
                      )}
                    </div>
                  </TableCell>

                  {/* Render remaining cells */}
                  {row
                    .getVisibleCells()
                    .slice(3)
                    .map((cell: any) => {
                      const isGroupTagCell = cell.column.id === "groupTags";
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            isGroupTagCell && groupTagCellClassName,
                            "z-10"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PersonnelTable;
