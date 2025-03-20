import React from "react";
import ScheduleItem, { ScheduleItemProps } from "./ScheduleItem";

type ScheduleListProps = {
  items: ScheduleItemProps[];
  title?: string;
  date?: string;
  newEventIds?: string[];
};

const ScheduleList: React.FC<ScheduleListProps> = ({
  items,
  title,
  date,
  newEventIds = [],
}) => {
  return (
    <div className="bg-cardBackgroundPrimary border border-cardBorderColor rounded-lg overflow-hidden">
      {(title || date) && (
        <div className="flex items-center justify-between p-4 border-b border-cardBorderColor">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">📅</span>
            <span className="font-medium">Schedule</span>
            {title && <span className="ml-2 text-gray-500">{title}</span>}
          </div>
          {date && <div className="text-sm text-gray-500">{date}</div>}
          <div className="flex items-center">
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
            <button className="ml-2 text-gray-400 hover:text-gray-600">
              <span>+</span>
            </button>
          </div>
        </div>
      )}
      <div className="divide-y divide-cardBorderColor">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={
              newEventIds.includes(item.id || "")
                ? "bg-blue-50 dark:bg-blue-900/20 transition-colors duration-500"
                : ""
            }
          >
            <ScheduleItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
