import React from "react";
import EventTag from "./EventTag";

export type EventType =
  | "Band Party"
  | "Crew Party"
  | "Artist Party"
  | "Lighting"
  | "SFX"
  | "Production"
  | "Carps"
  | "Managers";

export type ScheduleItemProps = {
  id?: string;
  timeStart: string;
  timeEnd?: string;
  title: string;
  description?: string;
  completed?: boolean;
  tags?: EventType[];
  isTransportation?: boolean;
  transportationDetails?: {
    type: "car" | "plane" | "bus";
    taggedParties?: boolean;
    destination?: string;
    flightDetails?: string;
  };
  location?: string;
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  timeStart,
  timeEnd,
  title,
  description,
  completed = false,
  tags = [],
  isTransportation = false,
  transportationDetails,
}) => {
  return (
    <div className="flex items-start py-3 px-3 border-b border-cardBorderColor group  hover:bg-[#fafafb] dark:hover:bg-[#1c1c1c]">
      <div className="flex items-center w-8 mr-2">
        {completed && (
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="w-36 text-sm text-cardTextColorPrimary">
        {isTransportation ? (
          <div className="flex items-center">
            {transportationDetails?.type === "car" && (
              <span className="mr-2">🚗</span>
            )}
            {transportationDetails?.type === "plane" && (
              <span className="mr-2">✈️</span>
            )}
            {transportationDetails?.type === "bus" && (
              <span className="mr-2">🚌</span>
            )}
            <span>{timeStart}</span>
            {timeEnd && <span> - {timeEnd}</span>}
          </div>
        ) : (
          <div>
            {timeStart}
            {timeEnd && <span> - {timeEnd}</span>}
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="font-medium text-sm text-cardTextColorPrimary">
          {title}
        </div>
        {description && (
          <div className="text-xs text-cardTextColorSecondary mt-0.5">
            {description}
          </div>
        )}
        {transportationDetails?.flightDetails && (
          <div className="text-xs text-gray-500 mt-0.5">
            {transportationDetails.flightDetails}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1 justify-end">
        {tags.map((tag, index) => (
          <EventTag key={index} type={tag} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleItem;
