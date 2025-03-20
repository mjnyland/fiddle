"use client";

import React, { useState } from "react";
import { Plane, Calendar, Clock, Users, MapPin } from "lucide-react";
import { SheetFooter } from "@/components/ui/sheet";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export interface FlightFormData {
  airline: string;
  flightNumber: string;
  departureDate: string;
  departureTime: string;
  departureAirport: string;
  arrivalDate: string;
  arrivalTime: string;
  arrivalAirport: string;
  passengers: string;
  notes?: string;
}

interface FlightFormProps {
  onSubmit?: (data: FlightFormData) => void;
  onCancel: () => void;
}

const FlightForm: React.FC<FlightFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FlightFormData>({
    airline: "",
    flightNumber: "",
    departureDate: "",
    departureTime: "",
    departureAirport: "",
    arrivalDate: "",
    arrivalTime: "",
    arrivalAirport: "",
    passengers: "",
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="airline" className="text-sm font-medium">
              Airline <span className="text-red-500">*</span>
            </label>
            <input
              id="airline"
              name="airline"
              type="text"
              required
              value={formData.airline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter airline name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="flightNumber" className="text-sm font-medium">
              Flight Number <span className="text-red-500">*</span>
            </label>
            <input
              id="flightNumber"
              name="flightNumber"
              type="text"
              required
              value={formData.flightNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. AA1234"
            />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium mb-2">Departure</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="departureDate"
                className="text-sm font-medium flex items-center"
              >
                <Calendar size={14} className="mr-1" />
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="departureDate"
                name="departureDate"
                type="date"
                required
                value={formData.departureDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="departureTime"
                className="text-sm font-medium flex items-center"
              >
                <Clock size={14} className="mr-1" />
                Time <span className="text-red-500">*</span>
              </label>
              <input
                id="departureTime"
                name="departureTime"
                type="time"
                required
                value={formData.departureTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <label
              htmlFor="departureAirport"
              className="text-sm font-medium flex items-center"
            >
              <MapPin size={14} className="mr-1" />
              Airport <span className="text-red-500">*</span>
            </label>
            <input
              id="departureAirport"
              name="departureAirport"
              type="text"
              required
              value={formData.departureAirport}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter departure airport (e.g. LAX)"
            />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium mb-2">Arrival</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="arrivalDate"
                className="text-sm font-medium flex items-center"
              >
                <Calendar size={14} className="mr-1" />
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                required
                value={formData.arrivalDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="arrivalTime"
                className="text-sm font-medium flex items-center"
              >
                <Clock size={14} className="mr-1" />
                Time <span className="text-red-500">*</span>
              </label>
              <input
                id="arrivalTime"
                name="arrivalTime"
                type="time"
                required
                value={formData.arrivalTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <label
              htmlFor="arrivalAirport"
              className="text-sm font-medium flex items-center"
            >
              <MapPin size={14} className="mr-1" />
              Airport <span className="text-red-500">*</span>
            </label>
            <input
              id="arrivalAirport"
              name="arrivalAirport"
              type="text"
              required
              value={formData.arrivalAirport}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter arrival airport (e.g. JFK)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="passengers"
            className="text-sm font-medium flex items-center"
          >
            <Users size={14} className="mr-1" />
            Passengers
          </label>
          <input
            id="passengers"
            name="passengers"
            type="text"
            value={formData.passengers}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter passenger names (comma separated)"
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
        <PrimaryButton type="submit">Add Flight</PrimaryButton>
      </SheetFooter>
    </form>
  );
};

export default FlightForm;
