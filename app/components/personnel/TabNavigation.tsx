"use client";

import React from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: {
    id: string;
    label: string;
  }[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  return (
    <div className="px-6 flex items-center">
      <div className="flex rounded-md overflow-hidden border border-cardBorderColor">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-1.5 text-sm ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
