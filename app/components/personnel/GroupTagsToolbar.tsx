"use client";

import React from "react";
import {
  ChevronDown,
  Edit,
  Filter,
  Grid,
  List,
  Plus,
  Search,
  Trash2,
  Users,
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

interface GroupTagsToolbarProps {
  selectedTags: Record<string, boolean>;
}

const GroupTagsToolbar: React.FC<GroupTagsToolbarProps> = ({
  selectedTags,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2 items-center">
        {/* View as dropdown for group tags tab */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center border border-cardBorderColor rounded-md px-3 py-2 bg-white dark:bg-gray-800">
              <span className="text-gray-500 mr-2">
                <List size={16} />
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                View as: Table
              </span>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[180px]">
            <DropdownMenuItem className="flex items-center">
              <List size={16} className="mr-2" />
              <span>Table View</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <Grid size={16} className="mr-2" />
              <span>Grid View</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filter dropdown for group tags tab */}
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
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px]">
            <div className="px-2 py-1.5 text-sm font-medium">
              Associated Groups
            </div>
            <DropdownMenuCheckboxItem>West Coast</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>East Coast</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Midwest</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>South</DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Tag Color</div>
            <DropdownMenuCheckboxItem>Blue</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Green</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Purple</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Orange</DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="p-2">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm font-medium">
                Reset Filters
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative">
          <input
            type="text"
            placeholder="Search tags..."
            className="w-64 pl-9 pr-4 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {Object.keys(selectedTags).length > 0 &&
      Object.values(selectedTags).some(Boolean) ? (
        <div className="flex items-center gap-2">
          <SecondaryButton leadingIcon={<Users size={16} />}>
            Assign ({Object.values(selectedTags).filter(Boolean).length})
          </SecondaryButton>
          <SecondaryButton leadingIcon={<Edit size={16} />}>
            Edit ({Object.values(selectedTags).filter(Boolean).length})
          </SecondaryButton>
          <DestructiveButton leadingIcon={<Trash2 size={16} />}>
            Remove ({Object.values(selectedTags).filter(Boolean).length})
          </DestructiveButton>
        </div>
      ) : (
        <PrimaryButton leadingIcon={<Plus size={16} />}>Add Tag</PrimaryButton>
      )}
    </div>
  );
};

export default GroupTagsToolbar;
