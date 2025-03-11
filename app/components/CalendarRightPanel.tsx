"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import VenuePanel from "./VenuePanel";
import LodgingPanel from "./LodgingPanel";
import NotesPanel from "./NotesPanel";

type TabType = "Info" | "Schedule" | "Personnel" | "Weather" | "Contacts";

type CalendarRightPanelProps = {
  venueProps: {
    name: string;
    address: string;
    capacity: number;
    sunset: string;
  };
  lodgingProps: {
    name: string;
    address: string;
    breakfast: boolean;
    restaurantHours: string;
    roomService: string;
    amenities: string[];
    checkIn: {
      date: string;
      time: string;
    };
    checkOut: {
      date: string;
      time: string;
    };
    phone: string;
  };
  notesProps: {
    notes: {
      content: string;
      type?: "normal" | "automation";
    }[];
  };
};

const CalendarRightPanel: React.FC<CalendarRightPanelProps> = ({
  venueProps,
  lodgingProps,
  notesProps,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("Info");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const tabs: TabType[] = [
    "Info",
    "Schedule",
    "Personnel",
    "Weather",
    "Contacts",
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Info":
        return (
          <div className="space-y-6">
            <VenuePanel {...venueProps} />
            <LodgingPanel {...lodgingProps} />
            <NotesPanel notes={notesProps.notes} />
          </div>
        );
      case "Schedule":
        return (
          <div className="p-4 bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg">
            <h3 className="text-cardTextColorPrimary font-medium mb-2">
              Schedule
            </h3>
            <p className="text-cardTextColorSecondary text-sm">
              Detailed schedule information coming soon
            </p>
          </div>
        );
      case "Personnel":
        return (
          <div className="p-4 bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg">
            <h3 className="text-cardTextColorPrimary font-medium mb-2">
              Personnel
            </h3>
            <p className="text-cardTextColorSecondary text-sm">
              Personnel information coming soon
            </p>
          </div>
        );
      case "Weather":
        return (
          <div className="p-4 bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg">
            <h3 className="text-cardTextColorPrimary font-medium mb-2">
              Weather
            </h3>
            <p className="text-cardTextColorSecondary text-sm">
              Weather information coming soon
            </p>
          </div>
        );
      case "Contacts":
        return (
          <div className="p-4 bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg">
            <h3 className="text-cardTextColorPrimary font-medium mb-2">
              Contacts
            </h3>
            <p className="text-cardTextColorSecondary text-sm">
              Contact information coming soon
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center w-fit">
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-full bg-cardBackgroundPrimary border border-cardBorderColor hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Expand panel"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleCollapse()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cardTextColorPrimary"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg p-1">
        <div className="flex-1 flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors select-none ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : `text-cardTextColorPrimary hover:bg-gray-100 dark:hover:bg-gray-800`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={toggleCollapse}
          className="ml-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Collapse panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cardTextColorPrimary"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto pr-2 pb-6 flex-1">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CalendarRightPanel;
