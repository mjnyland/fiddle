"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import {
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from "../components/buttons";
import {
  Plane,
  Search,
  Filter,
  LayoutGrid,
  Download,
  Plus,
  ChevronRight,
  ChevronDown,
  Clock,
  Car,
  Trash2,
  ArrowRight,
  User,
  Info,
  Edit,
  FileText,
  Check,
  List,
  Calendar,
  Settings,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Checkbox } from "@/components/ui/checkbox";
import { FlightForm, FlightFormData } from "../components/forms";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

// Interface for passenger data
interface Passenger {
  id: string;
  name: string;
  recordLocator: string;
  seat: string;
  departureTransfer?: string;
  arrivalTransfer?: string;
}

// Interface for flight data
interface Flight {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  origin: {
    code: string;
    name: string;
    terminal?: string;
    time: string;
    timeZone: string;
  };
  destination: {
    code: string;
    name: string;
    terminal?: string;
    time: string;
    timeZone: string;
  };
  airline: string;
  flightNumber: string;
  directFlight: boolean;
  stopover?: string;
  passengers: Passenger[];
  expanded?: boolean;
}

// Sample flight data
const flightData: Flight[] = [
  {
    id: "1",
    date: "Dec. 2, 2025",
    title: "NYC Flight to Rehearsals",
    subtitle: "Crew to Rehearsals",
    origin: {
      code: "JFK",
      name: "John F. Kennedy Intl",
      terminal: "T2",
      time: "8:00 AM",
      timeZone: "EDT",
    },
    destination: {
      code: "LAX",
      name: "Los Angeles Intl",
      terminal: "T4",
      time: "11:15 AM",
      timeZone: "PDT",
    },
    airline: "DL",
    flightNumber: "2323",
    directFlight: true,
    passengers: [
      {
        id: "1",
        name: "Quinn Martinez",
        recordLocator: "ABC123",
        seat: "6A",
        departureTransfer: "Home to rehearsals",
      },
      {
        id: "2",
        name: "Skylar Robinson",
        recordLocator: "ABC123",
        seat: "6A",
        departureTransfer: "Home to rehearsals",
      },
      {
        id: "3",
        name: "Peyton King",
        recordLocator: "ABC123",
        seat: "6A",
        departureTransfer: "Home to rehearsals",
      },
      {
        id: "4",
        name: "Skylar Robinson",
        recordLocator: "ABC123",
        seat: "6A",
      },
      {
        id: "5",
        name: "Peyton King",
        recordLocator: "ABC123",
        seat: "6A",
      },
    ],
    expanded: false,
  },
  {
    id: "2",
    date: "Dec. 2, 2025",
    title: "CHI Flight to Rehearsals",
    subtitle: "Band to Rehearsals",
    origin: {
      code: "ORD",
      name: "Chicago O'Hare Intl",
      terminal: "Terminal 1",
      time: "8:00 AM",
      timeZone: "EDT",
    },
    destination: {
      code: "LAX",
      name: "Los Angeles Intl",
      terminal: "Terminal 3",
      time: "11:15 AM",
      timeZone: "PDT",
    },
    airline: "DL",
    flightNumber: "2323",
    directFlight: true,
    passengers: [
      {
        id: "1",
        name: "Quinn Martinez",
        recordLocator: "ABC123",
        seat: "6A",
      },
      {
        id: "2",
        name: "Skylar Robinson",
        recordLocator: "ABC123",
        seat: "6A",
      },
      {
        id: "3",
        name: "Jordan Smith",
        recordLocator: "ABC123",
        seat: "6A",
      },
    ],
    expanded: false,
  },
  {
    id: "3",
    date: "Dec. 2, 2025",
    title: "ATL to SEA",
    subtitle: "",
    origin: {
      code: "ATL",
      name: "Hartsfield-Jackson Atlanta Intl",
      terminal: "Terminal 3",
      time: "7:45 AM",
      timeZone: "EDT",
    },
    destination: {
      code: "LAX",
      name: "Los Angeles Intl",
      terminal: "Terminal 3",
      time: "1:00 PM",
      timeZone: "PDT",
    },
    airline: "DL",
    flightNumber: "2323",
    directFlight: false,
    stopover: "DFW",
    passengers: [
      {
        id: "1",
        name: "Quinn Martinez",
        recordLocator: "ABC123",
        seat: "6A",
      },
      {
        id: "2",
        name: "Skylar Robinson",
        recordLocator: "ABC123",
        seat: "6A",
      },
    ],
    expanded: false,
  },
];

// Expanded list of all passengers mentioned in the flights
const passengerTags = [
  "Quinn Martinez",
  "Skylar Robinson",
  "Jordan Smith",
  "Alexis Johnson",
  "Taylor Williams",
  "Riley Davis",
  "Morgan Brown",
  "Casey Wilson",
  "Jamie Lee",
  "Peyton King",
];

export default function TravelPage() {
  const [activeTab, setActiveTab] = useState<"Flights" | "Imports">("Flights");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFlights, setSelectedFlights] = useState<string[]>([]);
  const [flights, setFlights] = useState<Flight[]>(flightData);
  const [selectedPassengers, setSelectedPassengers] = useState<{
    [flightId: string]: string[];
  }>({});
  const [isFlightSheetOpen, setIsFlightSheetOpen] = useState(false);

  // Add state for view and filter options
  const [viewMode, setViewMode] = useState("card");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [flightStatus, setFlightStatus] = useState("all");

  // Initialize selectedPassengers with empty arrays for each flight
  useEffect(() => {
    const initialSelectedPassengers: { [flightId: string]: string[] } = {};
    flights.forEach((flight) => {
      initialSelectedPassengers[flight.id] = [];
    });
    setSelectedPassengers(initialSelectedPassengers);
  }, []);

  // Filter flights based on search term
  const filteredFlights = flights.filter(
    (flight) =>
      flight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.code
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      flight.passengers.some((passenger) =>
        passenger.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Toggle flight selection
  const toggleFlightSelection = (id: string) => {
    setSelectedFlights((prev) =>
      prev.includes(id)
        ? prev.filter((flightId) => flightId !== id)
        : [...prev, id]
    );
  };

  // Toggle flight expansion
  const toggleFlightExpansion = (id: string) => {
    setFlights((prev) =>
      prev.map((flight) =>
        flight.id === id ? { ...flight, expanded: !flight.expanded } : flight
      )
    );
  };

  // Toggle passenger selection
  const togglePassengerSelection = (flightId: string, passengerId: string) => {
    setSelectedPassengers((prev) => {
      const currentSelected = prev[flightId] || [];
      const newSelected = currentSelected.includes(passengerId)
        ? currentSelected.filter((id) => id !== passengerId)
        : [...currentSelected, passengerId];

      return {
        ...prev,
        [flightId]: newSelected,
      };
    });
  };

  // Toggle all passengers in a flight
  const toggleAllPassengers = (flightId: string, select: boolean) => {
    const flight = flights.find((f) => f.id === flightId);
    if (!flight) return;

    setSelectedPassengers((prev) => {
      if (select) {
        // Select all passengers
        return {
          ...prev,
          [flightId]: flight.passengers.map((p) => p.id),
        };
      } else {
        // Deselect all passengers
        return {
          ...prev,
          [flightId]: [],
        };
      }
    });
  };

  // Check if all passengers are selected for a flight
  const areAllPassengersSelected = (flightId: string) => {
    const flight = flights.find((f) => f.id === flightId);
    if (!flight) return false;

    const selectedForFlight = selectedPassengers[flightId] || [];
    return (
      selectedForFlight.length === flight.passengers.length &&
      flight.passengers.length > 0
    );
  };

  // Get total number of selected passengers across all flights
  const getTotalSelectedPassengersCount = () => {
    return Object.values(selectedPassengers).reduce(
      (sum, passengers) => sum + passengers.length,
      0
    );
  };

  // Check if any passengers are selected
  const anyPassengersSelected = getTotalSelectedPassengersCount() > 0;

  // Handle flight form submission
  const handleFlightAdd = (data: FlightFormData) => {
    console.log("Flight added:", data);

    // Create a new flight from the form data
    const newFlight: Flight = {
      id: `${flights.length + 1}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      title: `${data.departureAirport} to ${data.arrivalAirport}`,
      subtitle: "",
      origin: {
        code: data.departureAirport,
        name: `${data.departureAirport} Airport`,
        terminal: "",
        time: data.departureTime,
        timeZone: "EDT", // Would come from real data
      },
      destination: {
        code: data.arrivalAirport,
        name: `${data.arrivalAirport} Airport`,
        terminal: "",
        time: data.arrivalTime,
        timeZone: "PDT", // Would come from real data
      },
      airline: data.airline,
      flightNumber: data.flightNumber,
      directFlight: true, // Would be determined based on real data
      passengers: data.passengers.split(",").map((name, idx) => ({
        id: `new-${idx + 1}`,
        name: name.trim(),
        recordLocator: "",
        seat: "",
      })),
      expanded: false,
    };

    // Add the new flight to the flights state
    setFlights((prev) => [...prev, newFlight]);

    // Close the sheet
    setIsFlightSheetOpen(false);
  };

  return (
    <MainLayout>
      <div className="pt-6 h-full flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="px-6 flex items-center mb-6">
          <h1 className="text-2xl font-semibold mr-6">Flights</h1>
          <div className="flex rounded-md overflow-hidden border border-cardBorderColor">
            <button
              className={`px-4 py-1.5 text-sm ${
                activeTab === "Flights"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("Flights")}
            >
              Flights
            </button>
            <button
              className={`px-4 py-1.5 text-sm ${
                activeTab === "Imports"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("Imports")}
            >
              Imports
            </button>
          </div>
        </div>

        <div className="px-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search flights"
                  className="w-64 pl-9 pr-10 py-2 border border-cardBorderColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">
                    ⌘
                  </span>
                  <span className="ml-1 text-xs text-gray-400">+</span>
                  <span className="ml-1 text-xs text-gray-400">S</span>
                </div>
              </div>
              <div className="flex rounded-md overflow-hidden border border-cardBorderColor">
                {/* View dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 border-r border-cardBorderColor px-3 py-2 text-sm bg-white dark:bg-gray-800">
                      <LayoutGrid className="h-4 w-4" />
                      <span>View</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[180px]">
                    <DropdownMenuItem
                      onClick={() => setViewMode("card")}
                      className="flex items-center"
                    >
                      <LayoutGrid className="h-4 w-4 mr-2" />
                      <span>Card View</span>
                      {viewMode === "card" && (
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
                    <DropdownMenuItem
                      onClick={() => setViewMode("calendar")}
                      className="flex items-center"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Calendar View</span>
                      {viewMode === "calendar" && (
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
                    <button className="flex items-center gap-1 px-3 py-2 text-sm bg-white dark:bg-gray-800">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                      {filterOptions.length > 0 && (
                        <span className="ml-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium rounded-full px-1.5">
                          {filterOptions.length}
                        </span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[220px]">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      Airlines
                    </div>
                    <DropdownMenuCheckboxItem
                      checked={filterOptions.includes("American Airlines")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterOptions([
                            ...filterOptions,
                            "American Airlines",
                          ]);
                        } else {
                          setFilterOptions(
                            filterOptions.filter(
                              (f) => f !== "American Airlines"
                            )
                          );
                        }
                      }}
                    >
                      American Airlines
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterOptions.includes("Delta")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterOptions([...filterOptions, "Delta"]);
                        } else {
                          setFilterOptions(
                            filterOptions.filter((f) => f !== "Delta")
                          );
                        }
                      }}
                    >
                      Delta
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterOptions.includes("United")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterOptions([...filterOptions, "United"]);
                        } else {
                          setFilterOptions(
                            filterOptions.filter((f) => f !== "United")
                          );
                        }
                      }}
                    >
                      United
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuSeparator />

                    <div className="px-2 py-1.5 text-sm font-medium">
                      Flight Type
                    </div>
                    <DropdownMenuCheckboxItem
                      checked={filterOptions.includes("Direct")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterOptions([...filterOptions, "Direct"]);
                        } else {
                          setFilterOptions(
                            filterOptions.filter((f) => f !== "Direct")
                          );
                        }
                      }}
                    >
                      Direct
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterOptions.includes("Connecting")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterOptions([...filterOptions, "Connecting"]);
                        } else {
                          setFilterOptions(
                            filterOptions.filter((f) => f !== "Connecting")
                          );
                        }
                      }}
                    >
                      Connecting
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

              {/* Flight Status dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center border border-cardBorderColor rounded-md px-3 py-2 bg-white dark:bg-gray-800 cursor-pointer">
                    <span className="text-sm">
                      {flightStatus === "all" && "All Flights"}
                      {flightStatus === "inFlight" && "In Flight"}
                      {flightStatus === "upcoming" && "Upcoming"}
                      {flightStatus === "completed" && "Completed"}
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[180px]">
                  <DropdownMenuItem
                    onClick={() => setFlightStatus("all")}
                    className="flex items-center"
                  >
                    <span>All Flights</span>
                    {flightStatus === "all" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFlightStatus("inFlight")}
                    className="flex items-center"
                  >
                    <span>In Flight</span>
                    {flightStatus === "inFlight" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFlightStatus("upcoming")}
                    className="flex items-center"
                  >
                    <span>Upcoming</span>
                    {flightStatus === "upcoming" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFlightStatus("completed")}
                    className="flex items-center"
                  >
                    <span>Completed</span>
                    {flightStatus === "completed" && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              {anyPassengersSelected && (
                <div className="text-sm font-medium">
                  {getTotalSelectedPassengersCount()} passenger
                  {getTotalSelectedPassengersCount() !== 1 ? "s" : ""} selected
                </div>
              )}

              <div className="flex space-x-2">
                {anyPassengersSelected ? (
                  <>
                    <SecondaryButton leadingIcon={<Edit size={16} />}>
                      Edit
                    </SecondaryButton>
                    <SecondaryButton leadingIcon={<FileText size={16} />}>
                      View
                    </SecondaryButton>
                    <DestructiveButton leadingIcon={<Trash2 size={16} />}>
                      Delete
                    </DestructiveButton>
                  </>
                ) : (
                  <>
                    <SecondaryButton leadingIcon={<Download size={16} />}>
                      Export
                    </SecondaryButton>
                    <PrimaryButton
                      leadingIcon={<Plus size={16} />}
                      onClick={() => setIsFlightSheetOpen(true)}
                    >
                      Add Flights
                    </PrimaryButton>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main flights panel with horizontal scrolling for all cards */}
          <div className="overflow-x-auto pb-6">
            <div className="space-y-6 min-w-[1200px]">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white dark:bg-gray-800 border border-cardBorderColor rounded-lg overflow-hidden shadow-sm"
                >
                  {/* Flight header */}
                  <div className="border-b border-cardBorderColor">
                    <div
                      className="p-4 flex items-center whitespace-nowrap cursor-pointer"
                      onClick={() => toggleFlightExpansion(flight.id)}
                    >
                      {/* Left section with checkbox and flight name */}
                      <div className="flex items-start w-[240px] flex-shrink-0 mr-6">
                        <Checkbox
                          checked={selectedFlights.includes(flight.id)}
                          onCheckedChange={() =>
                            toggleFlightSelection(flight.id)
                          }
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select flight ${flight.title}`}
                          className="mr-4 mt-1"
                        />
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-500">
                            {flight.date}
                          </div>
                          <div className="font-medium mb-1">{flight.title}</div>
                          {flight.subtitle && (
                            <div className="text-xs text-gray-500 flex items-center">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              {flight.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Passenger tags next to flight name */}
                      <div className="flex items-center gap-1.5 w-[320px] flex-shrink-0 mr-6">
                        {[...new Set(flight.passengers.map((p) => p.name))]
                          .slice(0, 6)
                          .map((name, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                            >
                              {name}
                            </span>
                          ))}
                      </div>

                      {/* Middle section - visual route display */}
                      <div className="flex flex-col items-center w-[400px] flex-shrink-0 px-4">
                        <div className="w-full flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-lg font-bold">
                              {flight.origin.code}
                            </span>
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </div>
                          <div className="flex-1 mx-4 flex justify-center items-center">
                            <div className="text-xs text-gray-500 mb-3">
                              {flight.directFlight ? "Direct" : "1 Stop"}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-bold">
                              {flight.destination.code}
                            </span>
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </div>
                        </div>

                        {/* Flight route line */}
                        <div className="w-full flex items-center">
                          <div className="h-0.5 flex-1 bg-blue-500"></div>
                          {flight.directFlight ? (
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          ) : (
                            <>
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div className="h-0.5 flex-1 bg-blue-500"></div>
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </>
                          )}
                          <div className="h-0.5 flex-1 bg-blue-500"></div>
                        </div>

                        {/* Time and airport details */}
                        <div className="w-full flex justify-between mt-1">
                          <div className="flex flex-col items-start">
                            <div className="text-sm font-medium">
                              {flight.origin.time}{" "}
                              <span className="text-gray-500">
                                {flight.origin.timeZone}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.origin.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.airline} {flight.flightNumber}{" "}
                              {flight.origin.terminal &&
                                `• ${flight.origin.terminal}`}
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium">
                              {flight.destination.time}{" "}
                              <span className="text-gray-500">
                                {flight.destination.timeZone}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.destination.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.destination.terminal &&
                                flight.destination.terminal}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right section - Flight details and summary */}
                      <div className="flex items-center w-[200px] flex-shrink-0 pl-4">
                        <div className="flex flex-col mr-6">
                          <div className="text-sm font-medium mb-1">
                            {flight.origin.code}{" "}
                            <ArrowRight className="h-3 w-3 inline mx-1" />{" "}
                            {flight.destination.code}
                          </div>
                          <div className="text-sm text-gray-700">
                            {flight.origin.time} {flight.origin.timeZone} -{" "}
                            {flight.destination.time}{" "}
                            {flight.destination.timeZone}
                          </div>
                          <div className="text-sm text-gray-500">
                            DL {flight.flightNumber}
                          </div>
                        </div>

                        {/* Expansion toggle */}
                        <div className="flex justify-end ml-auto">
                          {flight.expanded ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Passenger table - only this is shown/hidden on expansion */}
                  {flight.expanded && (
                    <div className="overflow-x-auto">
                      {selectedPassengers[flight.id]?.length > 0 && (
                        <div className="p-3 flex justify-between items-center border-b border-cardBorderColor bg-gray-50 dark:bg-gray-900">
                          <div className="text-sm font-medium">
                            {selectedPassengers[flight.id].length} passenger
                            {selectedPassengers[flight.id].length !== 1
                              ? "s"
                              : ""}{" "}
                            selected
                          </div>
                          <div className="flex space-x-2">
                            <SecondaryButton
                              size="small"
                              leadingIcon={<Edit size={14} />}
                            >
                              Edit
                            </SecondaryButton>
                            <DestructiveButton
                              size="small"
                              leadingIcon={<Trash2 size={14} />}
                            >
                              Delete
                            </DestructiveButton>
                          </div>
                        </div>
                      )}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">
                              <Checkbox
                                aria-label="Select all passengers"
                                checked={areAllPassengersSelected(flight.id)}
                                onCheckedChange={(checked) =>
                                  toggleAllPassengers(
                                    flight.id,
                                    checked === true
                                  )
                                }
                              />
                            </TableHead>
                            <TableHead>Passengers</TableHead>
                            <TableHead>Record Locator</TableHead>
                            <TableHead>Seat</TableHead>
                            <TableHead>Departure Transfer</TableHead>
                            <TableHead>Arrival Transfer</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {flight.passengers.map((passenger) => (
                            <TableRow key={passenger.id}>
                              <TableCell className="w-[50px]">
                                <Checkbox
                                  aria-label={`Select ${passenger.name}`}
                                  checked={selectedPassengers[
                                    flight.id
                                  ]?.includes(passenger.id)}
                                  onCheckedChange={() =>
                                    togglePassengerSelection(
                                      flight.id,
                                      passenger.id
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">
                                  {passenger.name}
                                </div>
                              </TableCell>
                              <TableCell>{passenger.recordLocator}</TableCell>
                              <TableCell>{passenger.seat}</TableCell>
                              <TableCell>
                                {passenger.departureTransfer ? (
                                  <div className="flex items-center text-sm">
                                    <Car
                                      size={16}
                                      className="mr-1 text-gray-500"
                                    />
                                    <span>{passenger.departureTransfer}</span>
                                  </div>
                                ) : (
                                  <button className="text-gray-400 hover:text-gray-600 text-sm flex items-center">
                                    <Plus size={14} className="mr-1" /> Add
                                    Transfer
                                  </button>
                                )}
                              </TableCell>
                              <TableCell>
                                {passenger.arrivalTransfer ? (
                                  <div className="flex items-center text-sm">
                                    <Car
                                      size={16}
                                      className="mr-1 text-gray-500"
                                    />
                                    <span>{passenger.arrivalTransfer}</span>
                                  </div>
                                ) : (
                                  <button className="text-gray-400 hover:text-gray-600 text-sm flex items-center">
                                    <Plus size={14} className="mr-1" /> Add
                                    Transfer
                                  </button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Form Sheet */}
        <Sheet open={isFlightSheetOpen} onOpenChange={setIsFlightSheetOpen}>
          <SheetContent className="sm:max-w-md" forceMount>
            <SheetHeader className="mb-6">
              <SheetTitle>Add New Flight</SheetTitle>
              <SheetDescription>
                Enter flight details for travel planning.
              </SheetDescription>
            </SheetHeader>
            <FlightForm
              onSubmit={handleFlightAdd}
              onCancel={() => setIsFlightSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </MainLayout>
  );
}
