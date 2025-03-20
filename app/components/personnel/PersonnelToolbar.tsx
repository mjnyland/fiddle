"use client";

import React from "react";
import {
  Activity,
  Calendar,
  ChevronDown,
  Columns,
  Edit,
  Filter,
  Grid,
  List,
  Mail,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from "@/app/components/buttons";

interface PersonnelToolbarProps {
  selectedView: string;
  setSelectedView: (view: string) => void;
  selectedFilter: string[];
  setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  rowSelection: Record<string, boolean>;
  setIsPersonnelSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonnelToolbar: React.FC<PersonnelToolbarProps> = ({
  selectedView,
  setSelectedView,
  selectedFilter,
  setSelectedFilter,
  searchTerm,
  setSearchTerm,
  rowSelection,
  setIsPersonnelSheetOpen,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 px-6">
      <div className="flex space-x-2 items-center">
        {/* View as dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center border border-cardBorderColor rounded-md px-3 py-2 bg-white dark:bg-gray-800">
              <span className="text-gray-500 mr-2">
                {selectedView === "table" ? (
                  <List size={16} />
                ) : selectedView === "grid" ? (
                  <Grid size={16} />
                ) : selectedView === "calendar" ? (
                  <Calendar size={16} />
                ) : (
                  <List size={16} />
                )}
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                View as:{" "}
                {selectedView === "table"
                  ? "Table"
                  : selectedView === "grid"
                  ? "Grid"
                  : selectedView === "calendar"
                  ? "Calendar"
                  : "Table"}
              </span>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[180px]">
            <DropdownMenuItem
              onClick={() => setSelectedView("table")}
              className="flex items-center"
            >
              <List size={16} className="mr-2" />
              <span>Table View</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedView("grid")}
              className="flex items-center"
            >
              <Grid size={16} className="mr-2" />
              <span>Grid View</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedView("calendar")}
              className="flex items-center"
            >
              <Calendar size={16} className="mr-2" />
              <span>Calendar View</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setSelectedView("columns")}
              className="flex items-center"
            >
              <Columns size={16} className="mr-2" />
              <span>Customize Columns</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center border border-cardBorderColor rounded-md px-3 py-2 bg-white dark:bg-gray-800">
              <span className="text-gray-500 mr-2">
                <Filter size={16} />
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Filter
              </span>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
              {selectedFilter.length > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium rounded-full px-1.5">
                  {selectedFilter.length}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px]">
            <div className="px-2 py-1.5 text-sm font-medium">Status</div>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Active")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Active"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "Active")
                  );
                }
              }}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("On Leave")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "On Leave"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "On Leave")
                  );
                }
              }}
            >
              On Leave
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Remote")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Remote"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "Remote")
                  );
                }
              }}
            >
              Remote
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Role</div>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Artist")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Artist"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "Artist")
                  );
                }
              }}
            >
              Artist
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Band Member")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Band Member"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "Band Member")
                  );
                }
              }}
            >
              Band Member
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Crew")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Crew"]);
                } else {
                  setSelectedFilter(selectedFilter.filter((f) => f !== "Crew"));
                }
              }}
            >
              Crew
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Management")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Management"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "Management")
                  );
                }
              }}
            >
              Management
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilter.includes("Production")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilter([...selectedFilter, "Production"]);
                } else {
                  setSelectedFilter(
                    selectedFilter.filter((f) => f !== "Production")
                  );
                }
              }}
            >
              Production
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="p-2">
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm font-medium"
                onClick={() => {
                  // Just clear the filters without implementing real logic
                  setSelectedFilter([]);
                }}
              >
                Reset Filters
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative">
          <input
            type="text"
            placeholder="Search personnel..."
            className="w-64 pl-9 pr-4 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Replace Add Personnel button with Bulk Action buttons when rows are selected */}
      {Object.keys(rowSelection).length > 0 ? (
        <div className="flex items-center gap-2">
          <SecondaryButton leadingIcon={<Mail size={16} />}>
            Invite ({Object.keys(rowSelection).length})
          </SecondaryButton>
          <SecondaryButton leadingIcon={<Activity size={16} />}>
            Request Info ({Object.keys(rowSelection).length})
          </SecondaryButton>
          <SecondaryButton leadingIcon={<Edit size={16} />}>
            Edit ({Object.keys(rowSelection).length})
          </SecondaryButton>
          <DestructiveButton leadingIcon={<Trash2 size={16} />}>
            Remove ({Object.keys(rowSelection).length})
          </DestructiveButton>
        </div>
      ) : (
        <PrimaryButton
          leadingIcon={<Plus size={16} />}
          onClick={() => setIsPersonnelSheetOpen(true)}
        >
          Add Personnel
        </PrimaryButton>
      )}
    </div>
  );
};

export default PersonnelToolbar;
