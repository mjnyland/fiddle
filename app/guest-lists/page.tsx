"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import MainLayout from "../components/MainLayout";
import {
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from "../components/buttons";
import {
  Plus,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  X,
  ChevronDown,
  ChevronRight,
  Users,
  Ticket,
  Filter,
  Search,
  LayoutGrid,
  ChevronsUpDown,
  Download,
  CheckIcon,
  ClockIcon,
  XIcon,
  Check,
  Calendar,
  List,
  Settings,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  GroupingState,
  ExpandedState,
  getPaginationRowModel,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Sample guest list data
interface GuestPass {
  type: "Aftershow" | "Photo" | "VIP" | "AA";
  count: number;
}

interface Guest {
  id: string;
  name: string;
  contactPerson?: string;
  status: "Pending" | "Approved" | "Declined";
  tickets: number;
  passes: GuestPass[];
  note?: string;
  pickupLocation: string;
  venue: string;
  date: string;
  location: string;
}

// Generate sample guest data
const guestListData: Guest[] = [
  {
    id: "1",
    name: "Michael Thompson",
    contactPerson: "Omar Apollo",
    status: "Pending",
    tickets: 12,
    passes: [
      { type: "AA", count: 1 },
      { type: "Aftershow", count: 1 },
      { type: "Photo", count: 1 },
      { type: "VIP", count: 1 },
    ],
    note: "Needs access to the aftershow lounge and a photo pass.",
    pickupLocation: "Will Call",
    venue: "Kia Forum",
    date: "Dec. 21",
    location: "San Benandinho, CA",
  },
  {
    id: "2",
    name: "Omar Apollo",
    contactPerson: "Aaron Thomas",
    status: "Pending",
    tickets: 2,
    passes: [
      { type: "AA", count: 1 },
      { type: "Aftershow", count: 1 },
      { type: "Photo", count: 1 },
      { type: "VIP", count: 1 },
    ],
    note: "Traveling with the artist's management team. Please grant VIP and media access.",
    pickupLocation: "Will Call",
    venue: "Kia Forum",
    date: "Dec. 21",
    location: "San Benandinho, CA",
  },
  {
    id: "3",
    name: "Kevin O'Reilly",
    contactPerson: "Aaron Thomas",
    status: "Pending",
    tickets: 2,
    passes: [
      { type: "AA", count: 1 },
      { type: "Aftershow", count: 1 },
      { type: "Photo", count: 1 },
      { type: "VIP", count: 1 },
    ],
    note: "No Note",
    pickupLocation: "Will Call",
    venue: "Kia Forum",
    date: "Dec. 21",
    location: "San Benandinho, CA",
  },
  {
    id: "4",
    name: "Harrison Wells",
    contactPerson: "Emma Carter",
    status: "Approved",
    tickets: 2,
    passes: [
      { type: "AA", count: 1 },
      { type: "Aftershow", count: 1 },
      { type: "Photo", count: 1 },
      { type: "VIP", count: 1 },
    ],
    note: "No Note",
    pickupLocation: "Will Call",
    venue: "Kia Forum",
    date: "Dec. 21",
    location: "San Benandinho, CA",
  },
];

// Initialize expanded state with all venues expanded
const getDefaultExpanded = () => {
  const expanded: Record<string, boolean> = {};
  // Create expanded entries for each unique venue
  const uniqueVenues = [...new Set(guestListData.map((guest) => guest.venue))];
  uniqueVenues.forEach((venue) => {
    expanded[`venue:${venue}`] = true;
  });
  return expanded;
};

// Helper function to get the proper background color based on the row type
const getStickyBackground = (isGroupRow: boolean) => {
  return isGroupRow
    ? "var(--color-muted)"
    : "var(--color-cardBackgroundPrimary)";
};

// Format options for rendering passes
const formatPasses = (passes: GuestPass[] | undefined) => {
  if (!passes || !Array.isArray(passes)) {
    return [];
  }

  return passes.map((pass) => ({
    type: pass.type,
    count: pass.count,
    element: (
      <div key={pass.type} className="whitespace-nowrap">
        {pass.count} {pass.type}
      </div>
    ),
  }));
};

export default function GuestListsPage() {
  // Add a mounted ref to track component mounting state
  const isMounted = useRef(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [grouping, setGrouping] = useState<GroupingState>(["venue"]);
  const [expanded, setExpanded] = useState<ExpandedState>(getDefaultExpanded());
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100, // Set a large page size to show all data
  });
  // Add state for row selection
  const [rowSelection, setRowSelection] = useState({});
  // Add state for column visibility
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    venue: false, // Hide the venue column
    date: false, // Hide the date column
    location: false, // Hide the location column
  });

  const [data, setData] = useState<Guest[]>(() => [...guestListData]);

  // Add state for view and filter options
  const [viewMode, setViewMode] = useState("table");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  // Make sure expansion state remains consistent
  useEffect(() => {
    // Set to default expanded state whenever grouping or data changes
    setExpanded(getDefaultExpanded());
  }, [grouping, data]);

  // Make sure component is mounted
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleRowClick = useCallback(
    (guest: Guest, event: React.MouseEvent) => {
      // If the click originated from a dropdown or checkbox, don't open the sheet
      const target = event.target as HTMLElement;
      const isFromDropdown = target.closest('[data-no-row-click="true"]');

      if (isFromDropdown) {
        return;
      }

      setSelectedGuest(guest);
      setIsSheetOpen(true);
    },
    []
  );

  // Add function to handle status change
  const handleStatusChange = (
    id: string,
    newStatus: "Pending" | "Approved" | "Declined"
  ) => {
    setData((prevData) =>
      prevData.map((guest) =>
        guest.id === id ? { ...guest, status: newStatus } : guest
      )
    );
  };

  // Define columns for the guest list table
  const columns = useMemo<ColumnDef<Guest>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value: boolean | "indeterminate") =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <div data-no-row-click="true">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value: boolean | "indeterminate") =>
                row.toggleSelected(!!value)
              }
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
        minSize: 40,
        maxSize: 40,
      },
      {
        accessorKey: "name",
        header: "Guest Details",
        size: 250,
        minSize: 200,
        maxSize: 300,
        cell: (info) => {
          const guest = info.row.original;
          return (
            <div>
              <div className="font-medium">{guest.name}</div>
              {guest.contactPerson && (
                <div className="text-xs text-gray-500 mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-1">
                    {guest.contactPerson}
                  </span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "tickets",
        header: "Tickets",
        size: 80,
        cell: (info) => (
          <div className="flex items-center gap-1">
            <span>{info.getValue() as number}</span>
            <Ticket size={12} className="text-gray-400" />
          </div>
        ),
      },
      {
        accessorKey: "passes",
        header: "Passes",
        size: 250,
        cell: (info) => {
          const passes = info.getValue() as GuestPass[] | undefined;
          return (
            <div className="flex gap-3">
              {formatPasses(passes).map((pass) => (
                <div
                  key={pass.type}
                  className="flex items-center whitespace-nowrap"
                >
                  <span className="mr-1">{pass.count}</span>
                  <span>{pass.type}</span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "note",
        header: "Note",
        size: 300,
        minSize: 200,
        maxSize: 400,
      },
      {
        accessorKey: "pickupLocation",
        header: "Pickup Location",
        size: 150,
        minSize: 100,
        maxSize: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        cell: (info) => {
          const status = info.getValue() as string;
          const guestId = info.row.original.id;

          // Define color based on status
          const getStatusColor = (status: string) => {
            switch (status) {
              case "Approved":
                return "bg-green-500";
              case "Pending":
                return "bg-yellow-500";
              case "Declined":
                return "bg-red-500";
              default:
                return "bg-gray-500";
            }
          };

          // Define icon based on status
          const getStatusIcon = (status: string) => {
            switch (status) {
              case "Approved":
                return <CheckIcon className="h-3 w-3 text-green-500" />;
              case "Pending":
                return <ClockIcon className="h-3 w-3 text-yellow-500" />;
              case "Declined":
                return <XIcon className="h-3 w-3 text-red-500" />;
              default:
                return null;
            }
          };

          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                data-no-row-click="true"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      status
                    )} mr-2`}
                  ></div>
                  <span>{status}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(guestId, "Approved");
                  }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="mr-2">Approved</span>
                  {status === "Approved" && (
                    <CheckIcon className="h-4 w-4 ml-2" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(guestId, "Pending");
                  }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="mr-2">Pending</span>
                  {status === "Pending" && (
                    <CheckIcon className="h-4 w-4 ml-2" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(guestId, "Declined");
                  }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="mr-2">Declined</span>
                  {status === "Declined" && (
                    <CheckIcon className="h-4 w-4 ml-2" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
      // Hidden columns for grouping
      {
        accessorKey: "venue",
        header: "Venue",
        enableHiding: true,
        size: 0,
      },
      {
        accessorKey: "date",
        header: "Date",
        enableHiding: true,
        size: 0,
      },
      {
        accessorKey: "location",
        header: "Location",
        enableHiding: true,
        size: 0,
      },
    ],
    []
  );

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return data.filter(
      (guest) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (guest.note &&
          guest.note.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    getSubRows: (row) => undefined,
    state: {
      grouping,
      columnVisibility,
      expanded,
      pagination,
      rowSelection,
    },
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualGrouping: false,
    manualPagination: false,
    onGroupingChange: setGrouping,
    // Disable automatic page resets
    autoResetPageIndex: false,
    debugTable: true,
  });

  // Handle side effects for filtering and grouping changes
  useEffect(() => {
    // Only run after the component has mounted
    if (isMounted.current) {
      // Reset pagination when filters or grouping changes
      // This is done in useEffect to avoid state updates during render
      table.resetPageIndex();
    }
  }, [searchTerm, grouping, table]);

  // Keep all groups expanded at all times
  useEffect(() => {
    // Auto-expand all group rows when table data or grouping changes
    const rowModel = table.getRowModel();
    const groupRows = rowModel.rows.filter((row) => row.getIsGrouped());

    if (groupRows.length) {
      setExpanded(Object.fromEntries(groupRows.map((row) => [row.id, true])));
    }
  }, [table, filteredData]);

  // Function to handle sheet close
  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      // Clear selection after the animation completes
      setTimeout(() => {
        // Only clear if still unmounted to avoid race conditions
        if (!isSheetOpen) {
          setSelectedGuest(null);
        }
      }, 300); // Match the animation duration from the sheet component
    }
  };

  return (
    <MainLayout>
      <div className="pt-6 h-full flex flex-col">
        <div className="px-6 flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Guest Lists</h1>
        </div>

        <div className="px-6 mb-4">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search guests"
                  className="w-64 pl-9 pr-10 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="text-xs text-gray-400 bg-gray-100 rounded px-1 py-0.5">
                    ⌘
                  </span>
                  <span className="ml-1 text-xs text-gray-400">+</span>
                  <span className="ml-1 text-xs text-gray-400">S</span>
                </div>
              </div>

              {/* View dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 border border-cardBorderColor rounded-md px-3 py-2 text-sm">
                    <LayoutGrid className="h-4 w-4" />
                    <span>View</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[180px]">
                  <DropdownMenuItem
                    onClick={() => setViewMode("table")}
                    className="flex items-center"
                  >
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    <span>Table View</span>
                    {viewMode === "table" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setViewMode("list")}
                    className="flex items-center"
                  >
                    <List className="h-4 w-4 mr-2" />
                    <span>List View</span>
                    {viewMode === "list" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setViewMode("calendar")}
                    className="flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Calendar View</span>
                    {viewMode === "calendar" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Customize View</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Filter dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 border border-cardBorderColor rounded-md px-3 py-2 text-sm">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                    {filterOptions.length > 0 && (
                      <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-1.5">
                        {filterOptions.length}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[220px]">
                  <div className="px-2 py-1.5 text-sm font-medium">Status</div>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Approved")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Approved"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Approved")
                        );
                      }
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    Approved
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Pending")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Pending"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Pending")
                        );
                      }
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Declined")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Declined"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Declined")
                        );
                      }
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    Declined
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />

                  <div className="px-2 py-1.5 text-sm font-medium">
                    Pass Type
                  </div>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("VIP")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "VIP"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "VIP")
                        );
                      }
                    }}
                  >
                    VIP
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Aftershow")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Aftershow"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Aftershow")
                        );
                      }
                    }}
                  >
                    Aftershow
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Photo")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Photo"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Photo")
                        );
                      }
                    }}
                  >
                    Photo
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("AA")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "AA"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "AA")
                        );
                      }
                    }}
                  >
                    AA
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm font-medium"
                      onClick={() => setFilterOptions([])}
                    >
                      Reset Filters
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Replace Add Guest button with Bulk Action buttons when rows are selected */}
            {Object.keys(rowSelection).length > 0 ? (
              <div className="flex items-center gap-2">
                <SecondaryButton leadingIcon={<Mail size={16} />}>
                  Email ({Object.keys(rowSelection).length})
                </SecondaryButton>
                <SecondaryButton leadingIcon={<Edit size={16} />}>
                  Edit ({Object.keys(rowSelection).length})
                </SecondaryButton>
                <DestructiveButton leadingIcon={<Trash2 size={16} />}>
                  Remove ({Object.keys(rowSelection).length})
                </DestructiveButton>
              </div>
            ) : (
              <PrimaryButton leadingIcon={<Plus size={16} />}>
                New Guest
              </PrimaryButton>
            )}
          </div>

          <div className="bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg overflow-hidden">
            <div className="overflow-x-auto w-full">
              <Table className="w-full min-w-[800px] border-collapse">
                <TableHeader className="sticky top-0 z-10 bg-cardBackgroundPrimary">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          style={{
                            width: header.getSize(),
                            ...(header.id === "select" && {
                              position: "sticky",
                              left: 0,
                              zIndex: 30,
                              background: "var(--color-cardBackgroundPrimary)",
                              boxShadow:
                                "1px 0 0 0 var(--color-cardBorderColor)",
                            }),
                            ...(header.id.includes("name") && {
                              position: "sticky",
                              left: 40, // Width of the checkbox column
                              zIndex: 20,
                              background: "var(--color-cardBackgroundPrimary)",
                              boxShadow:
                                "1px 0 0 0 var(--color-cardBorderColor)",
                            }),
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
                <TableBody className="border-t border-cardBorderColor">
                  {table.getRowModel().rows.map((row) => {
                    const isGroupRow = row.getIsGrouped();

                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={`${
                          isGroupRow
                            ? "bg-muted/50 dark:bg-muted/20"
                            : "cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/20"
                        }`}
                        onClick={(event) => {
                          if (isGroupRow) {
                            row.getToggleExpandedHandler()();
                          } else {
                            handleRowClick(row.original, event);
                          }
                        }}
                      >
                        {row.getVisibleCells().map((cell) => {
                          // Special handling for group rows - show the venue name in the first cell
                          if (isGroupRow && cell.column.id === "select") {
                            // Check if all rows in this group are selected
                            const groupRows = row.subRows;
                            const allGroupRowsSelected = groupRows.every(
                              (row) => row.getIsSelected()
                            );
                            const someGroupRowsSelected =
                              groupRows.some((row) => row.getIsSelected()) &&
                              !allGroupRowsSelected;

                            // Get the venue and date info
                            const venue = row.getValue("venue") as string;
                            const date = row.getValue("date") as string;
                            const location = row.getValue("location") as string;

                            // Calculate total allotment
                            const totalTickets = groupRows.reduce(
                              (sum, row) => sum + (row.original.tickets || 0),
                              0
                            );
                            const allotment = 100; // Example max allotment per venue

                            return (
                              <TableCell
                                key={cell.id}
                                colSpan={columns.length}
                                style={{
                                  position: "sticky",
                                  left: 0,
                                  zIndex: 10,
                                  background: "var(--color-muted)",
                                  boxShadow:
                                    "1px 0 0 0 var(--color-cardBorderColor)",
                                }}
                              >
                                <div className="flex items-center gap-2 justify-between">
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={
                                        allGroupRowsSelected ||
                                        (someGroupRowsSelected &&
                                          "indeterminate")
                                      }
                                      onCheckedChange={(value) => {
                                        // Toggle all rows in this group
                                        groupRows.forEach((row) => {
                                          row.toggleSelected(!!value);
                                        });
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      aria-label={`Select all in ${venue} group`}
                                      className="mr-2"
                                    />
                                    <div>
                                      <div className="font-medium">{venue}</div>
                                      <div className="text-xs text-gray-500">
                                        {date} • {location}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="text-sm mr-4">
                                      {totalTickets}{" "}
                                      <span className="text-gray-500">
                                        / {allotment}
                                      </span>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        row.getToggleExpandedHandler()();
                                      }}
                                      className="p-1 ml-2"
                                    >
                                      {row.getIsExpanded() ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </TableCell>
                            );
                          }

                          // For group rows, don't render other cells since they're covered by the colSpan
                          if (isGroupRow) {
                            return null;
                          }

                          // For non-group rows, render cells as normal
                          // For the checkbox column, we need to prevent the row click and make it sticky
                          if (cell.column.id === "select") {
                            return (
                              <TableCell
                                key={cell.id}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: "sticky",
                                  left: 0,
                                  zIndex: 10,
                                  background: getStickyBackground(isGroupRow),
                                  boxShadow:
                                    "1px 0 0 0 var(--color-cardBorderColor)",
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            );
                          }

                          // For the name column, make it sticky
                          if (cell.column.id === "name") {
                            return (
                              <TableCell
                                key={cell.id}
                                style={{
                                  position: "sticky",
                                  left: 40, // Width of the checkbox column
                                  zIndex: 9,
                                  background: getStickyBackground(isGroupRow),
                                  boxShadow:
                                    "1px 0 0 0 var(--color-cardBorderColor)",
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            );
                          }

                          return (
                            <TableCell key={cell.id}>
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
        </div>
      </div>

      {/* Guest Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent className="sm:max-w-md" forceMount>
          <SheetHeader className="pb-6">
            <div className="flex justify-between items-center">
              <SheetTitle>Guest Details</SheetTitle>
              <SheetClose className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <X size={18} />
              </SheetClose>
            </div>
          </SheetHeader>

          {selectedGuest && (
            <div className="space-y-6">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-2xl font-semibold">{selectedGuest.name}</h3>
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedGuest.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : selectedGuest.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedGuest.status}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {selectedGuest.venue}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedGuest.contactPerson && (
                  <div className="flex items-center">
                    <Users size={18} className="text-gray-500 mr-2" />
                    <span>Contact: {selectedGuest.contactPerson}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Ticket size={18} className="text-gray-500 mr-2" />
                  <span>{selectedGuest.tickets} Tickets</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">Passes</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedGuest.passes.map((pass) => (
                      <span
                        key={pass.type}
                        className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {pass.count} {pass.type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedGuest.note && selectedGuest.note !== "No Note" && (
                <div className="space-y-2">
                  <h4 className="font-medium">Notes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedGuest.note}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Pickup Details</h4>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{selectedGuest.pickupLocation}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedGuest.venue}, {selectedGuest.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedGuest.date}
                  </p>
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="flex justify-between mt-6 gap-2">
            <SecondaryButton leadingIcon={<Edit size={16} />}>
              Edit
            </SecondaryButton>
            <DestructiveButton leadingIcon={<Trash2 size={16} />}>
              Delete
            </DestructiveButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
