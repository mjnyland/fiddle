"use client";

import React, { useState } from "react";
import { Clock, Users, MapPin } from "lucide-react";
import { SheetFooter } from "@/components/ui/sheet";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { EventFormData } from "../CalendarHeader";

interface EventFormProps {
  onSubmit?: (eventData: EventFormData) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    timeStart: "09:00",
    timeEnd: "10:00",
    location: "",
    attendees: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
            placeholder="Enter event description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="timeStart"
              className="text-sm font-medium flex items-center"
            >
              <Clock size={14} className="mr-1" />
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              id="timeStart"
              name="timeStart"
              type="time"
              required
              value={formData.timeStart}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="timeEnd"
              className="text-sm font-medium flex items-center"
            >
              <Clock size={14} className="mr-1" />
              End Time
            </label>
            <input
              id="timeEnd"
              name="timeEnd"
              type="time"
              value={formData.timeEnd}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium flex items-center"
          >
            <MapPin size={14} className="mr-1" />
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="attendees"
            className="text-sm font-medium flex items-center"
          >
            <Users size={14} className="mr-1" />
            Attendees
          </label>
          <input
            id="attendees"
            name="attendees"
            type="text"
            value={formData.attendees}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter attendees (comma separated)"
          />
        </div>
      </div>

      <SheetFooter>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit">Add Event</PrimaryButton>
      </SheetFooter>
    </form>
  );
};

export default EventForm;
