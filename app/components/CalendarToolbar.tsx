import React from "react";

const CalendarToolbar: React.FC = () => {
  return (
    <div className="relative flex gap-[8px] mb-6">
      <div className="flex items-center border border-cardBorderColor rounded-md px-3 py-2 w-64">
        <span className="text-gray-500 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <span className="text-gray-500 text-sm">View as...</span>
      </div>
      <div className="flex items-center">
        <button className="flex items-center border border-cardBorderColor rounded-md px-3 py-2">
          <span className="text-gray-500 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </span>
          <span className="text-gray-700 text-sm">Filter</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
