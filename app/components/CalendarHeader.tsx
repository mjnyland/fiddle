"use client";

import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import {
  Plus,
  Download,
  Calendar,
  Clock,
  Users,
  MapPin,
  FileText,
  Plane,
  Hotel,
} from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EventForm,
  FlightForm,
  HotelForm,
  ContactForm,
  NoteForm,
  FlightFormData,
  HotelFormData,
  ContactFormData,
  NoteFormData,
} from "./forms";

type CalendarHeaderProps = {
  date: string;
  title: string;
  subtitle: string;
  onEventAdd?: (eventData: EventFormData) => void;
};

export type EventFormData = {
  title: string;
  description?: string;
  timeStart: string;
  timeEnd?: string;
  location?: string;
  attendees?: string;
};

// Define form types
type FormType = "event" | "flight" | "hotel" | "contact" | "note";

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  title,
  subtitle,
  onEventAdd,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<FormType | null>(null);

  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Delay clearing the form until after animation completes
      setTimeout(() => {
        if (!isOpen) {
          setActiveForm(null);
        }
      }, 300);
    }
  };

  const openFormSheet = (formType: FormType) => {
    setActiveForm(formType);
    setIsOpen(true);
  };

  // Handle flight form submission
  const handleFlightAdd = (data: FlightFormData) => {
    console.log("Flight added:", data);
    // Implement flight handling logic here
    setIsOpen(false);
  };

  // Handle hotel form submission
  const handleHotelAdd = (data: HotelFormData) => {
    console.log("Hotel added:", data);
    // Implement hotel handling logic here
    setIsOpen(false);
  };

  // Handle contact form submission
  const handleContactAdd = (data: ContactFormData) => {
    console.log("Contact added:", data);
    // Implement contact handling logic here
    setIsOpen(false);
  };

  // Handle note form submission
  const handleNoteAdd = (data: NoteFormData) => {
    console.log("Note added:", data);
    // Implement note handling logic here
    setIsOpen(false);
  };

  // Map form types to their titles, descriptions, and components
  const formConfig = {
    event: {
      title: "Add New Event",
      description: "Fill in the details to add a new event to your calendar.",
      component: (
        <EventForm onSubmit={onEventAdd} onCancel={() => setIsOpen(false)} />
      ),
    },
    flight: {
      title: "Add New Flight",
      description: "Enter flight details for travel planning.",
      component: (
        <FlightForm
          onSubmit={handleFlightAdd}
          onCancel={() => setIsOpen(false)}
        />
      ),
    },
    hotel: {
      title: "Add New Hotel",
      description: "Enter hotel accommodation details.",
      component: (
        <HotelForm
          onSubmit={handleHotelAdd}
          onCancel={() => setIsOpen(false)}
        />
      ),
    },
    contact: {
      title: "Add New Contact",
      description: "Add a contact to your tour personnel.",
      component: (
        <ContactForm
          onSubmit={handleContactAdd}
          onCancel={() => setIsOpen(false)}
        />
      ),
    },
    note: {
      title: "Add New Note",
      description: "Add a note to your calendar.",
      component: (
        <NoteForm onSubmit={handleNoteAdd} onCancel={() => setIsOpen(false)} />
      ),
    },
  };

  // Menu items configuration
  const menuItems = [
    { type: "event", icon: <Calendar size={16} />, label: "Add Event" },
    { type: "flight", icon: <Plane size={16} />, label: "Add Flight" },
    { type: "hotel", icon: <Hotel size={16} />, label: "Add Hotel" },
    { type: "contact", icon: <Users size={16} />, label: "Add Contact" },
    { type: "note", icon: <FileText size={16} />, label: "Add Note" },
  ];

  return (
    <div className="flex justify-between items-center">
      <div className="p-4 bg-surface2 text-primary">
        <h1 className="text-2xl font-semibold">{date}</h1>
        <div className="flex items-center text-gray-400">
          <span>{title}</span>
          <span className="mx-2">•</span>
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <SecondaryButton leadingIcon={<Download size={16} />}>
          Export
        </SecondaryButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <PrimaryButton leadingIcon={<Plus size={16} />}>Add</PrimaryButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.type}
                onClick={() => openFormSheet(item.type as FormType)}
              >
                <div className="mr-2 h-4 w-4">{item.icon}</div>
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
          <SheetContent className="sm:max-w-md" forceMount>
            {activeForm && (
              <>
                <SheetHeader className="mb-6">
                  <SheetTitle>{formConfig[activeForm].title}</SheetTitle>
                  <SheetDescription>
                    {formConfig[activeForm].description}
                  </SheetDescription>
                </SheetHeader>
                {formConfig[activeForm].component}
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CalendarHeader;
