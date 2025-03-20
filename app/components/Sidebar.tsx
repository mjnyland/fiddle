"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

type NavItemProps = {
  icon: string;
  label: string;
  href?: string;
  active?: boolean;
  hasSubItems?: boolean;
  expanded?: boolean;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  href,
  active = false,
  hasSubItems = false,
  expanded = false,
  onClick,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const content = (
    <>
      <div className="w-5 h-5 mr-2 flex items-center justify-center">
        {hasSubItems && (
          <span
            className={`mr-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            {expanded ? "▼" : "▶"}
          </span>
        )}
        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
          {icon}
        </span>
      </div>
      <span className={isDark ? "text-gray-300" : "text-gray-700"}>
        {label}
      </span>
    </>
  );

  const className = `flex items-center px-4 py-2 text-sm ${
    isDark
      ? `hover:bg-gray-800 ${active ? "bg-blue-900" : "bg-transparent"}`
      : `hover:bg-gray-100 ${active ? "bg-blue-50" : "bg-transparent"}`
  } cursor-pointer select-none`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} onClick={onClick}>
      {content}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Initialize state with default values
  const [calendarExpanded, setCalendarExpanded] = React.useState(true);
  const [tourExpanded, setTourExpanded] = React.useState(true);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== "undefined") {
      const savedCalendarState = localStorage.getItem("calendarExpanded");
      const savedTourState = localStorage.getItem("tourExpanded");

      if (savedCalendarState !== null) {
        setCalendarExpanded(savedCalendarState === "true");
      } else {
        // Ensure calendar is expanded by default
        setCalendarExpanded(true);
        localStorage.setItem("calendarExpanded", "true");
      }

      if (savedTourState !== null) {
        setTourExpanded(savedTourState === "true");
      }

      setIsInitialized(true);
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("calendarExpanded", calendarExpanded.toString());
      localStorage.setItem("tourExpanded", tourExpanded.toString());
    }
  }, [calendarExpanded, tourExpanded, isInitialized]);

  // Handle toggling the calendar section
  const handleCalendarToggle = () => {
    setCalendarExpanded((prev) => !prev);
  };

  // Handle toggling the tour section
  const handleTourToggle = () => {
    setTourExpanded((prev) => !prev);
  };

  // Check if the current path matches a specific route
  const isActive = (path: string) => pathname === path;

  // Check if the current path is a calendar day route
  const isCalendarDay = pathname.startsWith("/calendar/");

  // Extract the day from the calendar path
  const currentDay = isCalendarDay ? pathname.split("/").pop() : "6";

  return (
    <div
      className={`w-[240px] border-r border-cardBorderColor flex flex-col h-full ${
        isDark
          ? "bg-[#1c1c1c] border-color-cardBorderColor"
          : "bg-[#fafafb] border-color-cardBorderColor"
      }`}
    >
      <div
        className={`p-4 border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2">
            <Image
              src="/OmarAvatar.png"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <div
              className={`text-sm font-medium ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Omar Apollo
            </div>
            <div className="text-xs text-gray-500">Artist</div>
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        {/* Tour Header Section */}
        <div className={`px-4 py-3 border-b border-cardBorderColor`}>
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={handleTourToggle}
          >
            <span className={isDark ? "text-gray-500" : "text-gray-400"}>
              {tourExpanded ? "▼" : "▶"}
            </span>
            <div
              className={`ml-2 font-medium text-sm ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              World Tour: West Coast
            </div>
          </div>
        </div>

        {tourExpanded && (
          <>
            <NavItem
              icon="👤"
              label="Personnel"
              href="/personnel"
              active={isActive("/personnel")}
            />
            <NavItem
              icon="🎟️"
              label="Guest Lists"
              href="/guest-lists"
              active={isActive("/guest-lists")}
            />
            <NavItem
              icon="✈️"
              label="Travel"
              href="/travel"
              active={isActive("/travel")}
            />
            <NavItem
              icon="📄"
              label="Documents"
              href="/documents"
              active={isActive("/documents")}
            />
            <NavItem
              icon="⚙️"
              label="Settings"
              href="/settings"
              active={isActive("/settings")}
            />
          </>
        )}
      </div>
      <div className={`mt-4 pt-4 border-t border-cardBorderColor`}>
        <NavItem
          icon="📅"
          label="Calendar"
          hasSubItems
          expanded={calendarExpanded}
          onClick={handleCalendarToggle}
        />

        {calendarExpanded && (
          <div className="pl-6 py-2">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((day) => (
              <Link key={day} href={`/calendar/${day}`}>
                <div
                  className={`flex items-center py-1 text-xs cursor-pointer px-2 rounded select-none hover:bg-cardBackgroundPrimary`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center mr-2 ${
                      day.toString() === currentDay
                        ? "bg-blue-500 text-white"
                        : isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {day}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Show Day
                    </div>
                    <div className="text-xs text-gray-500">Kia Forum</div>
                    <div className="text-xs text-gray-500">Los Angeles, CA</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
