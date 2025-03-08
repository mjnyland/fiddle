import React from "react";
import ScheduleItem, { ScheduleItemProps } from "./ScheduleItem";

type ScheduleListProps = {
  items: ScheduleItemProps[];
  title?: string;
  date?: string;
};

const ScheduleList: React.FC<ScheduleListProps> = ({ items, title, date }) => {
  return (
    <div className="bg-surfaceBlue rounded-lg border border-gray-200 overflow-hidden">
      {(title || date) && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
      <div className="divide-y divide-gray-100">
        {items.map((item, index) => (
          <ScheduleItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
