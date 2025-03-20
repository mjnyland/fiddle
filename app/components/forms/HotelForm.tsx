"use client";

import React, { useState } from "react";
import { Hotel, Calendar, Clock, MapPin, Phone } from "lucide-react";
import { SheetFooter } from "@/components/ui/sheet";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export interface HotelFormData {
  name: string;
  address: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  roomType: string;
  roomCount: string;
  phone: string;
  amenities: string;
  notes?: string;
}

interface HotelFormProps {
  onSubmit?: (data: HotelFormData) => void;
  onCancel: () => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<HotelFormData>({
    name: "",
    address: "",
    checkInDate: "",
    checkInTime: "15:00", // Default check-in time 3 PM
    checkOutDate: "",
    checkOutTime: "11:00", // Default check-out time 11 AM
    roomType: "",
    roomCount: "1",
    phone: "",
    amenities: "",
    notes: "",
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
          <label htmlFor="name" className="text-sm font-medium">
            Hotel Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hotel name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-medium flex items-center"
          >
            <MapPin size={14} className="mr-1" />
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
            placeholder="Enter hotel address"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium mb-2">Check-in</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="checkInDate"
                className="text-sm font-medium flex items-center"
              >
                <Calendar size={14} className="mr-1" />
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="checkInDate"
                name="checkInDate"
                type="date"
                required
                value={formData.checkInDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="checkInTime"
                className="text-sm font-medium flex items-center"
              >
                <Clock size={14} className="mr-1" />
                Time
              </label>
              <input
                id="checkInTime"
                name="checkInTime"
                type="time"
                value={formData.checkInTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium mb-2">Check-out</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="checkOutDate"
                className="text-sm font-medium flex items-center"
              >
                <Calendar size={14} className="mr-1" />
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="checkOutDate"
                name="checkOutDate"
                type="date"
                required
                value={formData.checkOutDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="checkOutTime"
                className="text-sm font-medium flex items-center"
              >
                <Clock size={14} className="mr-1" />
                Time
              </label>
              <input
                id="checkOutTime"
                name="checkOutTime"
                type="time"
                value={formData.checkOutTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="roomType" className="text-sm font-medium">
              Room Type
            </label>
            <input
              id="roomType"
              name="roomType"
              type="text"
              value={formData.roomType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Standard, Suite"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="roomCount" className="text-sm font-medium">
              Number of Rooms
            </label>
            <input
              id="roomCount"
              name="roomCount"
              type="number"
              min="1"
              value={formData.roomCount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium flex items-center"
          >
            <Phone size={14} className="mr-1" />
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hotel phone number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="amenities" className="text-sm font-medium">
            Amenities
          </label>
          <input
            id="amenities"
            name="amenities"
            type="text"
            value={formData.amenities}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Wifi, Pool, Breakfast (comma separated)"
          />
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
      </div>

      <SheetFooter>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit">Add Hotel</PrimaryButton>
      </SheetFooter>
    </form>
  );
};

export default HotelForm;
