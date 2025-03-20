"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { Personnel } from "@/app/data/personnel";

interface GroupsTableProps {
  groups: string[];
  selectedGroups: Record<string, boolean>;
  setSelectedGroups: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  handleGroupClick: (group: string) => void;
  personnelData: Personnel[];
}

const GroupsTable: React.FC<GroupsTableProps> = ({
  groups,
  selectedGroups,
  setSelectedGroups,
  handleGroupClick,
  personnelData,
}) => {
  return (
    <div className="bg-cardBackgroundPrimary border-t border-cardBorderColor overflow-hidden flex-1">
      <div className="overflow-x-auto w-full h-full">
        <Table className="w-full min-w-[800px]">
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              <TableHead style={{ width: 50 }}>
                <Checkbox
                  aria-label="Select all groups"
                  checked={
                    Object.keys(selectedGroups).length > 0 &&
                    Object.values(selectedGroups).every(Boolean)
                  }
                  onCheckedChange={(checked) => {
                    const newSelectedGroups: Record<string, boolean> = {};
                    groups.forEach((group) => {
                      newSelectedGroups[group] = !!checked;
                    });
                    setSelectedGroups(newSelectedGroups);
                  }}
                />
              </TableHead>
              <TableHead style={{ width: 200 }}>Group Name</TableHead>
              <TableHead style={{ width: 100 }}>Members</TableHead>
              <TableHead style={{ width: 200 }}>Tags</TableHead>
              <TableHead style={{ width: 200 }}>Description</TableHead>
              <TableHead style={{ width: 120 }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleGroupClick(group)}
              >
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${group} group`}
                    checked={!!selectedGroups[group]}
                    onCheckedChange={(checked) => {
                      setSelectedGroups((prev) => ({
                        ...prev,
                        [group]: !!checked,
                      }));
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium">{group}</TableCell>
                <TableCell>
                  {personnelData.filter((p) => p.group === group).length}
                </TableCell>
                <TableCell>
                  {/* Group Tags */}
                  <div className="flex gap-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Tour
                    </span>
                    {(group === "West Coast" || group === "East Coast") && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        2023
                      </span>
                    )}
                    {group === "West Coast" && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        VIP
                      </span>
                    )}
                    {(group === "Midwest" || group === "South") && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                        Production
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {group === "West Coast"
                    ? "Main tour group for west coast venues"
                    : group === "East Coast"
                    ? "NY based personnel and venue contacts"
                    : group === "Midwest"
                    ? "Band members and logistics for midwest shows"
                    : "Southern venue management and local contacts"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-muted rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality would go here
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Delete functionality would go here
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GroupsTable;
