"use client";

import React from "react";
import { Edit, Mail, MapPin, Phone, Trash2, X } from "lucide-react";
import { Personnel, personnelData } from "@/app/data/personnel";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { SecondaryButton, DestructiveButton } from "@/app/components/buttons";

interface TagData {
  name: string;
  color: string;
  groups: string[];
  description: string;
}

interface PersonnelDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPerson: Personnel | null;
  selectedGroup: string | null;
  selectedTag: TagData | null;
}

const PersonnelDetailSheet: React.FC<PersonnelDetailSheetProps> = ({
  open,
  onOpenChange,
  selectedPerson,
  selectedGroup,
  selectedTag,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md" forceMount>
        <SheetHeader className="pb-6">
          <div className="flex justify-between items-center">
            <SheetTitle>
              {selectedPerson
                ? "Personnel Details"
                : selectedGroup
                ? "Group Details"
                : selectedTag
                ? "Tag Details"
                : "Details"}
            </SheetTitle>
            <SheetClose className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <X size={18} />
            </SheetClose>
          </div>
        </SheetHeader>

        {selectedPerson && (
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold">{selectedPerson.name}</h3>
              <div className="flex items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedPerson.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : selectedPerson.status === "On Leave"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedPerson.status}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {selectedPerson.role}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={18} className="text-gray-500 mr-2" />
                <span>{selectedPerson.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-gray-500 mr-2" />
                <span>{selectedPerson.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-gray-500 mr-2" />
                <span>{selectedPerson.location}</span>
              </div>
            </div>

            {selectedPerson.notes && (
              <div className="space-y-2">
                <h4 className="font-medium">Notes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedPerson.notes}
                </p>
              </div>
            )}

            {selectedPerson.emergencyContact && (
              <div className="space-y-2">
                <h4 className="font-medium">Emergency Contact</h4>
                <div className="text-sm space-y-1">
                  <p className="font-medium">
                    {selectedPerson.emergencyContact.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedPerson.emergencyContact.relationship}
                  </p>
                  <p>{selectedPerson.emergencyContact.phone}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedGroup && (
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold">{selectedGroup}</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">
                  {
                    personnelData.filter((p) => p.group === selectedGroup)
                      .length
                  }{" "}
                  members
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Tour
                </span>
                {(selectedGroup === "West Coast" ||
                  selectedGroup === "East Coast") && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    2023
                  </span>
                )}
                {selectedGroup === "West Coast" && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    VIP
                  </span>
                )}
                {(selectedGroup === "Midwest" || selectedGroup === "South") && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                    Production
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedGroup === "West Coast"
                    ? "Main tour group for west coast venues"
                    : selectedGroup === "East Coast"
                    ? "NY based personnel and venue contacts"
                    : selectedGroup === "Midwest"
                    ? "Band members and logistics for midwest shows"
                    : "Southern venue management and local contacts"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Members</h4>
              <ul className="text-sm space-y-1">
                {personnelData
                  .filter((p) => p.group === selectedGroup)
                  .map((person) => (
                    <li
                      key={person.id}
                      className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {person.role}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          person.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : person.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {person.status}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {selectedTag && (
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full ${
                    selectedTag.color === "blue"
                      ? "bg-blue-500"
                      : selectedTag.color === "green"
                      ? "bg-green-500"
                      : selectedTag.color === "purple"
                      ? "bg-purple-500"
                      : selectedTag.color === "orange"
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                ></div>
                <h3 className="text-2xl font-semibold">{selectedTag.name}</h3>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedTag.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Associated Groups</h4>
              <div className="flex flex-wrap gap-1">
                {selectedTag.groups.map((group, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {group}
                  </span>
                ))}
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
  );
};

export default PersonnelDetailSheet;
