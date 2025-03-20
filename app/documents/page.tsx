"use client";

import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import {
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from "../components/buttons";
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  FileText,
  Download,
  Edit,
  Trash,
  Eye,
  Check,
  Calendar,
  List,
  Settings,
  Grid,
  Table as TableIcon,
  ChevronDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

// Define document type
interface DocumentType {
  id: string;
  name: string;
  uploadedBy: string;
  uploadTime: string;
  tags?: string[];
  fileType: "pdf" | "doc" | "xls" | "img";
  fileSize?: string;
}

// Sample document data
const documentData: DocumentType[] = [
  {
    id: "1",
    name: "TourBook_v99.pdf",
    uploadedBy: "Ben Melman",
    uploadTime: "5:00PM",
    tags: ["Band Party"],
    fileType: "pdf",
    fileSize: "2.3MB",
  },
  {
    id: "2",
    name: "Event Insurance.pdf",
    uploadedBy: "Emma Carter",
    uploadTime: "Yesterday",
    tags: ["Crew Party"],
    fileType: "pdf",
    fileSize: "1.5MB",
  },
  {
    id: "3",
    name: "Stage Plot Final.pdf",
    uploadedBy: "Omar Apollo",
    uploadTime: "Dec 15",
    tags: ["Production"],
    fileType: "pdf",
    fileSize: "4.2MB",
  },
  {
    id: "4",
    name: "Equipment Manifest.xls",
    uploadedBy: "Aaron Thomas",
    uploadTime: "Dec 14",
    tags: ["Lighting"],
    fileType: "xls",
    fileSize: "1.8MB",
  },
];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState("table");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  // Filter documents based on search term
  const filteredDocuments = documentData.filter(
    (document) =>
      document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (document.tags &&
        document.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  // Toggle document selection
  const toggleDocumentSelection = (id: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  // Toggle all document selection
  const toggleAllDocuments = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id));
    }
  };

  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Band Party":
        return "bg-purple-100 text-purple-800";
      case "Crew Party":
        return "bg-green-100 text-green-800";
      case "Artist Party":
        return "bg-blue-100 text-blue-800";
      case "Lighting":
        return "bg-yellow-100 text-yellow-800";
      case "SFX":
        return "bg-orange-100 text-orange-800";
      case "Production":
        return "bg-teal-100 text-teal-800";
      case "Carps":
        return "bg-pink-100 text-pink-800";
      case "Managers":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText size={18} className="text-red-500" />;
      case "doc":
        return <FileText size={18} className="text-blue-500" />;
      case "xls":
        return <FileText size={18} className="text-green-500" />;
      case "img":
        return <FileText size={18} className="text-purple-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="pt-6 h-full flex flex-col">
        <div className="px-6 flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Documents</h1>
        </div>

        <div className="px-6 mb-4">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents"
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
                    <TableIcon className="h-4 w-4 mr-2" />
                    <span>Table View</span>
                    {viewMode === "table" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setViewMode("grid")}
                    className="flex items-center"
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    <span>Grid View</span>
                    {viewMode === "grid" && (
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
                  <div className="px-2 py-1.5 text-sm font-medium">
                    File Type
                  </div>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("pdf")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "pdf"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "pdf")
                        );
                      }
                    }}
                  >
                    <FileText size={16} className="mr-2 text-red-500" />
                    PDF Documents
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("doc")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "doc"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "doc")
                        );
                      }
                    }}
                  >
                    <FileText size={16} className="mr-2 text-blue-500" />
                    Word Documents
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("xls")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "xls"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "xls")
                        );
                      }
                    }}
                  >
                    <FileText size={16} className="mr-2 text-green-500" />
                    Excel Spreadsheets
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("img")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "img"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "img")
                        );
                      }
                    }}
                  >
                    <FileText size={16} className="mr-2 text-purple-500" />
                    Images
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />

                  <div className="px-2 py-1.5 text-sm font-medium">Tags</div>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Contract")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Contract"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Contract")
                        );
                      }
                    }}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${getTagColor(
                        "Contract"
                      )} mr-2`}
                    ></span>
                    Contract
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Technical")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Technical"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Technical")
                        );
                      }
                    }}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${getTagColor(
                        "Technical"
                      )} mr-2`}
                    ></span>
                    Technical
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterOptions.includes("Financial")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilterOptions([...filterOptions, "Financial"]);
                      } else {
                        setFilterOptions(
                          filterOptions.filter((f) => f !== "Financial")
                        );
                      }
                    }}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${getTagColor(
                        "Financial"
                      )} mr-2`}
                    ></span>
                    Financial
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

            {/* Replace Upload Document button with Bulk Action buttons when documents are selected */}
            {selectedDocuments.length > 0 ? (
              <div className="flex items-center gap-2">
                <SecondaryButton leadingIcon={<Download size={16} />}>
                  Download ({selectedDocuments.length})
                </SecondaryButton>
                <DestructiveButton leadingIcon={<Trash size={16} />}>
                  Delete ({selectedDocuments.length})
                </DestructiveButton>
              </div>
            ) : (
              <PrimaryButton leadingIcon={<Plus size={16} />}>
                Upload Document
              </PrimaryButton>
            )}
          </div>

          <div className="bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedDocuments.length > 0 &&
                          selectedDocuments.length === filteredDocuments.length
                        }
                        onCheckedChange={toggleAllDocuments}
                        aria-label="Select all documents"
                      />
                    </TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="w-[50px]">
                        <Checkbox
                          checked={selectedDocuments.includes(document.id)}
                          onCheckedChange={() =>
                            toggleDocumentSelection(document.id)
                          }
                          aria-label={`Select ${document.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start">
                          {getFileIcon(document.fileType)}
                          <div className="ml-3">
                            <div className="font-medium">{document.name}</div>
                            <div className="text-sm text-gray-500">
                              Uploaded by {document.uploadedBy} at{" "}
                              {document.uploadTime}
                            </div>
                            <div className="mt-1">
                              {document.tags &&
                                document.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(
                                      tag
                                    )} mr-1`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-md"
                          aria-label="View document"
                        >
                          <Eye size={18} className="text-gray-500" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-md"
                          aria-label="Edit document"
                        >
                          <Edit size={18} className="text-gray-500" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-md"
                          aria-label="Delete document"
                        >
                          <Trash
                            size={18}
                            className="text-gray-500 hover:text-red-500"
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
