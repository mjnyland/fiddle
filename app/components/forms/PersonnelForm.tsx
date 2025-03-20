"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, X, Save } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Personnel, PersonnelRole } from "@/app/data/personnel";

export interface EmergencyContactData {
  name: string;
  relationship: string;
  phone: string;
}

export interface PersonnelFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "On Leave" | "Remote";
  group: string;
  notes?: string;
  emergencyContact?: EmergencyContactData;
  groupTags?: string[];
  travelProfile?: {
    hasPassport: boolean;
    hasTravelArrangements: boolean;
    hasEmergencyContact: boolean;
    hasFoodRestrictions: boolean;
  };
  permissions?: "Admin" | "Editor" | "Viewer";
  visibility?: boolean;
  canAddPersonnel?: boolean;
}

interface PersonnelFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PersonnelFormData) => void;
}

const PersonnelForm: React.FC<PersonnelFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<PersonnelFormData>({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    status: "Active",
    group: "",
    notes: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle emergency contact fields
    if (name.startsWith("emergency")) {
      const field = name.replace("emergency", "").toLowerCase();
      setFormData((prev) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact!,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md" forceMount>
        <SheetHeader className="pb-6">
          <div className="flex justify-between items-center">
            <SheetTitle>Add New Personnel</SheetTitle>
            <SheetClose className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <X size={18} />
            </SheetClose>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium flex items-center"
              >
                <User size={14} className="mr-1" />
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter personnel name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select role</option>
                <option value="Artist">Artist</option>
                <option value="Band Member">Band Member</option>
                <option value="Crew">Crew</option>
                <option value="Management">Management</option>
                <option value="Production">Production</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium flex items-center"
              >
                <Mail size={14} className="mr-1" />
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium flex items-center"
              >
                <Phone size={14} className="mr-1" />
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-medium flex items-center"
              >
                <MapPin size={14} className="mr-1" />
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="group" className="text-sm font-medium">
                Group <span className="text-red-500">*</span>
              </label>
              <select
                id="group"
                name="group"
                required
                value={formData.group}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select group</option>
                <option value="West Coast">West Coast</option>
                <option value="East Coast">East Coast</option>
                <option value="Midwest">Midwest</option>
                <option value="South">South</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                placeholder="Enter any additional notes"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium mb-2">Emergency Contact</div>
              <div className="border border-cardBorderColor rounded-md p-4 space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="emergencyName"
                    className="text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="emergencyName"
                    name="emergencyName"
                    type="text"
                    value={formData.emergencyContact?.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="emergencyRelationship"
                    className="text-sm font-medium"
                  >
                    Relationship
                  </label>
                  <input
                    id="emergencyRelationship"
                    name="emergencyRelationship"
                    type="text"
                    value={formData.emergencyContact?.relationship || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter relationship"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="emergencyPhone"
                    className="text-sm font-medium"
                  >
                    Phone
                  </label>
                  <input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyContact?.phone || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter emergency contact phone"
                  />
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="flex justify-between gap-2">
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" leadingIcon={<Save size={16} />}>
              Save Personnel
            </PrimaryButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default PersonnelForm;
