"use client";

import React, { useState } from "react";
import { FileText, Tag } from "lucide-react";
import { SheetFooter } from "@/components/ui/sheet";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export interface NoteFormData {
  title: string;
  content: string;
  tags?: string;
  color?: string;
}

interface NoteFormProps {
  onSubmit?: (data: NoteFormData) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
    tags: "",
    color: "#ffffff", // Default white color
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const colorOptions = [
    { value: "#ffffff", label: "White" },
    { value: "#f3f4f6", label: "Gray" },
    { value: "#fee2e2", label: "Red" },
    { value: "#fef3c7", label: "Yellow" },
    { value: "#dcfce7", label: "Green" },
    { value: "#dbeafe", label: "Blue" },
    { value: "#f3e8ff", label: "Purple" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium flex items-center"
          >
            <FileText size={14} className="mr-1" />
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[160px]"
            placeholder="Enter note content"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="text-sm font-medium flex items-center"
            >
              <Tag size={14} className="mr-1" />
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags (comma separated)"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="color" className="text-sm font-medium">
              Note Color
            </label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <SheetFooter>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit">Add Note</PrimaryButton>
      </SheetFooter>
    </form>
  );
};

export default NoteForm;
