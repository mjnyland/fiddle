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

interface TagData {
  name: string;
  color: string;
  groups: string[];
  description: string;
}

interface GroupTagsTableProps {
  tags: TagData[];
  selectedTags: Record<string, boolean>;
  setSelectedTags: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  handleTagClick: (tag: TagData) => void;
}

const GroupTagsTable: React.FC<GroupTagsTableProps> = ({
  tags,
  selectedTags,
  setSelectedTags,
  handleTagClick,
}) => {
  return (
    <div className="bg-cardBackgroundPrimary border-t border-cardBorderColor overflow-hidden flex-1">
      <div className="overflow-x-auto w-full h-full">
        <Table className="w-full min-w-[800px]">
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              <TableHead style={{ width: 50 }}>
                <Checkbox
                  aria-label="Select all tags"
                  checked={
                    Object.keys(selectedTags).length > 0 &&
                    Object.values(selectedTags).every(Boolean)
                  }
                  onCheckedChange={(checked) => {
                    const newSelectedTags: Record<string, boolean> = {};
                    tags.forEach((tag) => {
                      newSelectedTags[tag.name] = !!checked;
                    });
                    setSelectedTags(newSelectedTags);
                  }}
                />
              </TableHead>
              <TableHead style={{ width: 200 }}>Tag Name</TableHead>
              <TableHead style={{ width: 100 }}>Color</TableHead>
              <TableHead style={{ width: 200 }}>Associated Groups</TableHead>
              <TableHead style={{ width: 200 }}>Description</TableHead>
              <TableHead style={{ width: 120 }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleTagClick(tag)}
              >
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${tag.name} tag`}
                    checked={!!selectedTags[tag.name]}
                    onCheckedChange={(checked) => {
                      setSelectedTags((prev) => ({
                        ...prev,
                        [tag.name]: !!checked,
                      }));
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell>
                  <div
                    className={`w-6 h-6 rounded-full ${
                      tag.color === "blue"
                        ? "bg-blue-500"
                        : tag.color === "green"
                        ? "bg-green-500"
                        : tag.color === "purple"
                        ? "bg-purple-500"
                        : tag.color === "orange"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {tag.groups.map((group, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{tag.description}</TableCell>
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

export default GroupTagsTable;
