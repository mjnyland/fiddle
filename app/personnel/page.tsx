"use client";

// 1. Group React imports
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";

// 2. Group project components
import MainLayout from "../components/MainLayout";
import { PersonnelForm, PersonnelFormData } from "../components/forms";
import PersonnelDetailSheet from "../components/personnel/PersonnelDetailSheet";
import PersonnelTable from "../components/personnel/PersonnelTable";
import GroupsTable from "../components/personnel/GroupsTable";
import GroupTagsTable from "../components/personnel/GroupTagsTable";
import PersonnelToolbar from "../components/personnel/PersonnelToolbar";
import GroupsToolbar from "../components/personnel/GroupsToolbar";
import GroupTagsToolbar from "../components/personnel/GroupTagsToolbar";
import TabNavigation from "../components/personnel/TabNavigation";

// 3. Group data imports
import { Personnel, PersonnelRole, personnelData } from "../data/personnel";

// 4. Group UI component imports
import { Checkbox } from "@/components/ui/checkbox";

// 5. Group table-related imports
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  ColumnDef,
  GroupingState,
  ExpandedState,
  PaginationState,
  VisibilityState,
} from "@tanstack/react-table";

// Initialize expanded state with all groups expanded
const getDefaultExpanded = () => {
  const expanded: Record<string, boolean> = {};
  // Create expanded entries for each unique group
  const uniqueGroups = [
    ...new Set(personnelData.map((person) => person.group)),
  ];
  uniqueGroups.forEach((group) => {
    expanded[`group:${group}`] = true;
  });
  return expanded;
};

// Add a helper function to get the proper background color based on the row type
const getStickyBackground = (isGroupRow: boolean) => {
  return isGroupRow
    ? "var(--color-muted)"
    : "var(--color-cardBackgroundPrimary)";
};

export default function PersonnelPage() {
  // Add a mounted ref to track component mounting state
  const isMounted = useRef(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Personnel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPersonnelSheetOpen, setIsPersonnelSheetOpen] = useState(false);
  const [grouping, setGrouping] = useState<GroupingState>(["group"]);
  const [expanded, setExpanded] = useState<ExpandedState>(getDefaultExpanded());
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100, // Set a large page size to show all data
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    group: false, // Hide the group column
  });
  const [activeTab, setActiveTab] = useState("individuals");
  const [selectedGroups, setSelectedGroups] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({});
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<{
    name: string;
    color: string;
    groups: string[];
    description: string;
  } | null>(null);
  const [selectedView, setSelectedView] = useState("table");
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const handleRowClick = useCallback((person: Personnel) => {
    setSelectedPerson(person);
    setIsSheetOpen(true);
  }, []);

  const handleGroupClick = useCallback((group: string) => {
    setSelectedGroup(group);
    setIsSheetOpen(true);
  }, []);

  const handleTagClick = useCallback(
    (tag: {
      name: string;
      color: string;
      groups: string[];
      description: string;
    }) => {
      setSelectedTag(tag);
      setIsSheetOpen(true);
    },
    []
  );

  const columns = useMemo<ColumnDef<Personnel>[]>(
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
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean | "indeterminate") =>
              row.toggleSelected(!!value)
            }
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
        minSize: 50,
        maxSize: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
        minSize: 150,
        maxSize: 300,
        cell: ({ row }) => {
          const person = row.original;
          return (
            <div className="flex gap-1 flex-wrap w-[200px]">{person.name}</div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
      {
        id: "groupTags",
        header: "Group Tags",
        size: 200,
        cell: ({ row }) => {
          // Only show for individual rows
          if (row.getIsGrouped()) return null;

          const person = row.original;
          const tags = person.groupTags || [];

          return (
            <div className="flex gap-1 flex-wrap w-[500px]">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
        cell: ({ row }) => {
          const person = row.original;
          return <div className=" w-[216px]">{person.email}</div>;
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
        cell: ({ row }) => {
          const person = row.original;
          return <div className="w-[216px]">{person.phone}</div>;
        },
      },
      {
        id: "travelProfile",
        header: "Travel Profile",
        size: 150,
        cell: ({ row }) => {
          // Only show for individual rows
          if (row.getIsGrouped()) return null;

          const person = row.original;
          const profile = person.travelProfile || {
            hasPassport: false,
            hasTravelArrangements: false,
            hasEmergencyContact: false,
            hasFoodRestrictions: false,
          };

          return (
            <div className="flex gap-1.5 w-[240px]">
              <span
                className={`text-${profile.hasPassport ? "green" : "gray"}-500`}
                title="Passport"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a3 3 0 015.25-2.025.75.75 0 01.75 1.3A1.5 1.5 0 009 5.5v2h.25a.75.75 0 110 1.5H9v1h.25a.75.75 0 110 1.5H9v1h.25a.75.75 0 110 1.5H9v1.5h2.25a.75.75 0 110 1.5h-4.5a.75.75 0 110-1.5H9V13h-.25a.75.75 0 110-1.5H9v-1h-.25a.75.75 0 110-1.5H9v-1h-.25a.75.75 0 110-1.5H9v-2A1.5 1.5 0 007.5 5c-.818 0-1.5.672-1.5 1.5v7A1.5 1.5 0 007.5 15h5a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0012.5 5c-.818 0-1.5.672-1.5 1.5v2h.25a.75.75 0 110 1.5H11v1h.25a.75.75 0 110 1.5H11v1h.25a.75.75 0 110 1.5H11v1.5h2.25a.75.75 0 110 1.5h-9.5a.75.75 0 110-1.5H6V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span
                className={`text-${
                  profile.hasTravelArrangements ? "green" : "gray"
                }-500`}
                title="Travel Arrangements"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </span>
              <span
                className={`text-${
                  profile.hasEmergencyContact ? "green" : "gray"
                }-500`}
                title="Emergency Contact"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </span>
              <span
                className={`text-${
                  profile.hasFoodRestrictions ? "green" : "gray"
                }-500`}
                title="Food Restrictions"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                </svg>
              </span>
            </div>
          );
        },
      },
      {
        id: "permissions",
        header: "Permissions",
        size: 120,
        cell: ({ row }) => {
          // Only show for individual rows
          if (row.getIsGrouped()) return null;

          const person = row.original;
          const permissionLevel = person.permissions || "Viewer";

          return (
            <div className="w-[160px]">
              <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium w-[160px]">
                {permissionLevel}
              </span>
            </div>
          );
        },
      },
      {
        id: "visibility",
        header: "Visibility",
        size: 120,
        cell: ({ row }) => {
          // Only show for individual rows
          if (row.getIsGrouped()) return null;

          const person = row.original;
          const isVisible =
            person.visibility !== undefined ? person.visibility : true;

          return (
            <div className="w-[160px]">
              <span
                className={`px-2 py-1 rounded-full ${
                  isVisible
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                } text-xs font-medium`}
              >
                {isVisible ? "Visible" : "Hidden"}
              </span>
            </div>
          );
        },
      },
      {
        id: "addPersonnel",
        header: "Add Personnel",
        cell: ({ row }) => {
          // Only show for individual rows
          if (row.getIsGrouped()) return null;

          const person = row.original;
          const canAddPersonnel =
            person.canAddPersonnel !== undefined
              ? person.canAddPersonnel
              : false;

          return (
            <div className="w-[120px]">
              <span
                className={`px-2 py-1 rounded-full ${
                  canAddPersonnel
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                } text-xs font-medium`}
              >
                {canAddPersonnel ? "Yes" : "No"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 200,
        cell: ({ row }) => {
          const person = row.original;
          return <div className="w-[200px]">{person.location}</div>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <div className="w-[120px]">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  status === "Active"
                    ? "bg-green-100 text-green-800"
                    : status === "On Leave"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {status}
              </span>
            </div>
          );
        },
      },
      // Hidden column for grouping
      {
        accessorKey: "group",
        header: "Group",
        enableHiding: true,
        size: 0,
      },
    ],
    []
  );

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return personnelData.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      grouping,
      expanded,
      pagination,
      rowSelection,
      columnVisibility,
    },
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    autoResetPageIndex: false,
    debugTable: true,
  });

  // Handle side effects for filtering and grouping changes
  useEffect(() => {
    if (isMounted.current) {
      table.resetPageIndex();
    }
  }, [searchTerm, grouping, table]);

  // Keep all groups expanded at all times
  useEffect(() => {
    const rowModel = table.getRowModel();
    const groupRows = rowModel.rows.filter((row) => row.getIsGrouped());

    if (groupRows.length) {
      setExpanded(Object.fromEntries(groupRows.map((row) => [row.id, true])));
    }
  }, [table, filteredData]);

  // Set mounted ref to true after initial render
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setTimeout(() => {
        if (!open) {
          setSelectedPerson(null);
          setSelectedGroup(null);
          setSelectedTag(null);
        }
      }, 300);
    }
  };

  const handlePersonnelSheetOpenChange = (open: boolean) => {
    setIsPersonnelSheetOpen(open);
  };

  const handleAddPerson = (data: PersonnelFormData) => {
    console.log("New personnel data:", data);

    const newPerson: Personnel = {
      id: `${Date.now()}`,
      name: data.name,
      role: data.role as PersonnelRole,
      email: data.email,
      phone: data.phone,
      location: data.location,
      status: data.status,
      notes: data.notes,
      emergencyContact: data.emergencyContact,
      group: data.group,
      groupTags: data.groupTags || [],
      travelProfile: data.travelProfile || {
        hasPassport: false,
        hasTravelArrangements: false,
        hasEmergencyContact: !!data.emergencyContact,
        hasFoodRestrictions: false,
      },
      permissions: data.permissions || "Viewer",
      visibility: data.visibility !== undefined ? data.visibility : true,
      canAddPersonnel: data.canAddPersonnel || false,
    };

    console.log("New personnel created:", newPerson);
    setIsPersonnelSheetOpen(false);
  };

  // Render the main page with appropriate content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "individuals":
        return (
          <div className="space-y-4 mt-0">
            <PersonnelToolbar
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              rowSelection={rowSelection}
              setIsPersonnelSheetOpen={setIsPersonnelSheetOpen}
            />
            <PersonnelTable
              table={table}
              handleRowClick={handleRowClick}
              getStickyBackground={getStickyBackground}
            />
          </div>
        );
      case "groups":
        return (
          <div className="space-y-4 mt-0">
            <GroupsToolbar selectedGroups={selectedGroups} />
            <GroupsTable
              groups={["West Coast", "East Coast", "Midwest", "South"]}
              selectedGroups={selectedGroups}
              setSelectedGroups={setSelectedGroups}
              handleGroupClick={handleGroupClick}
              personnelData={personnelData}
            />
          </div>
        );
      case "group-tags":
        return (
          <div className="space-y-4 mt-0">
            <GroupTagsToolbar selectedTags={selectedTags} />
            <GroupTagsTable
              tags={[
                {
                  name: "Tour",
                  color: "blue",
                  groups: ["West Coast", "East Coast", "Midwest", "South"],
                  description: "Primary tour related groups",
                },
                {
                  name: "2023",
                  color: "green",
                  groups: ["West Coast", "East Coast"],
                  description: "2023 tour season groups",
                },
                {
                  name: "VIP",
                  color: "purple",
                  groups: ["West Coast"],
                  description: "Groups with VIP access",
                },
                {
                  name: "Production",
                  color: "orange",
                  groups: ["Midwest", "South"],
                  description: "Production focused groups",
                },
              ]}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              handleTagClick={handleTagClick}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="pt-6 h-full flex flex-col">
        <div className="px-6 flex items-center mb-6">
          <h1 className="text-2xl font-semibold">Personnel</h1>
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              { id: "individuals", label: "Individuals" },
              { id: "groups", label: "Groups" },
              { id: "group-tags", label: "Group Tags" },
            ]}
          />
        </div>

        <div className="w-full" onScroll={(e) => console.log("scrolled", e)}>
          {renderTabContent()}
        </div>
      </div>

      <PersonnelDetailSheet
        open={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
        selectedPerson={selectedPerson}
        selectedGroup={selectedGroup}
        selectedTag={selectedTag}
      />

      <PersonnelForm
        open={isPersonnelSheetOpen}
        onOpenChange={handlePersonnelSheetOpenChange}
        onSubmit={handleAddPerson}
      />
    </MainLayout>
  );
}
