"use client";

import { useTheme } from "next-themes";

import React from "react";

type CalendarHeaderProps = {
  date: string;
  title: string;
  subtitle: string;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  title,
  subtitle,
}) => {
  const { setTheme, resolvedTheme, theme } = useTheme();
  return (
    <div className="flex flex-col mb-6">
      <div className="p-4 bg-primary text-primary">
        <h1 className="text-2xl font-semibold">{date}</h1>
        <div className="flex items-center text-secondary">
          <span>{title}</span>
          <span className="mx-2">•</span>
          <span>{subtitle}</span>
        </div>
      </div>

      {/* Theme demonstration */}
      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
        <div className="p-2 bg-blue-500 dark:!bg-green-500 dark:text-green-500">
          test
        </div>
        <div className="p-2 bg-primaryz">bg-primary</div>
        <div
          className={`p-2 bg-primary
          ${theme === "dark" ? "bg-green-500" : "bg-blue-500"}
          `}
        >
          bg-primary
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
